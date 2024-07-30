import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const App = () => {
    const [data, setData] = useState({ uniqueColumn3: [], column4ByColumn3: {} });
    const [selectedColumn3, setSelectedColumn3] = useState('');
    const [selectedColumn4, setSelectedColumn4] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/data')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleColumn3Change = (event) => {
        setSelectedColumn3(event.target.value);
        setSelectedColumn4('');
    };

    const handleColumn4Change = (event) => {
        setSelectedColumn4(event.target.value);
    };

    return (
        <div className="container">
            <h1>Select Business Area</h1>
            <select value={selectedColumn3} onChange={handleColumn3Change}>
                <option value="">Select Business Area</option>
                {data.uniqueColumn3.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            {selectedColumn3 && (
                <>
                    <h1>Select Business Segment Description</h1>
                    <select value={selectedColumn4} onChange={handleColumn4Change}>
                        <option value="">Select Business Segment Description</option>
                        {data.column4ByColumn3[selectedColumn3].map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {selectedColumn4 && (
                <div>
                    <button onClick={() => alert(`Selected: ${selectedColumn3} - ${selectedColumn4}`)}>
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
