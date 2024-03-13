const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function convertToAscii(filePath) {
    try {
        const img = await loadImage(filePath);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const asciiArt = convertImageDataToAscii(imageData);

        console.log(asciiArt);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function convertImageDataToAscii(imageData) {
    const pixels = imageData.data;
    let asciiArt = '';

    for (let i = 0; i < pixels.length; i += 4) {
        const grayscale = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        const asciiChar = getAsciiChar(grayscale);
        asciiArt += asciiChar;

        if ((i / 4) % imageData.width === imageData.width - 1) {
            asciiArt += '\n';
        }
    }

    return asciiArt;
}

function getAsciiChar(grayscale) {
    const asciiChars = '@%#*+=-:. ';
    const index = Math.floor((grayscale / 255) * (asciiChars.length - 1));
    return asciiChars.charAt(index);
}

// Uso: node tu_script.js ruta_de_la_imagen.jpg
const filePath = './source/emoji2.jpg'; //process.argv[2];
if (filePath) {
    convertToAscii(filePath);
}