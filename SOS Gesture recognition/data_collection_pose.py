import numpy as np
import cv2
from matplotlib import pyplot as plt
import tensorflow
import os
import time
import mediapipe as mp
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils
DATA_PATH = os.path.join("landmark_data")
labels = np.array(['elbowcross','neckhold', 'other'])
no_sequences = 30
sequence_length = 30
def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    results = model.process(image)
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    return image, results
    
def draw_landmarks(image, results):
    mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_CONTOURS, 
                              mp_drawing.DrawingSpec(color=(80, 110, 10), thickness=1, circle_radius=1),
                              mp_drawing.DrawingSpec(color=(80, 256, 121), thickness=1, circle_radius=1))
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)


def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33 * 4)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468 * 3)
    left_hand = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21 * 3)
    right_hand = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten()if results.right_hand_landmarks else np.zeros(21 * 3)
    return np.concatenate([pose, face, left_hand, right_hand])

cap = cv2.VideoCapture(0)
with mp_holistic.Holistic(min_detection_confidence = 0.5, min_tracking_confidence = 0.5) as holistic:
    for label in labels:
        for sequence in range(no_sequences):
            for framenum in range(sequence_length):
                success, img = cap.read()
                image, results = mediapipe_detection(img, holistic)
                draw_landmarks(image, results)
                
                if framenum==0:
                    cv2.putText(image, "starting_collection", (120, 200), cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 0), 4, cv2.LINE_AA)
                    cv2.putText(image, "collecting frame for {} video number {}".format(label, sequence), (15, 12), cv2.FONT_HERSHEY_PLAIN, 0.5, (0, 0, 255), 1, cv2.LINE_AA)
                    cv2.waitKey(5000)
                else:
                    cv2.putText(image, "collecting frame for {} video number {}".format(label, sequence), (15, 12), cv2.FONT_HERSHEY_PLAIN, 0.5, (0, 0, 255), 1, cv2.LINE_AA)
                
                keypoints = extract_keypoints(results)
                npy_path = os.path.join("landmark_data", label, str(sequence), str(framenum))
                np.save(npy_path, keypoints)
                cv2.imshow("Live feed", image) 
                
                if cv2.waitKey(10) & 0xFF == ord('q'):
                    break
        
    cap.release()
    cv2.destroyAllWindows()   
