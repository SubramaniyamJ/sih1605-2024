from datetime import datetime
import cv2
from numpy import argmax
import requests
import time 

def faceBox(faceNet, frame):
    frameHeight = frame.shape[0]
    frameWidth = frame.shape[1]
    blob = cv2.dnn.blobFromImage(frame, 1.0, (227, 227), [104, 117, 123], swapRB=False)
    faceNet.setInput(blob)
    detection = faceNet.forward()
    bboxs = []
    for i in range(detection.shape[2]):
        confidence = detection[0, 0, i, 2]
        if confidence > 0.7:
            x1 = int(detection[0, 0, i, 3] * frameWidth)
            y1 = int(detection[0, 0, i, 4] * frameHeight)
            x2 = int(detection[0, 0, i, 5] * frameWidth)
            y2 = int(detection[0, 0, i, 6] * frameHeight)
            
            
            width = x2 - x1
            height = y2 - y1
            x1 = max(x1 - int(0.5 * width), 0)
            y1 = max(y1 - int(0.5 * height), 0)
            x2 = min(x2 + int(0.5 * width), frameWidth)
            y2 = min(y2 + int(0.5 * height), frameHeight)

            bboxs.append([x1, y1, x2, y2])
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 1)
    return frame, bboxs

def is_valid_bbox(bbox, frameWidth, frameHeight):
    x1, y1, x2, y2 = bbox
    return x1 >= 0 and y1 >= 0 and x2 <= frameWidth and y2 <= frameHeight

def is_intersecting(bbox1, bbox2):
    x1, y1, x2, y2 = bbox1
    x1p, y1p, x2p, y2p = bbox2
    return not (x2 < x1p or x2p < x1 or y2 < y1p or y2p < y1)

faceProto = "Gender-detector/opencv_face_detector.pbtxt"
faceModel = "Gender-detector/opencv_face_detector_uint8.pb"
ageProto = "Gender-detector/age_deploy.prototxt"
ageModel = "Gender-detector/age_net.caffemodel"
genderProto = "Gender-detector/gender_deploy.prototxt"
genderModel = "Gender-detector/gender_net.caffemodel"

faceNet = cv2.dnn.readNet(faceModel, faceProto)
ageNet = cv2.dnn.readNet(ageModel, ageProto)
genderNet = cv2.dnn.readNet(genderModel, genderProto)

MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
ageList = ['(0-2)', '(4-6)', '(8-12)', '(15-18)', '(19-24)', '(38-43)', '(48-53)', '(56-67)']
genderList = ['Male', 'Female']

video = cv2.VideoCapture(0)

while True:
    ret, frame = video.read()
    if not ret:
        break

    frameHeight, frameWidth = frame.shape[:2]
    frame, bboxs = faceBox(faceNet, frame)
    
    male_count = 0
    female_count = 0
    genders = []
    
    for i in range(len(bboxs)):
        bbox1 = bboxs[i]
        if not is_valid_bbox(bbox1, frameWidth, frameHeight):
            genders.append(None)
            continue

        face = frame[max(bbox1[1], 0):min(bbox1[3], frameHeight), max(bbox1[0], 0):min(bbox1[2], frameWidth)]
        if face.size == 0:
            genders.append(None)
            continue

        blob = cv2.dnn.blobFromImage(face, 1.0, (227, 227), MODEL_MEAN_VALUES, swapRB=False)
        genderNet.setInput(blob)
        genderPred = genderNet.forward()
        gender = genderList[argmax(genderPred[0])]
        genders.append(gender)

        if gender == 'Male':
            male_count += 1
        elif gender == 'Female':
            female_count += 1
        
        ageNet.setInput(blob)
        agePred = ageNet.forward()
        age = ageList[argmax(agePred[0])]
        
        label = "{},{}".format(gender, age)
        cv2.putText(frame, label, (bbox1[0], bbox1[1] - 10), cv2.FONT_HERSHEY_PLAIN, 0.8, (255, 255, 255), 2)

    for i in range(len(bboxs)):
        for j in range(len(bboxs)):
            if i != j and genders[i] == 'Male' and genders[j] == 'Female':
                if is_intersecting(bboxs[i], bboxs[j]):
                    
                    cv2.putText(frame, "Alert!", (bboxs[j][0], bboxs[j][1] - 25), cv2.FONT_HERSHEY_PLAIN, 1.0, (0, 0, 255), 2)
                    break

    
    count_text = f"Male: {male_count} | Female: {female_count}"
    cv2.putText(frame, count_text, (frameWidth - 200, 30), cv2.FONT_HERSHEY_PLAIN, 1, (0, 0, 0), 2)
    
 
    if female_count == 1:
        if male_count == 0 or male_count > 0:
            cv2.putText(frame, "Lone woman found", (10, 30), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 0, 255), 2)
            
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    data = {"maleCount": male_count, "femaleCount": female_count, "timestamp": timestamp}
    requests.post('http://127.0.0.1:5000/update-gd-details', json=data)
    
    cv2.imshow("Age-Gender", frame)
    k = cv2.waitKey(1)
    if k == ord('q'):
        break

video.release()
cv2.destroyAllWindows()