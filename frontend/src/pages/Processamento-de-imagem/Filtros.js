import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';
import ImageDisplay from '../../components/ImageDisplay';

const mascaras = [
    "sem_mascara",
    "mascara_media",
    "mascara_passa_alta_basico_1",
    "mascara_passa_alta_basico_2",
    "robertsX",
    "robertsY",
    "sobelX",
    "sobelY",
    "prewittX",
    "prewittY",
    "mediana",
    "robertsXY",
    "sobelXY",
    "prewittXY"
];

function Filter() {

    const porta = '9090';

    const [imageData, setImageData] = useState(null);
    const [responseImage, setResponseImage] = useState(null);
    const [selectedMascara, setSelectedMascara] = useState(mascaras[0]);

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

            for (let y = 3; y < parseInt(height, 10); y++) {
                const currLine = lines[y].split(' ');
                // console.log(currLine)
                if(currLine){
                    const currPixelLine = [];

                    for (let x = 0; x < parseInt(width, 10); x++) {
                        if(currLine[x]){
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
            console.log('lelele')
            setImageData(imageData);
            resolve(imageData);
        });
    };

    useEffect(() => {
    }, [imageData]);

    const handleSubmit = () => {
        if (imageData) {
            const dataToSend = { image: JSON.stringify(imageData), nomeMascara: selectedMascara };

            // Replace the following URL with your actual API endpoint
            const apiUrl = `http://localhost:${porta}/filtro/imagem-filtrada`;

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
    }, [imageData, responseImage, selectedMascara]);


    return (
        <div>
            <Menu />
            <h1>Filtros</h1>

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
                <input type="file" onChange={handleFileChange} accept=".pgm" />
                {imageData && <ImageDisplay imageData={imageData} />}
            </div>
            <button onClick={handleSubmit}>submit</button>
            <div>
                {responseImage && <ImageDisplay imageData={responseImage} />}
            </div>
        </div>
    );
}

export default Filter;

