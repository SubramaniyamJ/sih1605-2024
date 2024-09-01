import cv2
import numpy as np
import math
import tensorflow as tf
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import mediapipe as mp
from datetime import datetime
import requests

imgSize = 300
cap = cv2.VideoCapture(0)
detector = HandDetector(maxHands=2)

classifier1 = Classifier("SOS Gesture recognition/model/keras_model.h5", "SOS Gesture recognition/model/labels.txt")
labels1 = ["trapthumb", "other_signal"]

model2 = tf.keras.models.load_model('SOS Gesture recognition/model/gestures.h5')
labels2 = np.array(['elbowcross', 'neckhold', 'other_gestures'])

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

sequence = []
threshold = 0.5

with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    while True:
        success, img = cap.read()
        imgOutput = img.copy()
        hands, img = detector.findHands(img)
        
        cv2.rectangle(imgOutput, (0, 0), (640, 40), (245, 117, 16), -1)
        detected_gesture = "no_emergency"

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

                    # Prediction from the first model
                    prediction1, index1 = classifier1.getPrediction(imgWhite, draw=False)
                    if labels1[index1] == "trapthumb":
                        detected_gesture = labels1[index1]
                    else:
                        # Second model (elbowcross, neckhold, other)
                        image, results = mediapipe_detection(imgOutput, holistic)
                        keypoints = extract_keypoints(results)
                        sequence.insert(0, keypoints)
                        sequence = sequence[:30]

                        if len(sequence) == 30:
                            res = model2.predict(np.expand_dims(sequence, axis=0))[0]
                            if np.max(res) > threshold:
                                detected_gesture = labels2[np.argmax(res)]
                except:
                    pass
                
        if detected_gesture != "no_emergency" and detected_gesture != 'other_gestures':
            color = (0, 0, 255)
            detected_gesture += " emergency"
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            print(f"Emergency detected: {detected_gesture} at {timestamp}")
            try:
                data = {'gesture': detected_gesture, 'timestamp': timestamp}
                requests.post('http://127.0.0.1:5000/update-latest-detection', json=data)  
            except Exception as e:
                print(f"Failed to send data: {e}")
                
        else:
            color = (255, 255, 255)
            try:
                data = {'gesture': '', 'timestamp': ''}
                requests.post('http://127.0.0.1:5000/update-none-detection', json=data)
            except Exception as e:
                print(f"Failed to send data: {e}")
            
        cv2.putText(imgOutput, detected_gesture, (20, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2, cv2.LINE_AA)

        cv2.imshow("Image", imgOutput)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
