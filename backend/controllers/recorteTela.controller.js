const matriz = require('../util/matrizes');

// Códigos de região para Cohen-Sutherland
const INSIDE = 0; // 0000
const LEFT = 1;   // 0001
const RIGHT = 2;  // 0010
const BOTTOM = 4; // 0100
const TOP = 8;    // 1000

class RecorteTela {

    computeOutCode = (x, y, xmin, ymin, xmax, ymax) => {
        let code = INSIDE;

        if (x < xmin) {
            code |= LEFT;
        } else if (x > xmax) {
            code |= RIGHT;
        }

        if (y < ymin) {
            code |= BOTTOM;
        } else if (y > ymax) {
            code |= TOP;
        }

        return code;
    }

    cohenSutherlandClip(req) {

        let { x0, y0, x1, y1, xmin, ymin, xmax, ymax } = req.query;

        let outcode0 = this.computeOutCode(x0, y0, xmin, ymin, xmax, ymax);
        let outcode1 = this.computeOutCode(x1, y1, xmin, ymin, xmax, ymax);
        let accept = false;

        while (true) {
            if (!(outcode0 | outcode1)) {
                // Ambos pontos estão dentro da janela, aceita a linha
                accept = true;
                break;
            } else if (outcode0 & outcode1) {
                // Ambos pontos estão fora de uma mesma borda, rejeita a linha
                break;
            } else {
                // Ponto precisa ser recortado, encontra o ponto de interseção
                let x, y;

                // Escolhe um ponto fora da janela (pode ser na borda)
                let outcodeOut = outcode0 ? outcode0 : outcode1;

                // Interseção com a borda esquerda
                if (outcodeOut & LEFT) {
                    x = xmin;
                    y = y0 + (y1 - y0) * (xmin - x0) / (x1 - x0);
                } else if (outcodeOut & RIGHT) {
                    // Interseção com a borda direita
                    x = xmax;
                    y = y0 + (y1 - y0) * (xmax - x0) / (x1 - x0);
                } else if (outcodeOut & BOTTOM) {
                    // Interseção com a borda inferior
                    y = ymin;
                    x = x0 + (x1 - x0) * (ymin - y0) / (y1 - y0);
                } else if (outcodeOut & TOP) {
                    // Interseção com a borda superior
                    y = ymax;
                    x = x0 + (x1 - x0) * (ymax - y0) / (y1 - y0);
                }

                // Atualiza as coordenadas do ponto de interseção e seu código de região
                if (outcodeOut === outcode0) {
                    x0 = Math.round(x);
                    y0 = Math.round(y);
                    outcode0 = this.computeOutCode(x0, y0, xmin, ymin, xmax, ymax);
                } else {
                    x1 = Math.round(x);
                    y1 = Math.round(y);
                    outcode1 = this.computeOutCode(x1, y1, xmin, ymin, xmax, ymax);
                }
            }
        }

        if (accept) {
            // Retornar os novos valores de x0, y0, x1 e y1
            return { x0: Math.round(x0), y0: Math.round(y0), x1: Math.round(x1), y1: Math.round(y1) };
        } else {
            // Se a linha for rejeitada, pode retornar null ou uma indicação de erro
            return null;
        }
    }
}

module.exports = new RecorteTela();
