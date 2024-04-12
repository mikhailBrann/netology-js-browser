function setTootlepsOnPage(elem) {
    if(elem.title) {
        const totlip = document.createElement("div");
        totlip.innerText = elem.title;
        totlip.classList.add("tooltip");

        elem.insertAdjacentHTML("afterEnd", totlip.outerHTML);
    }
}

function activateTooltip(event) {
    event.preventDefault();

    const currentElement = event.currentTarget;
    const activeElems = Array.from(document.querySelectorAll(".tooltip_active"));
    const currentToolTip = currentElement.nextElementSibling;

    activeElems.forEach(link => {
        
        if(currentToolTip == link) {
            return true;
        }

        link.classList.remove("tooltip_active");
    });

    if(currentToolTip) {
        currentToolTip.classList.toggle("tooltip_active");
        currentToolTip.style.left = currentElement.offsetLeft + 'px';
    }
}

document.addEventListener("DOMContentLoaded", ()=> {
     const links = document.querySelectorAll(".has-tooltip");

     links.forEach(elem => {
        setTootlepsOnPage(elem);
        elem.addEventListener("click", activateTooltip);
    });
});