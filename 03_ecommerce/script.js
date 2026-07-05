document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Shampoo", price: 9.99 },
    { id: 2, name: "Soap", price: 15.99 },
    { id: 3, name: "Chocolates", price: 9.99 },
  ];

  // Load cart from Local Storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productLists = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // Display products
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to Cart</button>
    `;

    productLists.appendChild(productDiv);
  });

  // Add product to cart
  productLists.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);

      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          <span>${item.name} - $${item.price.toFixed(2)}</span>
          <button class="remove-btn">Remove</button>
        `;
        const removeBtn = cartItem.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        });
        cartItems.appendChild(cartItem);
      });
      totalPriceDisplay.textContent = totalPrice.toFixed(2);
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = "0.00";
    }
  }

  // Checkout button
  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    localStorage.removeItem("cart");
    renderCart();
    alert("Thank you for your purchase!");
  });

  // Render saved cart on page load
  renderCart();
});
