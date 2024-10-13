const menu = document.getElementById("menu", "drick-menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("closed-model-btn");
const cartCounter = document.getElementById("cart-count");
const addressNumberInput = document.getElementById("address-number");
const addressStreetInput = document.getElementById("address-street");
const addressNeighborhoodInput = document.getElementById(
  "address-neighborhood"
);
const addressCityInput = document.getElementById("address-city");
const addressWarn = document.getElementById("address-warn");
const nameInput = document.getElementById("name");
const paymentMethodSelect = document.getElementById("payment-method");
const additionalInfoInput = document.getElementById("additional-info");
const orderTypeSelect = document.getElementById("order-type"); // Forma de retirada
const deliveryAddressDiv = document.getElementById("delivery-address"); // Div para esconder/mostrar endereço

// Contador de pedidos
let orderCount = 0;
let cart = [];

// Carregar carrinho do LocalStorage ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartModal();
    updateCartFooterVisibility();
  }
});

// Função para salvar o carrinho no LocalStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Open cart modal
cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
});

// Close cart modal when clicking outside
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// Close cart modal when clicking close button
closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

// Mostrar/esconder campos de endereço com base na forma de retirada
orderTypeSelect.addEventListener("change", function () {
  if (this.value === "entrega") {
    deliveryAddressDiv.classList.remove("hidden"); // Mostra os campos de endereço
  } else {
    deliveryAddressDiv.classList.add("hidden"); // Esconde os campos de endereço
  }
});

// Modifica o evento de clique no botão de adicionar ao carrinho
menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));
    const milk = parentButton.getAttribute("data-milk"); // Pega a opção "com leite" ou "sem leite"

    addToCart(name, price, milk);
  }
});

// Modificar a função para incluir o tipo de suco
function addToCart(name, price, milk = null) {
  // Se milk for nulo ou indefinido, não incluir no nome do produto
  const itemName = milk ? `${name} (${milk})` : name;

  const existingItem = cart.find((item) => item.name === itemName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: itemName, // Agora, usa itemName, que já inclui a verificação de milk
      price,
      quantity: 1,
    });
  }

  // Exibe a notificação de produto adicionado
  Toastify({
    text: `${itemName} adicionado ao carrinho!`,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "rgb(16, 185, 129)", // Verde para indicar sucesso
    },
  }).showToast();

  saveCartToLocalStorage(); // Salva o carrinho ao adicionar um item
  updateCartModal();
  updateCartFooterVisibility();
}

// Function to remove item from cart
function removeItemFromCart(name) {
  const itemIndex = cart.findIndex((item) => item.name === name);
  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
    saveCartToLocalStorage(); // Salva o carrinho ao remover um item
    updateCartModal();
    updateCartFooterVisibility();
  }
}

// Update cart modal
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );

    cartItemElement.innerHTML = `
            <div class="flex items-center justify-between bg-orange-300 p-2 rounded-2xl">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$: ${item.price.toFixed(2)}</p>
                </div>
                
                <button onclick="removeItemFromCart('${
                  item.name
                }')" class="bg-red-400 px-2 rounded-md">Remover</button>
            </div>
        `;

    total += item.price * item.quantity;
    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const itemCount = cart.length;
  cartCounter.innerHTML = itemCount;

  return itemCount;
}

// Update footer visibility based on cart items
function updateCartFooterVisibility() {
  const cartFooter = document.getElementById("cart-footer");

  const itemCount = updateCartModal();

  if (itemCount > 0) {
    cartFooter.classList.remove("footer-hidden");
    cartFooter.classList.add("footer-visible");
  } else {
    cartFooter.classList.remove("footer-visible");
    cartFooter.classList.add("footer-hidden");
  }
}

// Update footer visibility on page load
document.addEventListener("DOMContentLoaded", updateCartFooterVisibility);

// Validate address input and show warning if fields are empty
addressNumberInput.addEventListener("input", validateAddress);
addressStreetInput.addEventListener("input", validateAddress);
addressNeighborhoodInput.addEventListener("input", validateAddress);
addressCityInput.addEventListener("input", validateAddress);

function validateAddress() {
  if (
    addressNumberInput.value !== "" &&
    addressStreetInput.value !== "" &&
    addressNeighborhoodInput.value !== "" &&
    addressCityInput.value !== ""
  ) {
    addressWarn.classList.add("hidden");
    addressNumberInput.classList.remove("border-red-500");
    addressStreetInput.classList.remove("border-red-500");
    addressNeighborhoodInput.classList.remove("border-red-500");
    addressCityInput.classList.remove("border-red-500");
  } else {
    addressWarn.classList.remove("hidden");
    addressNumberInput.classList.add("border-red-500");
    addressStreetInput.classList.add("border-red-500");
    addressNeighborhoodInput.classList.add("border-red-500");
    addressCityInput.classList.add("border-red-500");
  }
}

checkoutBtn.addEventListener("click", function () {
  updateStoreStatus();

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
    }).showToast();

    return;
  }

  if (cart.length === 0) return;

  // Verifica se a forma de retirada é "entrega" e valida os campos de endereço
  if (orderTypeSelect.value === "entrega") {
    if (
      addressNumberInput.value === "" ||
      addressStreetInput.value === "" ||
      addressNeighborhoodInput.value === "" ||
      addressCityInput.value === ""
    ) {
      addressWarn.classList.remove("hidden");
      addressNumberInput.classList.add("border-red-500");
      addressStreetInput.classList.add("border-red-500");
      addressNeighborhoodInput.classList.add("border-red-500");
      addressCityInput.classList.add("border-red-500");
      return;
    }
  }

  // Increment order count
  orderCount += 1;

  // Build WhatsApp message
  const cartItems = cart
    .map((item) => {
      return `${item.name} (${item.quantity}) - R$: ${item.price.toFixed(2)}`;
    })
    .join("\n");

  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const name = nameInput.value;
  const paymentMethod = paymentMethodSelect.value;
  const additionalInfo = additionalInfoInput.value;
  const orderType = orderTypeSelect.value;

  // Ajusta a mensagem dependendo se for entrega ou retirada
  const address =
    orderType === "entrega"
      ? `Endereço: ${addressStreetInput.value}, ${addressNumberInput.value}, ${addressNeighborhoodInput.value}, ${addressCityInput.value}`
      : "🛍️ - Retirada na lanchonete";

  const message = `🚨 - Pedido número: ${orderCount}\n🚩 - Nome: ${name}\n\n🛒 - Itens do pedido:\n${cartItems}\n\n💰 - Total: R$ ${total}\n💳 - Forma de pagamento: ${paymentMethod}\n${address}\nObservações: ${additionalInfo}\n\nAgradecemos o seu pedido!`;

  const encodedMessage = encodeURIComponent(message);

  // Open WhatsApp chat with the encoded message
  window.open(`https://wa.me/5587999061405?text=${encodedMessage}`);

  // Clear cart
  cart = [];
  saveCartToLocalStorage();
  updateCartModal();
  updateCartFooterVisibility();

  // Close modal after checkout
  cartModal.style.display = "none";
});
