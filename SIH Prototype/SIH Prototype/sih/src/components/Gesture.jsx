import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../components/Gesture.css';
import { Button } from '@mui/material';

const Gesture = () => {
  const [detections, setDetections] = useState([]);
  const [isStarted, setStarted] = useState(false);

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'gesture', headerName: 'Gesture', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'timestamp', headerName: 'Timestamp', flex: 1 },
  ];

  useEffect(() => {
    const fetchDetection = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get-latest-detection');
        const data = await response.json();
        console.log(data)
        if (data.gesture != '') {
          setDetections((prevDetections) => [ 
            ...prevDetections,
            {
              id: prevDetections.length + 1,
              gesture: data.gesture,
              location: 'Not yet',
              timestamp: data.timestamp,
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching the latest detection:', error);
      }
    };
    let interval
    if (isStarted) {
      interval = setInterval(fetchDetection, 2000);
    }
    return () => clearInterval(interval);

  }, [isStarted]);


  const runPythonScript = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/start-tracking');
      const data = await response.json();
      console.log(data.status);
      setTimeout(() => {
        setStarted(true)
      }, 15000)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const stopPythonScript = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/stop-tracking');
      const data = await response.json();
      console.log(data.status);
      setStarted(false)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='control-container'>
        <Button variant='contained' color='secondary' sx={{margin: '30px'}} onClick={runPythonScript}>
          Start Tracker
        </Button>
        <Button variant='contained' color='secondary' sx={{margin: '30px'}} onClick={stopPythonScript}>
          Stop Tracker
        </Button>
      </div>
      <div style={{height: 400, width: '100%' }}>
        <DataGrid
          rows={detections}
          columns={columns}
        />
      </div>
    </>
  );
};

export default Gesture;
