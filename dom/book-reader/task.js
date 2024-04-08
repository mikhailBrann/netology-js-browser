function setFontSize(elem) {
    const parent = document.querySelector("#book");

    if(!parent) {
        return false;
    }

    parent.classList.remove("book_fs-small");
    parent.classList.remove("book_fs-big");

    if(elem.dataset.size) {
        parent.classList.add("book_fs-" + elem.dataset.size);
    } 
}

function setColor(elem) {
    const parent = document.querySelector("#book");

    if(!parent) {
        return false;
    }

    if(elem.dataset.textColor) {
        parent.style.color = elem.dataset.textColor;
    }
}

function setBackground(elem) {
    const parent = document.querySelector("#book");

    if(!parent) {
        return false;
    }

    if(elem.dataset.bgColor) {
        parent.style.backgroundColor = elem.dataset.bgColor;
    }
}

function setActiveOption(elem, parentSelector, activSelector, callbackFunc) {
    const parent = elem.closest(parentSelector);
    const previousActiveElem = parent.querySelector('.' + activSelector);

    if(previousActiveElem && previousActiveElem != elem) {
        previousActiveElem.classList.remove(activSelector);
        elem.classList.add(activSelector);
        callbackFunc(elem);
    } else {
        return false;
    }
}


document.addEventListener("DOMContentLoaded", ()=> {
    const fontSizeBnts = Array.from(document.querySelectorAll(".book__control_font-size .font-size"));
    const colorBnts = Array.from(document.querySelectorAll(".book__control_color .color"));
    const backgroundBnts = Array.from(document.querySelectorAll(".book__control_background .color"));
    

    fontSizeBnts.forEach(elem => elem.addEventListener("click", (event)=> {
        event.preventDefault();
        setActiveOption(event.currentTarget, ".book__control_font-size", "font-size_active", setFontSize);
    }));

    colorBnts.forEach(elem => elem.addEventListener("click", (event)=> {
        event.preventDefault();
        setActiveOption(event.currentTarget, ".book__control_color", "color_active", setColor);
    }));

    backgroundBnts.forEach(elem => elem.addEventListener("click", (event)=> {
        event.preventDefault();
        setActiveOption(event.currentTarget, ".book__control_background", "color_active", setBackground);
    }));
});