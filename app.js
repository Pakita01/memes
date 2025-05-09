// Esperar a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById('downloadButton').addEventListener('click', downloadCatImage);
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');// Obtener el elemento canvas y su contexto de renderizado 2D
    // Clave API para The Cat API
    const api_key = "live_HcEbajHM093kCvQRibaaZbwJCly7NzJ5FDVTcbWTBX0FTucNS5hcjUJ4qvxU389j";
    let image = new Image(); // Crear un nuevo objeto Image para cargar imágenes de gatos
    
    document.getElementById('catButton').addEventListener('click', getCatImage);
    document.getElementById('actualizar').addEventListener('click', actualizarTexto)
    // document.getElementById('colorTexto').addEventListener('input', actualizarTexto)
    // document.getElementById('colorTexto').addEventListener('input', actualizarTexto)

 // Función asíncrona para obtener una imagen aleatoria de gato de The Cat API
    async function getCatImage() {
        try {// Obtener una imagen aleatoria de gato de la API
          const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${api_key}`)
              .then(response => response.json())// Parsear la respuesta JSON
              .then(data => {
                    // const proxyUrl = `https://cors-anywhere.herokuapp.com/${data[0].url}`;
                    // image.crossOrigin = "Anonymous";
                    image.src = data[0].url;
                    // Configurar el botón de descarga con la URL de la imagen
                    document.getElementById('downloadButton').href = data[0].url;
                    document.getElementById('downloadButton').download = data[0].url;
                    addimage()// Llamar a la función para añadir la imagen al canvas
                })
        } catch (error) {
          console.error('Error:', error);
        }
    }
     // Función para manejar la carga de imagen y configuración del canvas
    function addimage() {
        image.addEventListener('load', () => {// Esperar a que la imagen se cargue antes de procesarla
            const aspectRatio = image.width / image.height;// Calcular la relación de aspecto de la imagen
            const maxWidth = window.innerWidth * 0.8;// Establecer dimensiones máximas basadas en el tamaño de la ventana
            const maxHeight = window.innerHeight * 0.8;
    
            let canvasWidth, canvasHeight;
             // Calcular dimensiones del canvas manteniendo la relación de aspecto
            if (maxWidth / maxHeight < aspectRatio) {
                canvasWidth = maxWidth;
                canvasHeight = maxWidth / aspectRatio;
            } else {
                canvasWidth = maxHeight * aspectRatio;// El alto es el factor limitante
                canvasHeight = maxHeight;
            }
            canvas.width = canvasWidth;download="meme."
            canvas.height = canvasHeight
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            actualizarTexto(image)
        })
    }
    function actualizarTexto() { // Función para actualizar el texto en el canvas
        const tamanoTexto = document.getElementById('tamanoTexto').value;
        const colorTexto = document.getElementById('colorTexto').value;
        const texto = document.getElementById('texto_meme').value;
        // Volver a dibujar la imagen (limpia el texto anterior)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = colorTexto;// Configurar estilo del texto
        ctx.font = `${tamanoTexto}px Arial`;
        ctx.textAlign = 'center';// Centrar texto horizontalmente
        ctx.textBaseline = 'middle';// Centrar texto verticalmente
        ctx.fillText(texto, canvas.width / 2, (canvas.height / 4) *3);// Dibujar el texto en la parte inferior centrada de la imagen
    }
    // function downloadCatImage() {
    //     canvas.toBlob(function(blob) {
    //         const enlace = document.createElement('a');
    //         enlace.href = URL.createObjectURL(blob);
    //         enlace.download = 'canvas_image.png';
            
    //         enlace.click();
            
    //         URL.revokeObjectURL(enlace.href);
    //       }, 'image/png');
    // }


    
});






