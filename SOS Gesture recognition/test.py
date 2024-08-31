import cv2
import numpy as np
import math
import time
import tensorflow
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier

imgSize = 300
cap = cv2.VideoCapture(0)
detector = HandDetector(maxHands = 2)
classifier = Classifier("model/keras_model.h5", "model/labels.txt")

counter = 0

labels = ["emergency", "other_signal"]
rgb = (0, 0, 0)   

while True:
    success, img = cap.read()
    imgOutput = img.copy();
    hands, img = detector.findHands(img)
    if hands:
        for hand in hands: 
            try:
                x, y, w, h = hand['bbox']
                imgWhite = np.ones((imgSize,imgSize,3), np.uint8)*255;
                imgCrop = img[y - 20:y + h + 20 , x - 20:x + w + 20]
                imgCropShape = imgCrop.shape
                aspectRatio = h / w
                
                if(aspectRatio > 1):
                    k = imgSize / h
                    wCal = math.ceil(k * w)
                    imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                    imgResizeShape = imgResize.shape
                    wGap = math.ceil((imgSize - wCal)  / 2)
                    imgWhite[:, wGap:wCal + wGap] = imgResize
                    prediction, index = classifier.getPrediction(imgWhite, draw = False)
                else:
                    k = imgSize / w
                    hCal = math.ceil(k * h)
                    imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                    imgResizeShape = imgResize.shape
                    hGap = math.ceil((imgSize - hCal)  / 2) 
                    imgWhite[hGap:hCal + hGap, :] = imgResize
                    prediction, index = classifier.getPrediction(imgWhite, draw = False)
                if labels[index] == "emergency":
                    rgb = (0, 0, 255)
                else:
                    rgb = (0, 255, 0)
                cv2.rectangle(imgOutput, (x - 20, y - 20), (x + w + 20, y + h + 20), rgb, 4)
                cv2.putText(imgOutput, labels[index], (x - 20, y - 30), cv2.FONT_HERSHEY_COMPLEX, 1, rgb, 2)
                cv2.imshow("ImageCrop", imgCrop)
                cv2.imshow("ImageWhite", imgWhite)
            except:
                cv2.putText(imgOutput, "Hand out of bound", (0, 20), cv2.FONT_HERSHEY_COMPLEX, 1, rgb, 2)

        
    cv2.imshow("Image", imgOutput)
    key = cv2.waitKey(1)
    # if(key == ord("s")):
    #     counter += 1
    #     cv2.imwrite(f'{folder}/img_{time.time()}.jpg', imgWhite);
    #     print(counter)