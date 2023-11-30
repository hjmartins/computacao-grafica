import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';
import ImageDisplay from '../../components/ImageDisplay';
import HistogramChart from '../../components/HistogramaImage';

function EqualizarHistograma() {

    const porta = '9090';

    const [imageData, setImageData] = useState(null);
    const [responseImage, setResponseImage] = useState(null);

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

            for (let y = 3; y < parseInt(height, 10); y++) {
                const currLine = lines[y].split(' ');
                if (currLine) {
                    const currPixelLine = [];

                    for (let x = 0; x < parseInt(width, 10); x++) {
                        if (currLine[x]) {
                            currPixelLine.push(parseInt(currLine[x], 10));
                        }
                    }

                    pixels.push(currPixelLine);
                }
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

    const handleSubmit = () => {
        if (imageData) {
            const dataToSend = { image: JSON.stringify(imageData) };

            const apiUrl = `http://localhost:${porta}/filtro/equalizar-histograma`;

            axios.post(apiUrl, dataToSend)
                .then(response => {
                    console.log('API call successful:', response.data);
                    setResponseImage(response.data);
                })
                .catch(error => {
                    console.error('Error making API call:', error);
                });
        }
    };

    useEffect(() => {
    }, [imageData, responseImage]);


    return (
        <div>
            <Menu />
            <h1>Histograma</h1>

            <div>
                <input type="file" onChange={handleFileChange} accept=".pgm" />
                {imageData &&
                    <div>
                        <h1>Imagem original</h1>
                        <ImageDisplay imageData={imageData} />
                    </div>
                }
                {
                    imageData &&
                    <div>
                        <HistogramChart pixelValues={imageData.pixels} />
                    </div>
                }
            </div>
            <button onClick={handleSubmit}>submit</button>
            <div>
                {responseImage &&
                    <div>
                        <h1>Imagem equalizada</h1>
                        <ImageDisplay imageData={responseImage} />
                    </div>
                }
                {
                    responseImage &&
                    <div>
                        <HistogramChart pixelValues={responseImage.pixels} />
                    </div>
                }
            </div>
        </div>
    );
}

export default EqualizarHistograma;

