function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=');

        acc[name] = value;
        return acc
    }, {})
}

document.addEventListener("DOMContentLoaded", ()=> {
    const subscWindow = document.querySelector("#subscribe-modal");
    const modalCloseCross = subscWindow.querySelector(".modal__close_times");
    const cookieKey = 'showModal';
    const cookies = getCookie();

    if(subscWindow && !cookies.hasOwnProperty(cookieKey)) {
        console.log(cookies);
        setTimeout(() =>  subscWindow.classList.add("modal_active"), 3000);
    }

    if(modalCloseCross) {
        modalCloseCross.addEventListener("click", () => {
            document.cookie = `${cookieKey}=true;`;
            subscWindow.classList.remove("modal_active");
        });
    }
});