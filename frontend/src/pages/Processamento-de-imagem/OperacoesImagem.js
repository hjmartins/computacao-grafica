import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Import the CSS file for styling
import axios from 'axios';
import ImageDisplay from '../../components/ImageDisplay';

const mascaras = [
    "soma",
    "subtracao",
    "multiplicacao",
    "divisao",
];

function OperacoesImagem() {
    const porta = '9090';

    const [imageData1, setImageData1] = useState(null);
    const [imageData2, setImageData2] = useState(null);
    const [responseImage, setResponseImage] = useState(null);
    const [selectedMascara, setSelectedMascara] = useState(mascaras[0]);

    const handleFileChange = (event, setImageData) => {
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

            resolve(imageData);
        });
    };

    const handleSubmit = (imageData1, imageData2) => {
        if (imageData1 && imageData2) {
            const dataToSend = { image1: JSON.stringify(imageData1), image2: JSON.stringify(imageData2), nomeMascara: selectedMascara };

            // Replace the following URL with your actual API endpoint
            const apiUrl = `http://localhost:${porta}/filtro/operacoes-imagem`;

            // Make the API call using axios
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

    const handleMascaraChange = (event) => {
        setSelectedMascara(event.target.value);
    };

    useEffect(() => {
    }, [imageData1, imageData2, responseImage, selectedMascara]);

    return (
        <div>
            <Menu />
            <h1>Operacoes entre Imagens</h1>

            <div>
                <label>
                    Select Mascara:
                    <select value={selectedMascara} onChange={handleMascaraChange}>
                        {mascaras.map((mascara) => (
                            <option key={mascara} value={mascara}>
                                {mascara}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                <input type="file" onChange={(e) => handleFileChange(e, setImageData1)} accept=".pgm" />
                {imageData1 && <ImageDisplay imageData={imageData1} />}
            </div>

            <div>
                <input type="file" onChange={(e) => handleFileChange(e, setImageData2)} accept=".pgm" />
                {imageData2 && <ImageDisplay imageData={imageData2} />}
            </div>

            <button onClick={() => handleSubmit(imageData1, imageData2)}>Submit Images</button>
            <div>
                {responseImage && <ImageDisplay imageData={responseImage} />}
            </div>
        </div>
    );
}

export default OperacoesImagem;
