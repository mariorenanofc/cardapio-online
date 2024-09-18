const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("closed-model-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("adress");
const addressWarn = document.getElementById("adress-warn");



// Open card model
cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex";
});


// Closed card model ao clikar fora

cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
});

// Fechar modal ao clickar no botão fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
});