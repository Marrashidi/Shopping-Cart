// Fashion store products
const products = [
  { id: 1, name: "T-Shirt", price: 25, image: "images/t-shirt.jpeg" },
  { id: 2, name: "Jeans", price: 60, image: "images/jeans.jpeg" },
  { id: 3, name: "Sneakers", price: 90, image: "images/sneakers.jpeg" },
  { id: 4, name: "Leather Jacket", price: 150, image: "images/leather jacket.jpeg" },
  { id: 5, name: "Dress", price: 80, image: "images/dress.jpeg" },
  { id: 6, name: "Handbag", price: 120, image: "images/handbag.jpeg" },
  { id: 7, name: "Sunglasses", price: 50, image: "images/sunglasses.jpeg" },
  { id: 8, name: "Cap", price: 20, image: "images/cap.jpeg" },
  { id: 9, name: "Scarf", price: 15, image: "images/scarf.jpeg" },
  { id: 10, name: "Watch", price: 200, image: "images/watch.jpeg" },
  { id: 11, name: "Belt", price: 35, image: "images/belt.jpeg" },
  { id: 12, name: "Heels", price: 95, image: "images/heels.jpeg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display products
const productList = document.getElementById("product-list");
const renderProducts = (list) => {
  productList.innerHTML = list.map(p => `
    <div class="product">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p><strong>$${p.price}</strong></p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
};
renderProducts(products);

// Render cart
const cartDiv = document.getElementById("cart");
const renderCart = () => {
  cartDiv.innerHTML = cart.map(item => `
    <div class="cart-item">
      <h4>${item.name}</h4>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Subtotal: $${item.price * item.quantity}</p>
      <button onclick="changeQty(${item.id}, 1)">+</button>
      <button onclick="changeQty(${item.id}, -1)">-</button>
      <button onclick="removeItem(${item.id})">Remove</button>
    </div>
  `).join("");
  document.getElementById("total").innerText =
    cart.reduce((t, i) => t + i.price * i.quantity, 0);
};
renderCart();

// Handlers
window.addToCart = (id) => {
  const product = products.find(p => p.id === id);
  const item = cart.find(c => c.id === id);
  item ? item.quantity++ : cart.push({ ...product, quantity: 1 });
  saveCart();
  renderCart();
  showMessage(`${product.name} added!`);
};

window.changeQty = (id, delta) => {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(c => c.id !== id);
    saveCart();
    renderCart();
  }
};

window.removeItem = (id) => {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
};

// Save cart
const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));

// Success message
const showMessage = (msg) => {
  const m = document.createElement("div");
  m.className = "success";
  m.innerText = msg;
  document.body.appendChild(m);
  setTimeout(() => m.remove(), 1500);
};

// Search filter
document.getElementById("search").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});