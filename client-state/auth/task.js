function getUserData(requestData={}) {
    const url = "https://students.netoservices.ru/nestjs-backend/auth";
    const responseUserData = fetch(
        url,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(requestData)
        }
    ).then(response => {
        if(!response.ok) {
            throw new Error("Ошибка запроса!");
        }

        return response.json();
    }).catch(error => error.json());

    return responseUserData;
}

function sayHello(userId=false) {
    const helloMessageWrap = document.querySelector("#welcome");
    const userIdWrapp = helloMessageWrap.querySelector("#user_id");
    
    if(helloMessageWrap && userId) {
        helloMessageWrap.classList.add("welcome_active");
        userIdWrapp.textContent = userId;
    } else {
        helloMessageWrap.classList.remove("welcome_active");
        userIdWrapp.textContent = "";
    }   
}

function formViewControl(formElem, state='hide') {
    const formWrap = formElem.closest("#signin");
    formElem.reset();

    if(formWrap && state == 'hide') {
        formWrap.classList.remove("signin_active");
    }

    if(formWrap && state == 'show') {
        formWrap.classList.add("signin_active");
    }
}


document.addEventListener("DOMContentLoaded", ()=> {
    const form = document.querySelector("#signin__form");
    const userInStorage = window.localStorage.getItem("userId");
    const logoutBtn = document.querySelector("#logout");

    if(userInStorage) {
        sayHello(userInStorage);
        formViewControl(form);
    }

    if(logoutBtn) {
        logoutBtn.addEventListener("click", event => {
            window.localStorage.removeItem("userId");
            formViewControl(form, 'show');
            sayHello();
        });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const currentForm = event.currentTarget;
        const login = currentForm.querySelector("input[name=login]");
        const pass = currentForm.querySelector("input[name=password]");

        const request = getUserData({
            "login": login.value,
            "password": pass.value 
        });

        request.then(data => {
            if(data.success) {
                window.localStorage.setItem("userId", data.user_id);
                sayHello(data.user_id);
                formViewControl(currentForm);
            }
        });
    });
});