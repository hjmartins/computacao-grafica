import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ImageDisplay from '../components/ImageDisplay';

function Filter() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [filteredImage, setFilteredImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const context = require.context('../../../assets', false, /\.(pgm)$/);

        const imagePaths = context.keys();
        const imageNames = imagePaths.map((path) => {
            const imageNameRegex = /\/([^/]+)\.pgm$/;
            const matches = path.match(imageNameRegex);
            return { imageName: matches && matches[1], imagePath: path };
        });
        setImageList(imageNames);
    }, []);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setFileName(file.name);
    };

    const handleOptionChange = (event) => {
        const selectedImageName = event.target.value;
        const selectedImageObject = imageList.find(image => image.imageName === selectedImageName);
    
        setSelectedOption(selectedImageName);
        setSelectedImage(selectedImageObject);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (selectedImage) {
            const image = { imageName: fileName };
            axios
                .post('http://localhost:9090/filtro/imagem-filtrada', image)
                .then((response) => {
                    setFilteredImage(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <h1>Upload de Imagem</h1>

            <div>
                <h2>Escolha uma imagem para exibir:</h2>
                <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="">Selecione uma opção</option>
                    {imageList.map((image, index) => (
                        <option key={index} value={image}>
                            {image.imageName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="image-container">
                    <div>
                        <h2>Imagem selecionada:</h2>
                        <ImageDisplay imagePath={'../../../assets/lena.pgm'} alt="Imagem selecionada" />
                    </div>
d
                {filteredImage && (
                    <div>
                        <h2>Imagem filtrada:</h2>
                        <img src={`data:image/pgm;base64,${filteredImage}`} alt="Imagem filtrada" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Filter;
