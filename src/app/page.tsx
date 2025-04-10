'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [size, setSize] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/predict', {
        size: parseInt(size),
        bedrooms: parseInt(bedrooms),
      });

      setPredictedPrice(response.data.price);
    } catch (error) {
      console.error("Error predicting price:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px', color: 'black' }}>
      <h1>House Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Size (sq ft):</label>
          <input 
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Bedrooms:</label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Price'}
        </button>
      </form>

      {predictedPrice !== null && (
        <div>
          <h2>Estimated Price: ${predictedPrice}</h2>
        </div>
      )}
    </div>
  );
}