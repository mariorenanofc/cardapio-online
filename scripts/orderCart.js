const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("closed-model-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");


let cart = [];


// Open card model
cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex";
})


// Closed card model ao clikar fora

cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

// Fechar modal ao clickar no botão fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event) {
    // Verifica se o clique foi no botão ou no ícone dentro do botão
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        
        //Adicionar no carrinho
        addToCart(name, price)
    }
});

//Função para adicionar no carrinho
function addToCart(name, price){
    const exitingItem = cart.find(item => item.name === name)

    if(exitingItem){
        //Se já exite o tem aumente a quantidade
        exitingItem.quantity += 1;
        return;
    }
    
    cart.push({
        name,
        price,
        quantity: 1,
    });
}
 