function setGameStep(event, targetLimit=10, missLimit=5) {
    const currentHole = event.currentTarget;
    const deadCounter = document.getElementById('dead');
    const lostCounter = document.getElementById('lost');

    if(Number(deadCounter.textContent) >= targetLimit - 1) {
        alert("Вы победили!");
        lostCounter.textContent = 0;
        deadCounter.textContent = 0;
        return false;
    }

    if(Number(lostCounter.textContent) >= missLimit - 1) {
        alert("вы проиграли((");
        lostCounter.textContent = 0;
        deadCounter.textContent = 0;
        return false;
    }

    if(currentHole.classList.contains('hole_has-mole')) {
        let counter = Number(deadCounter.textContent);
        deadCounter.textContent = counter += 1;
    } else {
        let counter = Number(lostCounter.textContent);
        lostCounter.textContent = counter += 1;
    }

    
}

document.addEventListener("DOMContentLoaded", () => {
    const holesArr = Array.from(document.getElementsByClassName('hole'));

    if(holesArr.length) {
        holesArr.forEach(elem => elem.onclick = setGameStep);
    }
});