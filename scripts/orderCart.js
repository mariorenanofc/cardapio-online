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
const nameInput = document.getElementById("name");
const paymentMethodInput = document.getElementById("payment-method");
const additionalInfoInput = document.getElementById("additional-info");

// Contador de pedidos
let orderCount = 0;
let cart = [];

// Open card model
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex";
});

// Closed card model ao clicar fora
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

// Fechar modal ao clicar no botão fechar
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
});

// Adicionar ao carrinho
menu.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addToCart(name, price);
    }
});

// Função para adicionar no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();
    updateCartFooterVisibility();
}

// Função para remover item do carrinho
function removeItemFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCartModal();
        updateCartFooterVisibility();
    }
}

// Atualiza o carrinho no modal
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between bg-orange-300 p-2 rounded-2xl">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$: ${item.price.toFixed(2)}</p>
                </div>
                
                <button onclick="removeItemFromCart('${item.name}')" class="bg-red-400 px-2 rounded-md">Remover</button>
            </div>
        `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    const itemCount = cart.length;
    cartCounter.innerHTML = itemCount;

    return itemCount;
}

// Função para atualizar a visibilidade do footer com base no número de itens no carrinho
function updateCartFooterVisibility() {
    const cartFooter = document.getElementById('cart-footer');

    const itemCount = updateCartModal();

    if (itemCount > 0) {
        cartFooter.classList.remove('footer-hidden');
        cartFooter.classList.add('footer-visible');
    } else {
        cartFooter.classList.remove('footer-visible');
        cartFooter.classList.add('footer-hidden');
    }
}

// Atualiza o footer ao carregar a página
document.addEventListener('DOMContentLoaded', updateCartFooterVisibility);

// Valida o endereço e exibe o aviso
addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden");
    }
});

// Função para verificar se a loja está aberta
function isStoreOpen() {
    // Lógica para verificar se a loja está aberta
    // Retorne true se a loja estiver aberta, false caso contrário
    return true; // Exemplo de retorno, ajuste conforme necessário
}

checkoutBtn.addEventListener("click", function () {

    const isOpen = isStoreOpen();
    if (!isOpen) {
        Toastify({
            text: "Lanchonete fechada no momento!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "rgb(239 68 68 )",
            },
            onClick: function () { } // Callback after click
        }).showToast();

        return;
    }

    if (cart.length === 0) return;

    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    // Incrementa o contador de pedidos
    orderCount += 1;

    // Monta a mensagem para o WhatsApp
    const cartItems = cart.map(item => {
        return `${item.name} (${item.quantity}) un`;
    }).join("\n");

    const message = `


🚨  *Pedido de *Nº ${orderCount}*

🛒  *Itens:*
-${cartItems}

💰 *Valor Total:* R$ ${cartTotal.textContent}

🛵 *Endereço:* ${addressInput.value}

⚠️ _OBS: O valor da entrega será passado após confirmação de dados e endereço!_

👤  Nome: ${nameInput.value}
💳 Forma de Pagamento: ${paymentMethodInput.value}
🗒️ Detalhes Adicionais: ${additionalInfoInput.value}
    `;
     

    const encodedMessage = encodeURIComponent(message);
    const phone = "87999061405";

    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

    cart = [];
    updateCartModal();
    updateCartFooterVisibility();
});
