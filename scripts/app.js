const products = [
    {
        name: "Nintendo Gamecube - Consola Nintendo",
        description: "usado",
        image: "./imgs/gamecube.jpg",
        price: "300.000"
    },
    {
        name: "Playstation 1 - Consola Sony",
        description: "usado",
        image: "./imgs/playstation-1.jpg",
        price: "160.000"  
    },
    {
        name: "Playstation 3 Slim - Consola Sony",
        description: "nuevo",
        image: "./imgs/playstation-3.jpg",
        price: "400.000"
    }
];

const grid = document.querySelector('.product-space');

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

products.forEach( product => {
    const card = createProductCard(product);
    grid.appendChild(card);
});