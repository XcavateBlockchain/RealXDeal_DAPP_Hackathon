'use client';

import { useState } from 'react';
import { processImages } from '../../actions';

export default function HomePage() {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetImages = async () => {
    setLoading(true);
    setError('');
    try {
      const images = await processImages();
      setImageSrcs(images);
    } catch (error) {
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleGetImages} disabled={loading}>
        {loading ? 'Processing...' : 'Get Processed Images'}
      </button>
      {error && <p>{error}</p>}
      <div>
        {imageSrcs.map((src, index) => (
          <img key={index} src={src} alt={`Processed Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}
