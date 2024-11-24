# Cardápio Online
Um sistema de pedidos online desenvolvido para facilitar o gerenciamento de pedidos de lanchonetes e pizzarias, permitindo que os clientes escolham produtos, visualizem detalhes e enviem diretamente o pedido via WhatsApp.

## 🚀 Objetivo
Simplificar o processo de pedidos, oferecendo uma interface responsiva e intuitiva para lanchonetes e pizzarias que desejam digitalizar seu atendimento e melhorar a experiência do cliente.

## ✨ Funcionalidades
Exibição de cardápio com categorias separadas (hambúrgueres, bebidas, sucos, acompanhamentos, etc.).
Sistema de carrinho de compras com cálculo dinâmico de total.
Envio automático de pedidos via WhatsApp, incluindo detalhes como endereço, forma de pagamento e observações.
Status de funcionamento da loja (Aberta/Fechada) com base no horário configurado.
Design responsivo e animações suaves para transições no footer e modal.
## 🛠️ Tecnologias Utilizadas
HTML5 e CSS3 com TailwindCSS para estilização.
JavaScript para funcionalidades dinâmicas e manipulação do DOM.
Git para controle de versão.

## 📦 Estrutura do Projeto

```plaintext CARDAPIO-ONLINE/
├── assets/                   # Imagens e recursos estáticos  
├── categories/               # Páginas HTML por categoria  
│   ├── hamburgers.html  
│   ├── drinks.html  
│   ├── juices.html  
│   ├── sides.html  
│   ├── others.html  
├── node_modules/             # Dependências instaladas  
├── scripts/                  # Scripts JavaScript  
│   ├── orderCart.js  
│   ├── statusStore.js  
├── styles/                   # Estilos com TailwindCSS  
│   ├── output.css  
│   ├── style.css  
├── .gitignore  
├── index.html                # Página principal  
├── package-lock.json         # Arquivo de lock do npm  
├── package.json              # Configuração do projeto npm  
├── tailwind.config.js        # Configuração do TailwindCSS
```



  
## 🚀 Como Usar
### Pré-requisitos
- Navegador moderno atualizado.
- Para desenvolvimento, é necessário ter `Node.js` e `npm` instalados.

### Instalação

 1. **Clone o repositório:**
```bash
  git clone https://github.com/mariorenanofc/cardapio-online.git
```
 2. **Navegue até o diretório do projeto:**

```bash
cd cardapio-online
```

 3. **Instale as dependências:**
```bash
npm install
```

4.  **Inicie o servidor local (caso configurado):**
```bash
npm run dev
```

5.  **Abra o arquivo `index.html` no navegador para visualizar o projeto.**

## 📖 Roadmap
 - Adicionar integração com API para armazenamento de pedidos.
 - Implementar um painel de administração para gerenciar produtos e pedidos.
 - Incluir sistema de login para clientes e administradores.
 - Melhorar suporte para dispositivos móveis.

## 🤝 Contribuição
1. Faça um fork do repositório.
   
2. Crie uma branch com sua feature:
```bash
git checkout -b minha-feature
```

3. Faça commit das alterações:
```bash
git commit -m 'Minha nova feature'
```
4. Envie para a branch principal:
```bash
git push origin minha-feature
```

4. Abra um Pull Request.

   
## 📄 Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

## 📫 Contato
**Mário Renan**

- E-mail: mariovendasonline10k@gmail.com
- LinkedIn: in/mariorenanofc
