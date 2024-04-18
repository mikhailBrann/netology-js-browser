function currencyRenderList(dataObject) {
    const currencyList = document.querySelector("#items");

    if(currencyList) {
        currencyList.innerHTML = "";

        for(let elem in dataObject) {
            const renderElem = createCurencyHtmlElem(dataObject[elem].CharCode, dataObject[elem].Value);
            currencyList.insertAdjacentHTML("beforeend", renderElem);
        }
    }
}

function createCurencyHtmlElem(charCode, value) {
    return `<div class="item">
        <div class="item__code">${charCode}</div>
        <div class="item__value">${value}</div>
        <div class="item__currency">руб.</div>
    </div>`;
}

function preloaderControl(state='on', preloaderSelector="#loader", activateClass="loader_active") {
    const preloaderNode = document.querySelector(preloaderSelector);

    if(!preloaderNode) {
        return;
    }

    if(state == 'on') {
        preloaderNode.classList.add(activateClass);
    }

    if(state == 'off') {
        preloaderNode.classList.remove(activateClass);
    }
}


document.addEventListener("DOMContentLoaded",  ()=> {
    //рендерим лист из storage
    if(window.localStorage.getItem('currency') != null) {
        const currencyStorageData = JSON.parse(window.localStorage.getItem('currency'));

        currencyRenderList(currencyStorageData);
    }

    const requestUrl = "https://students.netoservices.ru/nestjs-backend/slow-get-courses";
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4) {
            const requestData = JSON.parse(xhr.responseText);

            if(requestData?.response?.Valute) {
                //записываем в storage и обновляем рендер
                const currencyData = requestData.response.Valute;

                window.localStorage.setItem('currency', JSON.stringify(currencyData));
                currencyRenderList(currencyData);
            }
            
            preloaderControl('off');
        }
    });

    //запускаем прелоадер и делаем запрос
    preloaderControl('on');
    xhr.open("GET", requestUrl);
    xhr.send();
});