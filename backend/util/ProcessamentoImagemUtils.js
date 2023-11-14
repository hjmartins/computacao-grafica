const ndarray = require('ndarray');

class ProcessamentoImagemUtils {
    convertToNdArray(array) {
        // Flatten the bidimensional array into a 1-dimensional array
        const flattenedArray = [].concat(...array);

        // Calculate the shape of the ndarray
        const numRows = array.length;
        const numCols = array[0].length;
        const shape = [numRows, numCols];

        // Create a 2-dimensional ndarray
        return ndarray(new Float64Array(flattenedArray), shape);
    }

    applyConvolution(img, kernel, doNormalize) {
        let height = img.height;
        let width = img.width;
        let pixels = img.pixels;
        let res = []

        const matrix = this.convertToNdArray(pixels)
        kernel = this.convertToNdArray(kernel)


        for (let i = 0; i <= height + 1; i++) {
            let miniRes = [];
            for (let j = 0; j <= width + 1; j++) {
                miniRes.push(this.convolution(matrix, i, j, kernel))
            }
            res.push(miniRes)
        }

        return doNormalize ? this.normalize(res, width, height) : res;
    }

    convolution(matrix, x, y, kernel) {
        let acc = 0
        for (let i = -1; i < 2; i++) {
            for (let j = 0 - 1; j < 2; j++) {
                const curr = matrix.get(x + i, y + j);
                if (curr) {
                    acc += curr * kernel.get(1 + i, 1 + j)
                }
            }
        }
        return acc
    }
    magnitude(gx, gy, width, height, doNormalize = true) {
        let res = [];
        for (let i = 0; i < height; i++) {
            let miniRes = [];
            for (let j = 0; j < width; j++) {
                miniRes[j] = Math.abs(gx[i][j]) + Math.abs(gy[i][j]);
            }
            res.push(miniRes); // Push miniRes into res
        }
        return doNormalize ? this.normalize(res, width, height) : res;
    }
    

    composition(a, b, width, height, operator, doNormalize = false) {
        let res = [];
        for (let i = 0; i < height; i++) {
            res[i] = [];
            for (let j = 0; j < width; j++) {
                res[i][j] = operator(a[i][j], b[i][j]);
            }
        }

        return doNormalize ? this.normalize(res, width, height) : res;
    }

    normalize(imgPixels, width, height) {
        let min = imgPixels[0][0];
        let max = min;

        let res = [];

        for (let i = 0; i < height; ++i) {
            for (let j = 0; j < width; ++j) {
                let v = imgPixels[i][j];
                if (v < min) min = v;
                if (v > max) max = v;
            }
        }

        let range = (max - min) === 0 ? 0 : 255 / (max - min);

        for (let i = 0; i < height; ++i) {
            res[i] = [];
            for (let j = 0; j < width; ++j) {
                res[i][j] = Math.round(range * (imgPixels[i][j] - min));
            }
        }

        return res;
    }

}
module.exports = new ProcessamentoImagemUtils()