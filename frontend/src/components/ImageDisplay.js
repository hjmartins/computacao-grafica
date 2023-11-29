import React, { useRef, useEffect } from 'react';

const ImageDisplay = ({ imageData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log(`imageData ${JSON.stringify(imageData)}`)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (imageData) {
      for (let y = 0; y < imageData.pixels.length; y++) {
        for (let x = 0; x < imageData.pixels[y].length; x++) {
          const pixelValue = imageData.pixels[y][x];
          const color = `rgb(${pixelValue}, ${pixelValue}, ${pixelValue})`;
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }, [imageData]);

  return <canvas ref={canvasRef}  width={imageData.width} height={imageData.height}/>;
};

export default ImageDisplay;