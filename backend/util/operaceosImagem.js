const operacoesImagem = {
    negativo: negativo,
    gama: gama,
    logaritmo: logaritmo,
    TransferênciadeIntensidadeGeral: TransferênciadeIntensidadeGeral,
    TransferênciaFaixaDinâmica: TransferênciaFaixaDinâmica,
    TransferênciaLinear: TransferênciaLinear,
}

// Função para aplicar a transformação negativo em uma imagem
function negativo(image, param) {
    const newPixels = []
    image.pixels.forEach(pixelLine => {
        const newPixelLine = [];
        pixelLine.forEach(pixel => newPixelLine.push(255 - pixel))
        newPixels.push(newPixelLine)
    });
    return newPixels;
}

// Função para aplicar a transformação gamma em uma imagem
function gama(image, param) {
    const newPixels = []
    image.pixels.forEach(pixelLine => {
        const newPixelLine = [];
        pixelLine.forEach(pixel => newPixelLine.push(Math.pow(pixel / 255, param.gamma) * 255))
        newPixels.push(newPixelLine)
    });
    return newPixels;
}

// Função para aplicar a transformação logaritmo em uma imagem
function logaritmo(image, param) {
    const newPixels = []
    image.pixels.forEach(pixelLine => {
        const newPixelLine = [];
        pixelLine.forEach(pixel => newPixelLine.push(param.a * Math.log(pixel + 1)))
        newPixels.push(newPixelLine)
    });
    return newPixels;
}

// Função para aplicar a transferência de intensidade geral em uma imagem
function TransferênciadeIntensidadeGeral(image, param) {
    const newPixels = []
    image.pixels.forEach(pixelLine => {
        const newPixelLine = [];
        pixelLine.forEach(pixel => newPixelLine.push(param.w + param.a * pixel))
        newPixels.push(newPixelLine)
    });
    return newPixels;
}

// Função para aplicar a transferência de faixa dinâmica em uma imagem
function TransferênciaFaixaDinâmica(image, param) {
    const newPixels = []
    image.pixels.forEach(pixelLine => {
        const newPixelLine = [];
        pixelLine.forEach(pixel => newPixelLine.push(((pixel - param.min) / (param.max - param.min)) * 255))
        newPixels.push(newPixelLine)
    });
    return newPixels;
}

// Função para aplicar a transferência linear em uma imagem
function TransferênciaLinear(image, param) {
    const newPixels = []
    image.pixels.forEach(pixelLine => {
        const newPixelLine = [];
        pixelLine.forEach(pixel => newPixelLine.push( param.a * pixel + param.b))
        newPixels.push(newPixelLine)
    });
    return newPixels;
}

module.exports = { operacoesImagem };