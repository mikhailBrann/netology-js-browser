const requestUrl = "https://students.netoservices.ru/nestjs-backend/poll";


function sendAnswer(event) {
    const questionId = event.currentTarget.dataset.questionId;
    const answerId = event.currentTarget.dataset.answerId;
    const requestParams = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'vote': questionId, 'answer': answerId }).toString()
    };

    const sendAnswerRequest = fetch(requestUrl, requestParams);

    sendAnswerRequest.then(response => {
        if (!response.ok) {
            throw new Error('Ошибка запроса!');
        }

        return response.json();
    }).then(data => {
        const resultListWrap = document.querySelector("#poll__answers");

        if(data?.stat) {
            const allVoites = data.stat.reduce((acc, elem) => { return acc += elem.votes}, 0);

            resultListWrap.innerHTML = "";
            data.stat.forEach((value) => resultListWrap.insertAdjacentHTML(
                "beforeend", 
                `<div class="vote_result"><span>${value.answer}: <b>${((value.votes / allVoites) * 100).toFixed(1)}%</b></span></div>`
            ));
        } else {
            throw new Error('Ошибка: некорректные данные!');
        }
    }).catch(error => console.error(error));
}

function setPollAnswerList(questionId, dataObject, callback='sendAnswer') {
    const title = document.querySelector("#poll__title");
    const listWrap = document.querySelector("#poll__answers");

    title.textContent = dataObject.title;
    listWrap.innerHTML = "";
    dataObject.answers.forEach((value, index) => listWrap.insertAdjacentHTML(
        "beforeend", 
        `<button class="poll__answer" 
            ${(callback ? `onclick="${callback}(event);"` : '')} 
            data-answer-id="${index}" data-question-id="${questionId}">
            ${value}
        </button>`
    ));
}


document.addEventListener("DOMContentLoaded", ()  => {
    const requestAnswer = fetch(requestUrl);

    requestAnswer.then(response => {
        if (!response.ok) {
            throw new Error('Ошибка запроса!');
        }

        return response.json();
    }).then(data => {
        if(data?.data) {
            setPollAnswerList(data.id, data.data);
        } else {
            throw new Error('Ошибка: некорректные данные!');
        }
    }).catch(error => console.error(error));
});