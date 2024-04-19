const requestUrl = "https://students.netoservices.ru/nestjs-backend/upload";

function sendForm(event) {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    const fileInput = event.currentTarget.querySelector("#file");
    
    if (fileInput.files.length > 0) {
        const fileToUpload = fileInput.files[0];

        formData.append('file', fileToUpload);
        // собираем запрос и подписываемся на событие progress
        xhr.upload.addEventListener('progress', setAnimateProgressBar);
        //обработчики ответа формы
        xhr.upload.addEventListener('error', () => console.error('Произошла ошибка при загрузке данных на сервер!'));
        xhr.upload.addEventListener('load', () => console.log('Данные полностью загружены на сервер!'));
        xhr.open('POST', requestUrl);
        xhr.send(formData);

        event.currentTarget.reset();
    } else {
        alert('Выберите файл');
    }
}

function setAnimateProgressBar(event) {
    const progress = document.querySelector('#progress');

    if(!progress) {
        return;
    }

    const quantityBytesInMBites = 1048576;
    const loadedMb = (event.loaded / quantityBytesInMBites).toFixed(1);
    const totalSizeMb = (event.total / quantityBytesInMBites).toFixed(1);
    const percentLoaded = Math.round((event.loaded / event.total) * 100);

    progress.value = (percentLoaded / 100).toFixed(1);
}


document.addEventListener("DOMContentLoaded", ()  => {
    const form = document.querySelector("#form");

    if(form) {
        form.addEventListener("submit", sendForm);
    }
});