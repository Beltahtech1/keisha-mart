// Complete Unified Structured Catalog Mapping
const catalogData = [
    { id: 1, name: "Premium Phone Case", price: 1500, cat: "tech", icon: "📱", desc: "Heavy-duty protection with modern translucent finish." },
    { id: 2, name: "Fast Charging Power Bank", price: 4500, cat: "tech", icon: "⚡", desc: "20,000mAh high-density power cell deployment." },
    { id: 3, name: "Wireless Earbuds Pro", price: 6500, cat: "electronics", icon: "🎧", desc: "Active ambient isolation with high-fidelity tracking." },
    { id: 4, name: "Smartwatch Series X", price: 12000, cat: "electronics", icon: "⌚", desc: "Biometric monitoring engine with high-contrast display." },
    { id: 5, name: "Digital Microwave Engine", price: 18500, cat: "home", icon: "🍲", desc: "Smart inverter system optimized for precise preparation." },
    { id: 6, name: "Premium Duvet Set", price: 7500, cat: "home", icon: "🛏️", desc: "Ultra-soft thermal grading designed for maximum recovery." },
    { id: 7, name: "Hyaluronic Serum Prime", price: 3200, cat: "beauty", icon: "🧴", desc: "Advanced cellular rehydration structural formula." },
    { id: 8, name: "Velvet Matte Lipstick", price: 1800, cat: "beauty", icon: "💄", desc: "Long-lasting saturation array with soft micro-texture." }
];

const servicesData = [
    { title: "🌐 Online Shopping Platform", desc: "Fast, safe, responsive browsing layout engineered for direct shopping access." },
    { title: "💚 Instant WhatsApp Ordering", desc: "Skip traditional complex structures. Order directly into our chat system." },
    { title: "🚚 Nationwide Delivery", desc: "Reliable distribution channels routing products swiftly anywhere across Kenya." },
    { title: "📦 Real-Time Order Tracking", desc: "Stay informed from dispatch until delivery arrives safely at your doorstep." },
    { title: "💬 End-To-End Client Support", desc: "Dedicated consultation before and after matching your retail selections." },
    { title: "⭐ Custom Recommendations", desc: "Tailored insights designed around your unique everyday style and preferences." }
];

let shoppingBasket = [];

// App Core Engine Initialization
document.addEventListener("DOMContentLoaded", () => {
    renderCatalog(catalogData);
    renderServices();
});

function renderCatalog(items) {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = items.map(product => `
        <div class="product-card glass-card">
            <span class="product-category">${product.cat}</span>
            <div class="product-image-frame">${product.icon}</div>
            <div class="product-details">
                <h3>${product.name}</h3>
                <p class="subtitle" style="font-size:0.85rem; margin-bottom:1rem;">${product.desc}</p>
                <div class="product-price">Ksh ${product.price.toLocaleString()}</div>
                <button class="add-to-cart-btn" onclick="addToBasket(${product.id})">Add to Basket</button>
            </div>
        </div>
    `).join('');
}

function renderServices() {
    const sGrid = document.getElementById("services-grid");
    sGrid.innerHTML = servicesData.map(service => `
        <div class="service-card glass-card">
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
        </div>
    `).join('');
}

function filterProducts() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const activeCat = document.getElementById("category-filter").value;
    
    const filtered = catalogData.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
        const matchesCat = activeCat === "all" || p.cat === activeCat;
        return matchesSearch && matchesCat;
    });
    renderCatalog(filtered);
}

// Basket Layout Interactions
function toggleCart() {
    document.getElementById("shopping-cart").classList.toggle("open");
}

function addToBasket(id) {
    const item = catalogData.find(p => p.id === id);
    const existing = shoppingBasket.find(i => i.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        shoppingBasket.push({ ...item, qty: 1 });
    }
    updateBasketUI();
}

function removeItem(id) {
    shoppingBasket = shoppingBasket.filter(i => i.id !== id);
    updateBasketUI();
}

function updateBasketUI() {
    const container = document.getElementById("cart-items");
    const countSpan = document.getElementById("cart-count");
    const totalSpan = document.getElementById("cart-total");
    
    let total = 0;
    let totalItems = 0;
    
    container.innerHTML = shoppingBasket.map(item => {
        total += item.price * item.qty;
        totalItems += item.qty;
        return `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Ksh ${item.price.toLocaleString()} x ${item.qty}</p>
                </div>
                <button class="remove-item-btn" onclick="removeItem(${item.id})">✕</button>
            </div>
        `;
    }).join('');
    
    countSpan.textContent = totalItems;
    totalSpan.textContent = `Ksh ${total.toLocaleString()}`;
}

// Checkout WhatsApp String Builder
function checkoutWhatsApp() {
    if (shoppingBasket.length === 0) return alert("Your basket is empty.");
    
    let text = `🛒 *New Order from Lakeisha Mart*\n\n`;
    shoppingBasket.forEach(item => {
        text += `• *${item.name}* (Qty: ${item.qty}) - Ksh ${(item.price * item.qty).toLocaleString()}\n`;
    });
    
    const total = shoppingBasket.reduce((sum, item) => sum + (item.price * item.qty), 0);
    text += `\n💰 *Total Value:* Ksh ${total.toLocaleString()}\n\n⚡ Please process my order for nationwide delivery!`;
    
    // Replace with your real Kenyan phone number format
    const phone = "254700000000"; 
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}
