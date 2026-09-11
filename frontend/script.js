const API_URL = "http://localhost:5000/api/products";
let cart = [];
let products = [];

async function loadProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error loading products:", error);

        document.getElementById("product-list").innerHTML = `
            <p>Unable to load products. Please try again later.</p>
        `;
    }
}

function displayProducts(products) {
    const productList = document.getElementById("product-list");

    productList.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <div class="product-price">
                ₹${product.price}
            </div>

            <div class="product-stock">
                Stock: ${product.stock}
            </div>

            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productList.appendChild(productCard);
    });
}

function addToCart(productId) {
    console.log("Adding product to cart:", productId);

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    console.log("Current cart:", cart);

    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        cartTotal.textContent = "Total: ₹0.00";
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const product = products.find(product => product.id === item.id);

        if (!product) {
            return;
        }

        const itemTotal = Number(product.price) * item.quantity;

        total += itemTotal;

        const cartItem = document.createElement("div");

        cartItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Item Total: ₹${itemTotal.toFixed(2)}</p>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
}

loadProducts();