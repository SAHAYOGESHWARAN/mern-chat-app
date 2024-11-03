import React, { useRef } from 'react';

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture</button>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
    </div>
  );
};

export default Camera;
