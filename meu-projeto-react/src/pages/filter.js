import React, { useState, useRef } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setFileName(file.name); // Armazene o nome do arquivo selecionado
  };
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedImage) {
      const image = {'imageName': fileName, 'image': selectedImage}


      console.log(fileName)
      console.log('----------------------------------')
      console.log(selectedImage)
      console.log('----------------------------------')
      console.log(image)
  
      axios
        .post('http://localhost:9090/filtro/media', image)
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

      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Selecione uma imagem (formato .pgm):</label>
          <input type="file" accept=".pgm" ref={fileInputRef} onChange={handleImageSelect} />
        </div>

        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>

      <div className="image-container">
        {selectedImage && (
          <div>
            <h2>Imagem selecionada:</h2>
            <img src={URL.createObjectURL(selectedImage)} alt="Imagem selecionada" />
          </div>
        )}

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

export default ImageUpload;
