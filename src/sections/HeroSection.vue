<template>
    <!-- Hero Section Start -->
    <div class="container mx-auto px-5 overflow-x-hidden lg:overflow-x-visible">
        <!-- ref="draggableDiv"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop" -->
        <section class="grid grid-cols-none lg:grid-cols-2 pb-16 pt-8 items-center">
            <div class="lg:w-5/6 order-2 lg:order-none">
                <h1 class="text-4xl xl:text-5xl font-bold font-theme-heading text-center lg:text-left">
                    HEIC TO JPG, CONVERTER
                </h1>
                <p class="lg:text-xl mt-10 font-theme-content text-theme-grayish-blue text-center lg:text-left">Easily
                    convert your HEIC files to JPG. Just upload your photos and our online converter will convert them to
                    the popular JPG format in seconds. A free, fast and easy service.
                </p>
                <div
                :class="{
                    'flex justify-center lg:justify-start mt-10 drop-area': !isDraggingOver,
                    'animate-pulse drop-area' : isDraggingOver,
                }"
                >
                    <div class="bg-gray-50 text-center px-4 rounded w-80 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed mx-auto font-[sans-serif]" >
                        <div class="py-6" >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 mb-2 fill-gray-600 inline-block"
                                viewBox="0 0 32 32">
                                <path
                                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                    data-original="#000000" />
                                <path
                                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                    data-original="#000000" />
                            </svg>
                            <h4 class="text-base font-semibold text-gray-600">Grag and drop files here</h4>
                        </div>
                        <!-- Label para mostrar el nombre de los archivos y la cantidad -->
                        <label>
                            <label>
                                {{ fileNames }}
                            </label><br/>
                            <span v-for="(name, index) in imageArray" :key="index">
                                <span style="cursor: pointer;" @click="removeImage(index)" >
                                    {{ name }}
                                </span>
                                <span v-if="index !== imageArray.length - 1">, </span>
                            </span>
                            <span v-if="imageArray.length === 0">Ningún archivo seleccionado</span>
                        </label>
                        <hr class="w-full border-gray-400 my-2" />
                        <div class="py-6">
                            <input type="file" id='fileInput' class="hidden" ref="fileInput" multiple
                                @change="handleFileChange" />
                            <label for="fileInput"
                                class="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider font-semibold border-none outline-none bg-gray-200 hover:bg-gray-100">Browse
                                Files</label>
                            <p class="text-xs text-gray-400 mt-4">HEIC, are Allowed.</p>
                        </div>
                        <!-- Botón para guardar las imágenes -->
                        
                        <button
                        v-if="imageArray.length > 0"
                        @click="convertAndDisplayImages(this.filesToConvert)"
                        class=" font-theme-heading font-medium bg-theme-primary px-6 py-2 mb-2 text-white rounded shadow-md hover:bg-white border-2 border-transparent hover:border-theme-primary hover:text-theme-primary cursor-pointer transition duration-200 mr-5"
                        >
                            Convertir Imágenes
                        </button>
                        <div v-if="isConverted === false && converting === true" class="flex items-center">
                            <div role="status">
                                <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                            Preparing
                        </div>
                        <button
                        v-if="isConverted === true && converting === false && imageArray.length > 0"
                        @click="downloadConvertedImagesAsZip"
                        class=" font-theme-heading font-medium bg-theme-primary px-6 py-2 mb-2 text-white rounded shadow-md hover:bg-white border-2 border-transparent hover:border-theme-primary hover:text-theme-primary cursor-pointer transition duration-200 mr-5"
                        >
                            Download as .zip file
                        </button>
                    </div>
                    <!-- <div v-for="(imageUrl, index) in convertedImageUrls" :key="index">
                        <img :src="imageUrl" alt="Converted Image" />
                    </div> -->
                    <!-- <LinkButton btn-type="primary" link="#download-section">Get It On Chrome</LinkButton>
                    <LinkButton btn-type="muted" link="#download-section">Get It On Firefox</LinkButton> -->
                </div>
            </div>
            <div class="relative order-1 lg:order-none mb-20 lg:mt-0 lg:mb-0 lg:-mr-10">
                <img class="z-10 w-full" src="/images/illustration-hero.svg" />
                <div
                    class="-z-10 bg-theme-primary h-52 w-full sm:h-80 sm:w-full rounded-l-full absolute -right-28 md:-right-48 -bottom-8">
                </div>
            </div>
        </section>
    </div>
    <!-- upload animation -->
    <!-- <div v-if="isDraggingOver" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto z-50">
        <div role="status" class="">
            <svg width="400px" height="400px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M768 810.7c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7c94.1 0 170.7-76.6 170.7-170.7 0-89.6-70.1-164.3-159.5-170.1L754 383l-10.7-22.7c-42.2-89.3-133-147-231.3-147s-189.1 57.7-231.3 147L270 383l-25.1 1.6c-89.5 5.8-159.5 80.5-159.5 170.1 0 94.1 76.6 170.7 170.7 170.7 23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7c-141.2 0-256-114.8-256-256 0-126.1 92.5-232.5 214.7-252.4C274.8 195.7 388.9 128 512 128s237.2 67.7 297.3 174.2C931.5 322.1 1024 428.6 1024 554.7c0 141.1-114.8 256-256 256z" fill="#3688FF" /><path d="M640 789.3c-10.9 0-21.8-4.2-30.2-12.5L512 679l-97.8 97.8c-16.6 16.7-43.7 16.7-60.3 0-16.7-16.7-16.7-43.7 0-60.3l128-128c16.6-16.7 43.7-16.7 60.3 0l128 128c16.7 16.7 16.7 43.7 0 60.3-8.4 8.4-19.3 12.5-30.2 12.5z" fill="#5F6379" /><path d="M512 960c-23.6 0-42.7-19.1-42.7-42.7V618.7c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v298.7c0 23.5-19.1 42.6-42.7 42.6z" fill="#5F6379" /></svg>
        </div>
    </div> -->
    <!-- Hero Section End -->
</template>
<script>
import { ref, reactive } from "vue";
import Axios from "axios";
import JSZip from 'jszip';
import FileSaver from 'file-saver'; 
import heic2any from 'heic2any';
export default {
    name: "heroSection",
    components: {
    },
    setup() {
        return {
            URL: import.meta.env.VITE_APP_URL_CONVERTER,
            imageArray: ref([]),
            filesToConvert: ref([]),
            clicked: ref(false),
            isDraggingOver: ref(false),
            convertedImageUrls: ref([]),
            converting: ref(false),
            isConverted: ref(false),
        };
    },
    computed: {
    fileNames() {
      // Obtener los nombres de los archivos cargados
      const names = this.imageArray.map(file => file.name);
      const count = names.length;
      // Construir el mensaje a mostrar en el label
      if (count === 0) {
        //return 'Ningún archivo seleccionado';
      } else if (count === 1) {
        return `Archivo seleccionado`;
      } else {
        return `Archivos seleccionados: ${count}`;
      }
    }
  },
  mounted() {
    document.addEventListener('dragover', this.handleDragOver);
    document.addEventListener('dragleave', this.handleDragLeave);
    document.addEventListener('drop', this.handleDrop);
  },
    methods: {
        async handleFileChange(event) {
            const allowedFormats = ['heic', 'jpg',	 'jpeg', 'png'];     
            // Obtener la lista de archivos seleccionados
            const files = event.target.files;
            // Recorrer la lista de archivos
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // Obtener la extensión del archivo
                const extension = file.name.split('.').pop().toLowerCase();
                // Verificar si la extensión está permitida
                if(!allowedFormats.includes(extension)) {
                    // Mostrar error si el formato no está permitido
                    alert('Formato no permitido. Solo se permiten archivos heic.');
                    return;
                }
                // Si el formato está OK, agregar el archivo
                this.imageArray.push(file.name);
                //this.filesToConvert = files;
                this.filesToConvert = this.filesToConvert.concat(Array.from(files));
                console.log("this.filesToConvert: ", this.filesToConvert);
                this.isConverted = false;
                this.converting = false;           
            }
        },
        removeImage(index) {
            // Eliminar el archivo del arreglo basado en el índice
            this.imageArray.splice(index, 1);
            this.filesToConvert.splice(index, 1);
            this.isConverted = false;
            this.converting = false;
            console.log("imageArray: ", this.imageArray);
        },
        saveImages() {
            this.clicked = true;
            // Crear un objeto FormData para enviar los archivos al backend
            const formData = new FormData();
            this.imageArray.forEach((name, index) => {
                formData.append(`image${index}`, name);
            });
            // Enviar las imágenes al backend usando Axios
            const url = `${this.URL}/upload`
            Axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                console.log('Respuesta del backend:', response.data);
                // Puedes realizar acciones adicionales con la respuesta del backend si es necesario
            })
            .catch(error => {
                console.error('Error al enviar las imágenes al backend:', error);
            });
            console.log("imageArray: ", this.imageArray);
        },
        handleDragOver(event) {
            event.preventDefault();
            this.isDraggingOver = true;
            console.log("isDraggingOver: ", this.isDraggingOver);
        },
        handleDragLeave(event) {
            event.preventDefault();
            // Verificar si el cursor está saliendo del área o de sus elementos hijos
            this.isDraggingOver = false;
            console.log("isDraggingOver: ", this.isDraggingOver);
        },
        handleDrop(event) {
            event.preventDefault();
            const allowedFormats = ['jpg', 'jpeg', 'png'];     
            // Obtener la lista de archivos seleccionados
            const files = event.dataTransfer.files;
            // Recorrer la lista de archivos y agregar cada uno al arreglo
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // Obtener la extensión del archivo
                const extension = file.name.split('.').pop().toLowerCase();
                // Verificar si la extensión está permitida
                if(!allowedFormats.includes(extension)) {
                    // Mostrar error si el formato no está permitido
                    this.isDraggingOver = false;
                    alert('Formato no permitido. Solo se permiten archivos JPG.');
                    return;
                }
                // Si el formato está OK, agregar el archivo
                this.imageArray.push(file.name);
                this.filesToConvert = files;
                this.isConverted = false;
                this.converting = false;
            }
            console.log("imageArray: ", this.imageArray);
            this.isDraggingOver = false;
        },
        async convertAndDisplayImages(files) {
            if (this.filesToConvert && this.filesToConvert.length > 0) {
                this.converting = true;
                // Limpiar la lista de URLs antes de la conversión
                this.convertedImageUrls = [];
                // Iterar sobre cada archivo y convertir a JPG
                for (const file of files) {
                    try {
                        const jpgUrl = await this.convertHeicToJpg(file);
                        this.convertedImageUrls.push(jpgUrl);
                    } catch (error) {
                        console.error(`Error al convertir la imagen ${file.name}:`, error);
                    }
                }
                this.isConverted = true;
                this.converting = false;
            }
        },
        async convertHeicToJpg(heicFile) {
            // Convierte la imagen HEIC a formato JPG
            const jpgBlob = await heic2any({
                blob: heicFile,
                toType: 'image/jpeg',
                quality: 0.7, // ajusta la calidad según tus necesidades
            });
            // Crea una URL de datos para la imagen JPG
            const jpgUrl = URL.createObjectURL(jpgBlob);
            return jpgUrl;
        },
        async downloadConvertedImagesAsZip() {
            if (this.convertedImageUrls && this.convertedImageUrls.length > 0) {
                const zip = new JSZip();            
                // Iterar sobre cada URL de imagen convertida y agregar al archivo zip
                for (let i = 0; i < this.convertedImageUrls.length; i++) {
                    const imageUrl = this.convertedImageUrls[i];
                    const response = await fetch(imageUrl);
                    const arrayBuffer = await response.arrayBuffer();
                    // Agregar la imagen al archivo zip
                    zip.file(`converted_image_${i + 1}.jpg`, arrayBuffer);
                }
                // Generar el archivo zip
                const zipBlob = await zip.generateAsync({ type: 'blob' });
                // Crear una URL de datos para el archivo zip
                const zipUrl = URL.createObjectURL(zipBlob);
                // Crear un enlace de descarga y hacer clic en él para iniciar la descarga
                const downloadLink = document.createElement('a');
                downloadLink.href = zipUrl;
                downloadLink.download = 'converted_images.zip';
                downloadLink.click();
                // Limpiar la URL de datos después de la descarga
                URL.revokeObjectURL(zipUrl);
            }
        }
    }
}
</script>
<style scoped>

/* Definir la animación de pulsación */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
/* Aplicar la animación de pulsación */
.animate-pulse {
  animation: pulse 1s infinite;
}
.pointer-events-none {
  pointer-events: none; 
}
</style>

