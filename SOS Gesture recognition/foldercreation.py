import os
import numpy as np
import cv2
from matplotlib import pyplot as plt
import tensorflow
import time
import mediapipe as mp

DATA_PATH = os.path.join("landmark_data")
labels = np.array(['elbowcross','neckhold', 'other'])
no_sequences = 30
sequence_length = 30

for label in labels:
    for sequence in range(no_sequences):
        try:
            os.makedirs(os.path.join(DATA_PATH, label, str(sequence)))
        except:
            pass
        