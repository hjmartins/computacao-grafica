import React, { useState ,useEffect  } from 'react';
import ImageDisplay from './ImageDisplay';

const ImageSelector = () => {
  const [imageData, setImageData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        parsePGM(content)
          .then(parsedData => {
            setImageData(parsedData);
          })
          .catch(error => {
            console.error("Error parsing PGM:", error);
          });
      };

      // Read the file synchronously
      reader.readAsText(file);
    }
  };

  const parsePGM = (content) => {
    return new Promise((resolve, reject) => {
      const lines = content.split('\n');
      const type = lines[0];
      const dimensions = lines[1];
      const maxPixelValue = lines[2];
      const pixels = [];
      const [width, height] = dimensions.split(' ');

      for (let y = 0; y < parseInt(height, 10); y++) {
        const currLine = lines[y].split(' ');
        const currPixelLine = [];

        for (let x = 0; x < parseInt(width, 10); x++) {
          currPixelLine.push(parseInt(currLine[x], 10));
        }

        pixels.push(currPixelLine);
      }

      const imageData = {
        type: type,
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        maxPixelValue: parseInt(maxPixelValue, 10),
        pixels,
      };

      setImageData(imageData);
      resolve(imageData);
    });
  };

  useEffect(() => {
  }, [imageData]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pgm" />
      {imageData && <ImageDisplay imageData={imageData} />}
    </div>
  );
};

export default ImageSelector;