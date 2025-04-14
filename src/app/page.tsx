'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [sepal_length, setSepalLength] = useState('');
  const [sepal_width, setSepalWidth] = useState('');
  const [petal_length, setPetalLength] = useState('');
  const [petal_width, setPetalWidth] = useState('');
  const [predictedClass, setPredictedClass] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://iris-classifier-uinc.onrender.com/predict', {
        sepal_length: parseInt(sepal_length),
        sepal_width: parseInt(sepal_width),
        petal_length: parseInt(petal_length),
        petal_width: parseInt(petal_width),
      });

      setPredictedClass(response.data.class);
    } catch (error) {
      console.error("Error predicting class:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px', color: 'black' }}>
      <h1>Iris Classifier Sample</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sepal Length:</label>
          <input 
            type="number"
            value={sepal_length}
            onChange={(e) => setSepalLength(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sepal Width:</label>
          <input
            type="number"
            value={sepal_width}
            onChange={(e) => setSepalWidth(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Petal Length:</label>
          <input
            type="number"
            value={petal_length}
            onChange={(e) => setPetalLength(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Petal Width:</label>
          <input
            type="number"
            value={petal_width}
            onChange={(e) => setPetalWidth(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Class'}
        </button>
      </form>

      {predictedClass !== null && (
        <div>
          <h2>Estimated Class: {predictedClass}</h2>
        </div>
      )}
    </div>
  );
}