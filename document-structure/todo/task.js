class TodoList {
    constructor(todoElem) {
        if(window.localStorage.getItem('todo') == null) {
            window.localStorage.setItem('todo', JSON.stringify({}));
        }

        this.todoListElem = todoElem;
    }

    renderList() {
        const storageList = JSON.parse(window.localStorage.getItem('todo'));

        if(Object.keys(storageList).length > 0) {
            this.todoListElem.innerHTML = "";

            for(let index in storageList) {
                const newElem = this.generateElement(storageList[index]);
                newElem.dataset.index = index;
                this.todoListElem.appendChild(newElem);
            }
        }
    }

    


    generateElement(textValue) {
        const newElem = document.createElement("div");
        const title = document.createElement("div");
        const removeElem = document.createElement("a");
        const removeElemCallback = this.removeItemList;

        newElem.classList.add("task");
        title.classList.add("task__title");
        title.textContent = textValue;
        removeElem.classList.add("task__remove");
        removeElem.innerHTML = "&times;";
        removeElem.addEventListener("click", event => {
            event.preventDefault();
            removeElemCallback(event.currentTarget);
        });

        newElem.appendChild(title);
        newElem.appendChild(removeElem);
        
        return newElem;
    }

    addItemList(text) {
        const currentList = JSON.parse(window.localStorage.getItem('todo'));
        const index = generateId();

        currentList[index] = text;
        window.localStorage.setItem('todo', JSON.stringify(currentList));
    }

    removeItemList(elem) {
        const parent = elem.closest(".task");
        const removeIndex = parent.dataset.index;

        if(removeIndex) {
            const currentList = JSON.parse(window.localStorage.getItem('todo'));
            
            delete currentList[removeIndex];
            window.localStorage.setItem('todo', JSON.stringify(currentList));
            parent.remove();
        }        
    } 
}

function generateId(length=9) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const currentDate = new Date();

    let id = '';

    while (id.length < length) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomChar = characters[randomIndex];

        if (id.indexOf(randomChar) === -1) {
            id += randomChar;
        }
    }

    return `${id}__${currentDate.getTime()}`;
}


document.addEventListener("DOMContentLoaded", ()=> {
    const form = document.querySelector("#tasks__form");
    const todoList = document.querySelector("#tasks__list");
    const todoListObj = new TodoList(todoList);

    todoListObj.renderList();

    form.addEventListener("submit", event => {
        event.preventDefault();
        const input = event.currentTarget.querySelector("#task__input");

        if(input.value != "") {
            todoListObj.addItemList(input.value);
            todoListObj.renderList();

            event.currentTarget.reset();
        }

    });
});