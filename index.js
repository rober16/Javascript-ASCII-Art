const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const asciiChars = '@%#*+=-:. ';

async function convertToAscii(filePath) {
    try {
        const img = await loadImage(filePath);
        const canvas = createCanvas(img.width * 2, img.height); // Doble ancho del canvas
        const context = canvas.getContext('2d');

        // Dibujar la imagen en el canvas
        context.drawImage(img, 0, 0, img.width * 2, img.height); // Doble ancho del canvas

        // Obtener los datos de píxeles del contexto
        const imageData = context.getImageData(0, 0, img.width * 2, img.height); // Doble ancho del canvas
        const pixels = imageData.data;

        let asciiArt = '';

        // Convertir píxeles a caracteres ASCII
        for (let i = 0; i < pixels.length; i += 4) {
            const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
            const index = Math.floor((avg / 255) * (asciiChars.length - 1));
            asciiArt += asciiChars.charAt(index);
            
            if ((i / 4) % (img.width * 2) === (img.width * 2) - 1) { // Doble ancho del canvas
                asciiArt += '\n';
            }
        }

        return asciiArt;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function guardarArchivo(contenido){
    fs.writeFile('./result/result.txt', contenido, (error) => {
        if (error) {
          console.error('Error al guardar el archivo:', error);
          return;
        }
        console.log('El archivo se ha guardado correctamente.');
      }
    );
}


// Uso: node tu_script.js ruta_de_la_imagen.jpg
const filePath = './source/amongUs.png'; //process.argv[2];
if (filePath) {
    convertToAscii(filePath).then(asciiArt => guardarArchivo(asciiArt));
    convertToAscii(filePath);
}