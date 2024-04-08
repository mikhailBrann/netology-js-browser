function isVisibleElem(elem, selector='reveal_active') {
    const {top, bottom} = elem.getBoundingClientRect();

    if(bottom > 0 && top > window.innerHeight) {
        if(elem.classList.contains(selector)) {
            elem.classList.remove(selector);
        }
        return false;
    }

    elem.classList.add(selector);
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const revealElems = Array.from(document.querySelectorAll(".reveal"));

    window.addEventListener("scroll", ()=> {
        revealElems.forEach(elem => isVisibleElem(elem));
    });
});