class Basket {
    constructor(basketNode) {
        if(window.localStorage.getItem('basket') == null) {
            window.localStorage.setItem('basket', JSON.stringify({}));
        }

        this.basketNode = basketNode;
    }

    renderBasketElem(elem, quantity=0) {
        if(quantity <= 0) {
            return false;
        }

        const elemId = elem.dataset.id;
        const elemImgPath = elem.querySelector(".product__image") ? elem.querySelector(".product__image").src : false;
        const renderElem = document.createElement("div");

        renderElem.classList.add("cart__product");
        renderElem.dataset.id = elemId;
        
        if(elemImgPath) {
            const renderElemImg = document.createElement("img");
            renderElemImg.classList.add("cart__product-image");
            renderElemImg.src = elemImgPath;

            renderElem.appendChild(renderElemImg);
        }

        const renderElemQuantity = document.createElement("div");
        renderElemQuantity.classList.add("cart__product-count");
        renderElemQuantity.textContent = quantity;

        renderElem.appendChild(renderElemQuantity);

        return renderElem;
    }

    renderBasketList() {
        this.basketNode.innerHTML = "";

        const basketList = JSON.parse(window.localStorage.getItem('basket'));

        if(Object.keys(basketList).length <= 0) {
            return false;
        }

        for(let index in basketList) {
            const product = document.querySelector(`.product[data-id="${index}"]`);

            if(!product) {
                continue;
            }

            const basketItem = this.renderBasketElem(product, basketList[index]);

            if(basketItem) {
                this.basketNode.appendChild(basketItem);
            }
        }
    }
}

class Product {
    constructor(productNode, basketObj) {
        this.productNode = productNode;
        this.incrementBtn = this.productNode.querySelector(".product__quantity-control_inc");
        this.decrimentBtn = this.productNode.querySelector(".product__quantity-control_dec");
        this.addToBasketBtn = this.productNode.querySelector(".product__add");

        const quantityNode = this.productNode.querySelector(".product__quantity-value");
        const changeQuntity = this.changeQuntity;
        const addToBasket = this.addToBasket;
        
        this.incrementBtn.addEventListener("click", () => changeQuntity("increm", quantityNode));
        this.decrimentBtn.addEventListener("click", () => changeQuntity("decrem", quantityNode));
        this.addToBasketBtn.addEventListener("click", () => addToBasket(
            productNode.dataset.id, 
            Number(quantityNode.textContent), 
            basketObj
        ));
    }

    changeQuntity(direction, quantityNode) {
        const value = Number(quantityNode.textContent);

        if(direction == 'increm') {
            quantityNode.textContent =  value + 1;
        }

        if(direction == 'decrem') {
            if(value <= 1) {
                return false;
            }

            quantityNode.textContent =  value - 1;
        }
    }

    addToBasket(productId, value, basketObj) {
        if(!basketObj) {
            return false;
        }
        
        const basketList = JSON.parse(window.localStorage.getItem('basket'));

        if(productId in basketList) {
            basketList[productId] += value;
        } else {
            basketList[productId] = value;
        }

        window.localStorage.setItem('basket', JSON.stringify(basketList));
        basketObj.renderBasketList();
    }
}


document.addEventListener("DOMContentLoaded", ()=> {
    const products = Array.from(document.querySelectorAll(".products .product"));

    if(products.length <= 0) {
        return false;
    }

    const basketNode = document.querySelector(".cart .cart__products");
    const basket = new Basket(basketNode);

    products.forEach(productNode => {
        const productObj = new Product(productNode, basket);
    });

    basket.renderBasketList();
});
