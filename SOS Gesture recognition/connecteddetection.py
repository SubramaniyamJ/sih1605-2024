from flask import Flask, request, jsonify
import cv2
import numpy as np
import math
import tensorflow as tf
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import mediapipe as mp

app = Flask(__name__)

# Initialize the necessary variables
imgSize = 300
detector = HandDetector(maxHands=2)

# Load models
classifier1 = Classifier("model/keras_model.h5", "model/labels.txt")
labels1 = ["trapthumb", "other_signal"]

model2 = tf.keras.models.load_model('model/gestures.h5')
labels2 = np.array(['elbowcross', 'neckhold', 'other_gestures'])

# Mediapipe holistic model setup
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33 * 4)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468 * 3)
    left_hand = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21 * 3)
    right_hand = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21 * 3)
    return np.concatenate([pose, face, left_hand, right_hand])

def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    results = model.process(image)
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    return image, results

@app.route('/detect', methods=['POST'])
def detect():
    file = request.files['image'].read()
    npimg = np.frombuffer(file, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    imgOutput = img.copy()
    
    hands, img = detector.findHands(img)
    detected_gesture = "no_emergency"
    sequence = []

    if hands:
        for hand in hands:
            try:
                x, y, w, h = hand['bbox']
                imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
                imgCrop = img[y - 20:y + h + 20, x - 20:x + w + 20]
                aspectRatio = h / w

                if aspectRatio > 1:
                    k = imgSize / h
                    wCal = math.ceil(k * w)
                    imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                    wGap = math.ceil((imgSize - wCal) / 2)
                    imgWhite[:, wGap:wCal + wGap] = imgResize
                else:
                    k = imgSize / w
                    hCal = math.ceil(k * h)
                    imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                    hGap = math.ceil((imgSize - hCal) / 2)
                    imgWhite[hGap:hCal + hGap, :] = imgResize

                prediction1, index1 = classifier1.getPrediction(imgWhite, draw=False)
                if labels1[index1] == "trapthumb":
                    detected_gesture = labels1[index1]
                else:
                    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
                        image, results = mediapipe_detection(imgOutput, holistic)
                        keypoints = extract_keypoints(results)
                        sequence.insert(0, keypoints)
                        sequence = sequence[:30]

                        if len(sequence) == 30:
                            res = model2.predict(np.expand_dims(sequence, axis=0))[0]
                            if np.max(res) > 0.5:
                                detected_gesture = labels2[np.argmax(res)]
            except Exception as e:
                print(e)

    if detected_gesture != "no_emergency" and detected_gesture != 'other_gestures':
        detected_gesture += " emergency"
    
    return jsonify({"gesture": detected_gesture})

if __name__ == '__main__':
    app.run(debug=True)
