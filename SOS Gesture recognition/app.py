#this is flask api to make api calls to python project through react app
from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import requests
app = Flask(__name__)
CORS(app)

tracking_process = None
tracking_process_gd = None
latest_detection = None
gd_details = None

@app.route('/start-tracking', methods=['GET'])
def start_tracking():
    global tracking_process
    try:
        if tracking_process and tracking_process.poll() is None:
            return jsonify({'status': 'Tracking already running'})
        
        #team put your python installed location here
        python_executable = r'C:/Users/Subramaniyam J/AppData/Local/Programs/Python/Python311/python.exe'
        tracking_script = r'SOS Gesture recognition/gesturetest.py'

        tracking_process = subprocess.Popen([python_executable, tracking_script])

        return jsonify({'status': 'Tracking started successfully'})
    except Exception as e:
        return jsonify({'status': 'Error', 'message': str(e)})
    
@app.route('/start-tracking-gd', methods=['GET'])
def start_tracking_gd():
    global tracking_process_gd
    try:
        if tracking_process_gd and tracking_process_gd.poll() is None:
            return jsonify({'status': 'Tracking-gd already running'})
        
        #team put your python installed location here
        python_executable = r'C:/Users/Subramaniyam J/AppData/Local/Programs/Python/Python311/python.exe'
        tracking_script = r'Gender-detector/detects.py'

        tracking_process_gd = subprocess.Popen([python_executable, tracking_script])

        return jsonify({'status': 'Tracking-gd started successfully'})
    except Exception as e:
        return jsonify({'status': 'Error', 'message': str(e)})


@app.route('/stop-tracking-gd', methods=['GET'])
def stop_tracking_gd():
    global tracking_process_gd
    try:
        if tracking_process_gd and tracking_process_gd.poll() is None:
            tracking_process_gd.terminate()
            tracking_process_gd.wait() 
            tracking_process_gd = None
            return jsonify({'status': 'Tracking-gd stopped successfully'})
        else:
            return jsonify({'status': 'No tracking-gd process running'})
    except Exception as e:
        return jsonify({'status': 'Error', 'message': str(e)})


@app.route('/stop-tracking', methods=['GET'])
def stop_tracking():
    global tracking_process
    try:
        if tracking_process and tracking_process.poll() is None:
            tracking_process.terminate()
            tracking_process.wait() 
            tracking_process = None
            return jsonify({'status': 'Tracking stopped successfully'})
        else:
            return jsonify({'status': 'No tracking process running'})
    except Exception as e:
        return jsonify({'status': 'Error', 'message': str(e)})


@app.route('/update-latest-detection', methods=['POST'])
def update_latest_detection():
    global latest_detection
    try:
        latest_detection = request.json
        return jsonify({'status': 'Latest detection updated successfully'})
    except Exception as e:
        return jsonify({'status': 'Error', 'message': str(e)})
    
    
@app.route('/update-none-detection', methods=['POST'])
def update_none_detection():
    global latest_detection
    try:
        latest_detection = request.json 
        return jsonify({'status': 'Latest detection updated successfully'})
    except Exception as e:
        return jsonify({'status': 'Error', 'message': str(e)})
    

@app.route('/get-latest-detection', methods=['GET'])
def get_latest_detection():
    if latest_detection:
        return jsonify(latest_detection)
    else:
        return jsonify({'status': 'No emergency detected yet'})
  

@app.route('/update-gd-details', methods=['POST'])
def update_gd_details():
    global gd_details
    try:
        gd_details = request.json
        return jsonify({'status': 'Latest details updated successfully'})
    except Exception as e:
        return jsonify({'status': 'Error', 'message': str(e)})  
    

@app.route('/get-gd-details', methods=['GET'])
def get_gd_details():
    if gd_details:
        return jsonify(gd_details)
    else:
        return jsonify({"status" : 'No details found'})
        
    
if __name__ == '__main__':
    app.run(debug=True)
