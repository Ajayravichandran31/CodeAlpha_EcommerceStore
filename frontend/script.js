const API_URL = "http://localhost:5000/api/products";

async function loadProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

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
        `;

        productList.appendChild(productCard);
    });
}

loadProducts();