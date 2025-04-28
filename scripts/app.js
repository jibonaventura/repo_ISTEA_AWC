const products = [
    {
        name: "Nintendo Gamecube - Consola Nintendo",
        description: "usado",
        image: "./imgs/gamecube.png",
        price: "300.000"
    },
    {
        name: "Playstation 1 - Consola Sony",
        description: "usado",
        image: "./imgs/playstation-1.png",
        price: "160.000"  
    },
    {
        name: "Playstation 3 Slim - Consola Sony",
        description: "nuevo",
        image: "./imgs/playstation-3.png",
        price: "400.000"
    }
];

const grid = document.querySelector('.product-space');
const searchInput = document.querySelector('#input-search-products');
const stateNewCheckBox = document.querySelector('#state-new');
const stateUsedCheckBox = document.querySelector('#state-used');
const stateReCheckBox = document.querySelector('#state-re');

function createProductCard(product){
    const card = document.createElement('article');
    card.classList.add('new-products');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement('h3');
    title.textContent = product.name;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Comprar';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

function addProduct() {
    const newProduct = {
        name: "Nuevo Producto",
        description: "Descripción del nuevo producto",
        image: "./imgs//Place_Holder_IMG.png",
        price: 0
    };

    const card = createProductCard(newProduct);
    grid.appendChild(card);
}

function renderProducts(list){
    list.forEach( product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

function filterProducts(text){
    const filteredProducts = products.filter( product => {
    const newState = !stateNewCheckBox.checked || product.description == "nuevo";
    const usedState = !stateUsedCheckBox.checked || product.description == "usado";
    const reState = !stateReCheckBox.checked || product.description == "reacondicionado";

        return product.name.toLowerCase().includes(text.toLowerCase()) && newState && usedState && reState;
    });
    grid.innerHTML = '';
    renderProducts(filteredProducts);
}

searchInput.addEventListener('input', (e) => {
    filterProducts(e.target.value);
});

stateNewCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
})
stateUsedCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
})
stateReCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
})

renderProducts(products);
