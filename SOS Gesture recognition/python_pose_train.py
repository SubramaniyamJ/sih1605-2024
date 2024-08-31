from sklearn.model_selection import train_test_split
import tensorflow
from tensorflow.keras.utils import to_categorical   
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import TensorBoard 
import os
import numpy as np

label_map = {'elbowcross': 0, 'neckhold': 1, 'other': 2}
log_dir = os.path.join("Logs")
tb_callback = TensorBoard(log_dir=log_dir)
DATA_PATH = os.path.join("landmark_data")
labels = np.array(['elbowcross','neckhold', 'other'])
no_sequences = 30
sequence_length = 30
sequences, labels_list = [], []

for label in labels:
    for sequence in range(no_sequences):
        window = []
        for framenum in range(sequence_length):
            res = np.load(os.path.join(DATA_PATH, label, str(sequence), "{}.npy".format(framenum)))
            window.append(res)
        sequences.append(window)
        labels_list.append(label_map[label])
        
X = np.array(sequences)
y = to_categorical(labels_list).astype(int)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.05)

model = Sequential()
model.add(LSTM(64, return_sequences=True, activation='relu', input_shape=(30, 1662)))
model.add(LSTM(128, return_sequences=True, activation='relu'))
model.add(LSTM(64, return_sequences=False, activation='relu'))
model.add(Dense(64, activation='relu'))
model.add(Dense(32, activation='relu'))
model.add(Dense(labels.shape[0], activation='softmax'))

model.compile(optimizer="Adam", loss="categorical_crossentropy", metrics=['categorical_accuracy'])
model.fit(X_train, y_train, epochs=2000, callbacks=[tb_callback])
model.save("model/gestures.h5")

