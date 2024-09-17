
    // Função para verificar se a loja está aberta
    function isStoreOpen() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Horário de funcionamento da loja
        const openingHour = 16; // 16:00
        const closingHour = 0;  // 00:00
        const closingMinute = 40; // 00:40

        // Verifica se a loja está aberta
        if (currentHour > openingHour || (currentHour === openingHour && currentMinute >= 0)) {
            if (currentHour < closingHour || (currentHour === closingHour && currentMinute <= closingMinute)) {
                return true; // Loja aberta
            }
        }
        return false; // Loja fechada
    }

    // Atualiza o status da loja no DOM
    function updateStoreStatus() {
        const statusElement = document.getElementById('status-text');
        const circleElement = document.getElementById('status-circle');

        if (isStoreOpen()) {
            statusElement.textContent = 'Aberto';
            circleElement.classList.remove('bg-red-600');
            circleElement.classList.add('bg-green-600');
        } else {
            statusElement.textContent = 'Fechado';
            circleElement.classList.remove('bg-green-600');
            circleElement.classList.add('bg-red-600');
        }
    }

    // Chama a função para atualizar o status ao carregar a página
    document.addEventListener('DOMContentLoaded', updateStoreStatus);

