const fs = require('fs');

class Image {
  constructor(width, height, maxPixelValue, pixels) {
    this.width = width;
    this.height = height;
    this.maxPixelValue = maxPixelValue;
    this.pixels = pixels;
  }

  toString() {
    return `Image: ${this.width}x${this.height}, Max Pixel Value: ${this.maxPixelValue}`;
  }

  static readPgmFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const lines = data.trim().split('\n');
        const format = lines[0].trim();

        if (format !== 'P2') {
          reject(new Error('Invalid PGM file format. Only P2 is supported.'));
          return;
        }

        const [width, height] = lines[1].split(' ').map(Number);
        const maxPixelValue = parseInt(lines[2], 10);
        const pixels = lines.slice(3).map(line => line.split(' ').map(Number)).flat();

        const image = new Image(width, height, maxPixelValue, pixels);
        resolve(image);
      });
    });
  }

  static createPgmFile(filePath, image) {
    return new Promise((resolve, reject) => {
      const content = `P2\n${image.width} ${image.height}\n${image.maxPixelValue}\n${image.pixels.join(' ')}\n`;

      fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(filePath);
      });
    });
  }
}

module.exports = Image;
