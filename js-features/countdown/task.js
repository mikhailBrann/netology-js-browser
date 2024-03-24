function setTimer(timer) {
    let timerValue = timer.textContent;
    const stopIntervalValue = timerValue * 1000;

    //установим аттрибут для работы с таймером(для удобства)
    timer.dataset.value = timerValue;

    const timerId = setInterval(() => {
        let decrimSecond = timer.dataset.value -= 1;
        timer.textContent = secondsViewFormat(decrimSecond);
    }, 1000);

    setTimeout(() => {
        clearInterval(timerId); 
        alert('Вы победили в конкурсе!');
        setDownloadRandomFile(); 
    }, stopIntervalValue);
}

//функция открытия картинки
function setDownloadRandomFile(url='http://gazeta-rybinsk.ru/wp-content/uploads/2019/12/koti1-e1672580602262.jpg') {
    const link = document.createElement('a');

    link.href = url;
    link.target = "_blank";
    link.setAttribute("download", "download");

    document.body.appendChild(link);
    console.log(link);
    link.click();
}

//функция для формата даты
function secondsViewFormat(seconds) {
    const hoursFormat = Math.floor(seconds / 3600);
    const minutesFormat = Math.floor((seconds % 3600) / 60);
    const secondsFormat = seconds % 60;
    
    return `${hoursFormat.toString().padStart(2, '0')}:${minutesFormat.toString().padStart(2, '0')}:${secondsFormat.toString().padStart(2, '0')}`;
}


document.addEventListener("DOMContentLoaded", () => {
    const timer = document.getElementById("timer");

    if(timer) {
        setTimer(timer);
    }
});