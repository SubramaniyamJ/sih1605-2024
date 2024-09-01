import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState, useEffect } from 'react'

const GenderDistribution = () => {
    const [gdData, setGdData] = useState([])

    const columns = [
        {field: 'id', headerName: 'Id', flex: 1},
        {field: 'maleCount', headerName: 'Male Count', flex: 1},
        {field: 'femaleCount', headerName: 'Female Count', flex: 1},
        {field: 'isLoneWomen', headerName: 'Lone Women', flex: 1},
        {field: 'isNightLoneWomen', headerName: 'Lone Women at night', flex: 1},
        {field: 'timestamp', headerName: 'TimeStamp', flex: 1}
    ]

    const [isStarted, setStarted] = useState(false)
    
    const runPythonGenderDistribution = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/start-tracking-gd');
            const data = await response.json();
            console.log(data.status);
            setTimeout(() => {
                setStarted(true)
            }, 7000)
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const stopPythonGenderDistribution = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/stop-tracking-gd');
            const data = await response.json();
            console.log(data.status);
            setStarted(false)
          } catch (error) {
            console.error('Error:', error);
          }
    }

    useEffect(() => {
        const fetchDetection = async () => {
          try {
            const response = await fetch('http://127.0.0.1:5000/get-gd-details');
            const data = await response.json();
            const date = new Date(data.timestamp.replace(' ', 'T'));
            const hours = date.getHours();
            const isNightTime = (hours >= 20 || hours < 6);
            console.log(data)
            if (data.gesture != '') {
              setGdData((prevGdData) => [ 
                ...prevGdData,
                {
                  id: prevGdData.length + 1,
                  maleCount: data.maleCount,
                  femaleCount: data.femaleCount,
                  isLoneWomen: data.femaleCount == 1 ? true : false,
                  isNightLoneWomen: isNightTime,  
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
          interval = setInterval(fetchDetection, 3000);
        }
        return () => clearInterval(interval);
    
      }, [isStarted]);

  return (
    <div className='button-container'>
        <Button variant='contained' color='secondary' onClick={runPythonGenderDistribution} sx={{margin: '30px'}}>
            Track Gender distribution
        </Button>
        <Button variant='contained' color='secondary' onClick={stopPythonGenderDistribution} sx={{margin: '30px'}}>
            Stop Gender distribution
        </Button>
        <div style={{height: '`1000px'}}>
            <DataGrid
                rows={gdData}
                columns={columns}
            />
        </div>
    </div>
  )
}

export default GenderDistribution