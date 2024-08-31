import cv2
import os
import time

# Configuration
VIDEO_DURATION = 5  # Duration of each video in seconds
SAVE_DIR = "model/collected_videos"  # Directory to save videos
LABELS = ["emergency_waving", "other"]  # Labels for classification

# Create directories for each label
for label in LABELS:
    os.makedirs(os.path.join(SAVE_DIR, label), exist_ok=True)

# Initialize the webcam
cap = cv2.VideoCapture(0)

def record_video(label):
    # Get current timestamp to use as video filename
    timestamp = time.strftime("%Y%m%d-%H%M%S")
    video_filename = os.path.join(SAVE_DIR, label, f"{label}_{timestamp}.avi")

    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter(video_filename, fourcc, 20.0, (640, 480))

    start_time = time.time()
    print(f"Recording {label} video...")

    while int(time.time() - start_time) < VIDEO_DURATION:
        ret, frame = cap.read()
        if ret:
            out.write(frame)
            cv2.imshow('Recording', frame)

            # Press 'q' to stop recording early
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        else:
            break

    # Release everything when done
    out.release()
    print(f"Saved {label} video to {video_filename}")

def main():
    print("Press '1' to record an emergency waving video.")
    print("Press '2' to record an 'other' video.")
    print("Press 'q' to quit.")
    
    while True:
        ret, frame = cap.read()
        if ret:
            cv2.imshow('Live Feed', frame)
            key = cv2.waitKey(1) & 0xFF
            
            if key == ord('1'):
                record_video("emergency_waving")
            elif key == ord('2'):
                record_video("other")
            elif key == ord('q'):
                break
        else:
            break

    # When everything is done, release the capture
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
