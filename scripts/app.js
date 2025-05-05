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
    },
    {
        name: "Super Nintendo - Consola Nintendo",
        description: "usado",
        image: "./imgs/nintendo-super-famicom.png",
        price: "250.000"
    },
    {
        name: "Atari 2600 - Consola Atari",
        description: "reacondicionado",
        image: "./imgs/atari-2600.png",
        price: "160.000"  
    },
    {
        name: "Nintendo Entertainment System - Consola Nintendo",
        description: "usado",
        image: "./imgs/nintendo-nes.png",
        price: "172.000"
    }
    ,
    {
        name: "Nintendo 64 - Consola Nintendo",
        description: "usado",
        image: "./imgs/nintendo-64.png",
        price: "330.000"
    },
    {
        name: "Playstation 2 - Consola Sony",
        description: "reacondicionado",
        image: "./imgs/playstation-2.png",
        price: "160.000"  
    },
    {
        name: "Nintendo Wii - Consola Nintendo",
        description: "usado",
        image: "./imgs/nintendo-wii.png",
        price: "250.000"
    },
    {
        name: "Joystick Playstation 1 - Control Sony",
        description: "reacondicionado",
        image: "./imgs/playstation-1-joy.png",
        price: "40.000"
    },
    {
        name: "Joystick Gamecube - Control Nintendo",
        description: "reacondicionado",
        image: "./imgs/gamecube-joy.png",
        price: "170.000"
    },
    {
        name: "Joystick Playstation 2 - Control Sony",
        description: "nuevo",
        image: "./imgs/playstation-2-joy.png",
        price: "190.000"
    }
];

const grid = document.querySelector('.product-space');
const searchInput = document.querySelector('#input-search-products');
const stateNewCheckBox = document.querySelector('#state-new');
const stateUsedCheckBox = document.querySelector('#state-used');
const stateReCheckBox = document.querySelector('#state-re');
const consoleCheckBox = document.querySelector('#cat-console');
const controllerCheckBox = document.querySelector('#cat-controller');

function createProductCard(product){
    const card = document.createElement('article');
    card.classList.add('product-cards');

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
    const catConsole = !consoleCheckBox.checked || product.name.toLowerCase().includes("consola");
    const catController = !controllerCheckBox.checked || product.name.toLowerCase().includes("joystick");

        return product.name.toLowerCase().includes(text.toLowerCase()) && newState && usedState && reState && catConsole && catController;
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
consoleCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
})
controllerCheckBox.addEventListener('change', (e) => {
    filterProducts(searchInput.value);
})

renderProducts(products);
