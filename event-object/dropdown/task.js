document.addEventListener("DOMContentLoaded", () => {
    const dropdownChecker = document.querySelector(".dropdown__value");
    const listValueArr = Array.from(document.querySelectorAll(".dropdown .dropdown__link")); 

    if(dropdownChecker) {
        dropdownChecker.addEventListener("click", event => {
            const dropdownList = event.currentTarget.closest(".dropdown").querySelector(".dropdown__list");

            if(dropdownList) {
                dropdownList.classList.toggle("dropdown__list_active");
            }
        });
    }

    if(listValueArr.length && dropdownChecker) {
        listValueArr.forEach(elem => {
            elem.addEventListener("click", event => {
                event.preventDefault();

                const currentElem = event.currentTarget;
                const value = currentElem.textContent;
                const dropdownList = event.currentTarget.closest(".dropdown").querySelector(".dropdown__list");

                if(dropdownList) {
                    dropdownChecker.textContent = value;
                    dropdownList.classList.remove("dropdown__list_active");
                } 
            });
        });
    }
});