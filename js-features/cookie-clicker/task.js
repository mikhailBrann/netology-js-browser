function getTime(elem) {
    if(elem.dataset.previusDate) {
        let oldDate = new Date(elem.dataset.previusDate);
        let newDate = new Date();
        const timeDiff = Math.abs(newDate.getTime() - oldDate.getTime());

        if(!document.getElementById("counter_diff")) {
            let clickerTimeContainer = document.createElement("span");
            let parent = elem.closest(".clicker").querySelector(".clicker__status");
            clickerTimeContainer.id = "counter_diff";
            parent.appendChild(clickerTimeContainer);
        }

        const secondsDiffElem = document.getElementById("counter_diff");

        if(secondsDiffElem) {
            secondsDiffElem.textContent = "Скорость клика: " + (timeDiff / 1000).toFixed(2);
        }

        elem.dataset.previusDate = newDate;
    } 
}

function cookieClicker(elem, resizeCookieValue=300) {
    const startValue = elem.width;
    const counter = document.getElementById("clicker__counter");
    
    if(startValue == resizeCookieValue) {
        elem.width = elem.dataset.previewValue;
    }

    if(startValue != resizeCookieValue) {
        elem.dataset.previewValue = startValue;
        elem.width = resizeCookieValue;
    }

    if(counter) {
        let counterValue = Number(counter.textContent);

        //проверяем на первый клик
        if(counterValue <= 0) {
            elem.dataset.previusDate = new Date();  
        } else {
            let speedClick = getTime(elem);
        }

        counter.textContent = counterValue  + 1;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const gameClickElem = document.getElementById("cookie");

    if(gameClickElem) {
        gameClickElem.addEventListener("click", (event) => cookieClicker(event.currentTarget));
    }
});