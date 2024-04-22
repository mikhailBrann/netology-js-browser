function setToStorage(key, value) {
    localStorage.setItem(key, value);
}

function removeToStorage(key) {
    localStorage.removeItem(key);
}

function clearInput(key, textElem) {
    if(key && textElem) {
        textElem.value = '';
        localStorage.removeItem(key);
    }
}


document.addEventListener("DOMContentLoaded", ()=> {
    const key = 'inputText';
    const textArea = document.querySelector("#editor");
    const btnClear = document.querySelector("#clear");

    if(textArea) {
        textArea.value = localStorage.getItem(key) ?? "";

        textArea.addEventListener("input", (event) => {
            const value = event.currentTarget.value;

            if(value != '') {
                setToStorage(key, value);
            } else {
                removeToStorage(key);
            }
        });
    }

    if(btnClear) {
        btnClear.addEventListener("click", ()=> clearInput(key, textArea));
    }
});