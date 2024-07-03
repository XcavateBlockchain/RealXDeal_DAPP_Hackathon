'use client';

import { useState } from 'react';
// import { processImages } from '../../actions';
import { checkResult } from '../../actions';
import { playGame } from '@/lib/extrinsic';

export default function HomePage() {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [propertyDisplay, setPropertyDisplay] = useState(null);

  // const handleGetImages = async () => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     // const images = await processImages();
  //     await checkResult();
  //     // setImageSrcs(images);
  //   } catch (error) {
  //     console.log(error);
  //     setError('Failed to fetch images');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePlayGame = async () => {
    try {
      await playGame(0, '5FEda1GYvjMYcBiuRE7rb85QbD5bQNHuZajhRvHYTxm4PPz5', data => {
        setPropertyDisplay(data);
      });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      {/* <button onClick={handleGetImages} disabled={loading}>
        {loading ? 'Processing...' : 'Get Processed Images'}
      </button> */}
      {error && <p>{error}</p>}
      <div>
        {imageSrcs.map((src, index) => (
          <img key={index} src={src} alt={`Processed Image ${index + 1}`} />
        ))}
      </div>

      <button onClick={handlePlayGame}>TEST BUTTON</button>
      {propertyDisplay && (
        <div>
          <h3>Game Details:</h3>
          <p>{propertyDisplay}</p>{' '}
          {/* Adjust this to display actual data from propertyDisplay */}
        </div>
      )}
    </div>
  );
}
