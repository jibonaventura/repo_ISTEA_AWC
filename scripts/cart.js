const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

function createProductCartCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.addEventListener('click', () => {
        const exists = cartProducts.findIndex(p => p.title === product.title);
        if (exists !== -1) {
            cartProducts.splice(exists, 1);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            renderCartProducts(cartProducts);
        }
    });
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

function updateTotal() {
    const totalElement = document.getElementById('cart-total');
    let total = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        total += cartProducts[i].price;
    }
    totalElement.textContent = `$${total}`;
}

function renderCartProducts(list){
    const cartGrid = document.querySelector('.cart-grid');
    cartGrid.innerHTML = '';
    
    list.forEach( product => {
        const card = createProductCartCard(product);
        cartGrid.appendChild(card);
    });

     updateTotal();
}

renderCartProducts(cartProducts);