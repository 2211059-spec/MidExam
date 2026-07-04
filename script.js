/* ==========================================================================
   AURA SOUND SYSTEM - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

// --- Global Application State ---
let cartItems = [];
let cartTotalCount = 0;

// --- DOM Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Aura Sound interactive engine initialized.");
    updateCartBadge();
});

/* ==========================================================================
   REQUIREMENT 6: ONCLICK EVENT HANDLER FUNCTIONS
   ========================================================================== */

/**
 * 1. Add to Cart Function - Triggered via onclick handler on product buttons
 * @param {string} productName - Name of the item added
 * @param {number} price - Unit price of the item
 */
function addToCart(productName, price) {
    cartItems.push({ name: productName, price: price, id: Date.now() });
    cartTotalCount++;
    
    // Update Badge Counter in Header Navbar
    updateCartBadge();
    
    // Show Toast Notification to User
    showToast(`Added <strong>${productName}</strong> ($${price}) to your cart! 🛍️`);
}

/**
 * 2. Filter Products Function - Triggered via onclick on category filter buttons (Product Page)
 * @param {string} category - Category filter (e.g. 'all', 'headphones', 'earbuds', 'speakers')
 * @param {HTMLElement} btnElement - The clicked button element
 */
function filterProducts(category, btnElement) {
    const cards = document.querySelectorAll('.product-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Toggle active button style
    if (btnElement) {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }
    
    // Filter product grid cards
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    showToast(`Filtering view: <strong>${category.toUpperCase()}</strong>`);
}

/**
 * 3. Quick View Modal Opener - Triggered via onclick handler on Quick View buttons
 * @param {string} title - Product Title
 * @param {string} desc - Product Description
 * @param {string} price - Product Price
 */
function openQuickView(title, desc, price) {
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    const modalOverlay = document.getElementById('quick-modal');

    if (modalTitle && modalDesc && modalPrice && modalOverlay) {
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalPrice.textContent = price;
        modalOverlay.classList.add('active');
    } else {
        alert(`Quick View: ${title}\nPrice: ${price}\n\nDescription: ${desc}`);
    }
}

/**
 * 4. Close Modal Handler
 */
function closeModal() {
    const modalOverlay = document.getElementById('quick-modal');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
}

/**
 * 5. Handle Contact Form Submission - Triggered via onclick handler on Contact Form Submit button
 * @param {Event} event - Form event object
 */
function handleContactSubmit(event) {
    if (event) event.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    if (!nameInput || !emailInput || !messageInput) {
        alert("Thank you! Your inquiry has been received by our sound specialists.");
        return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "" || email === "" || message === "") {
        showToast("⚠️ Please fill in all required fields before sending!");
        return false;
    }

    // Success dispatch simulation
    showToast(`✨ Thank you ${name}! Your message has been sent to our audio team.`);
    
    // Reset Form fields
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
    document.getElementById('contact-subject').value = "general";

    return false;
}

/**
 * 6. Subscribe to Newsletter - Triggered via onclick on footer subscribe button
 */
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletter-email');
    if (emailInput && emailInput.value.trim() !== '') {
        showToast(`🎉 Subscribed! VIP audiophile deals sent to <strong>${emailInput.value}</strong>`);
        emailInput.value = '';
    } else {
        showToast('⚠️ Please enter a valid email address!');
    }
}

/**
 * 7. View Cart Modal Opener
 */
function toggleCartModal() {
    if (cartItems.length === 0) {
        showToast("🛒 Your shopping cart is currently empty!");
    } else {
        let total = cartItems.reduce((sum, item) => sum + item.price, 0);
        let itemsList = cartItems.map(i => `• ${i.name} ($${i.price})`).join('\n');
        alert(`🛒 Your Cart (${cartItems.length} items):\n\n${itemsList}\n\nTotal: $${total}\n\nProceed to Checkout?`);
    }
}

// --- Helper Utilities ---
function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = cartTotalCount;
    }
}

function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    
    toast.innerHTML = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}
