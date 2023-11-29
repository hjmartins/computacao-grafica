import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';
import ImageDisplay from '../../components/ImageDisplay';

const mascaras = [
    {mascara: "negativo"},
    {mascara: "gama", params: ["gamma"]},
    {mascara: "logaritmo", params: ["a"]},
    {mascara: "TransferênciadeIntensidadeGeral", params: ["w", "a"]}, 
    {mascara: "TransferênciaFaixaDinâmica", params: ["min", "max"]},
    {mascara: "TransferênciaLinear", params: ["a", "b"]},
];

function TransformacaoImagem() {

    const porta = '9090';

    const [imageData, setImageData] = useState(null);
    const [responseImage, setResponseImage] = useState(null);
    const [selectedMascara, setSelectedMascara] = useState(mascaras[0]);
    const [formValues, setFormValues] = useState({});

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
            setImageData(imageData);
            resolve(imageData);
        });
    };

    useEffect(() => {
    }, [imageData]);

    const handleSubmit = () => {
        console.log(selectedMascara)
        console.log(formValues)
        if (imageData) {
            const dataToSend = { image: JSON.stringify(imageData), nomeMascara: selectedMascara, operacao: formValues };

            // Replace the following URL with your actual API endpoint
            const apiUrl = `http://localhost:${porta}/transformacao-de-imagem`;

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
        const selectedMascaraValue = event.target.value;
        const selectedMascaraObj = mascaras.find(mascara => mascara.mascara === selectedMascaraValue);
        setSelectedMascara(selectedMascaraObj);

        setFormValues({});
    };

    useEffect(() => {
    }, [imageData, responseImage, selectedMascara]);

    // Handle input change for parameter fields
    const handleParamChange = (param, value) => {
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            [param]: value,
        }));
    };


    return (
        <div>
            <Menu />
            <h1>Filtros</h1>

            <div>
                <label>
                    Select Mascara:
                    <select value={selectedMascara.mascara} onChange={handleMascaraChange}>
                        {mascaras.map((mascara) => (
                            <option key={mascara.mascara} value={mascara.mascara}>
                                {mascara.mascara}
                            </option>
                        ))}
                    </select>
                </label>
                {selectedMascara.params && selectedMascara.params.length > 0 && (
                    <form>
                        {selectedMascara.params.map((param, index) => (
                            <div key={index}>
                                <label>
                                    {param}:
                                    <input
                                        type="text"
                                        name={param}
                                        value={formValues[param] || ''}
                                        onChange={(e) => handleParamChange(param, e.target.value)}
                                    />
                                </label>
                            </div>
                        ))}
                    </form>
                )}
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

export default TransformacaoImagem;

