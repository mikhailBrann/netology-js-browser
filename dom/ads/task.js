function setActiveElem(elem) {
    const speed =  elem.dataset.speed ?? 1000;
    const siblingNode = elem.nextElementSibling ?? document.querySelector(".rotator .rotator__case");

    if(elem.dataset.color) {
        elem.style.color = elem.dataset.color;
    }

    setTimeout(() => {
        elem.classList.remove("rotator__case_active");
        siblingNode.classList.add("rotator__case_active");

        setActiveElem(siblingNode);
    }, speed);  
}

document.addEventListener("DOMContentLoaded", ()=> {
    const startElem = document.querySelector(".rotator__case_active");

    if(startElem) {
        setActiveElem(startElem);
    }
});