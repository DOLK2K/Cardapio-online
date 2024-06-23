
const menu = document.getElementById("menu")
const modalCart = document.getElementById("modal-cart")
const cartBtn = document.getElementById("cart-btn")
const modalItems = document.getElementById("modal-items")
const totalPedidos = document.getElementById("cart-total")
const checkoutBtn = document.getElementById('checkout-btn')
const closeModal = document.getElementById('close-modal-btn')
const counterCart = document.getElementById('cart-count')
const address = document.getElementById('address')
const andressWan = document.getElementById('address-warn')
const modalll = document.getElementById('modall')


const cart = []

cartBtn.addEventListener("click", function () {
    modalCart.style.display = 'flex'
})

closeModal.addEventListener("click", function() {
    modalCart.style = 'hidden'
})

menu.addEventListener("click", function(event) {

    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton) {
        const name = parentButton.getAttribute("data-nome")
        const preco = Number( parentButton.getAttribute("data-preco") )

        addToCart(name, preco )
    }

})

function addToCart(name, price) {
    const existirItem = cart.find(item => item.name === name)

    if(existirItem) {
        existirItem.quantity += 1;
        
    }else {
        cart.push ({
            name,
            price,
            quantity:1,
        }) 
    }

    updateCartModal()
   
}

function updateCartModal() {
    modalItems.innerHTML = ""
    let total = 0; 
    
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
        <div> 
        <p class="font-medium text-lg"> ${item.name} </p>
        <p class="text-lg"> Quantidade: ${item.quantity} </p>
        <p class="font-medium mt-2"> R$ ${item.price.toFixed(2)} </p> 
        </div>
        
        <div> 
        <button class ="remove-form-cart" data-name="${item.name}" >  Remover </button>
        </div>
        </div>
        `

        total+= item.price * item.quantity

        modalItems.appendChild(cartItemElement)
    })
    totalPedidos.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    counterCart.innerHTML = cart.length 

}
modalItems.addEventListener("click", function (event) {
    if(event.target.classList.contains ("remove-form-cart")) {
        const name = event.target.getAttribute('data-name')
        removeItemCart(name)
    }
})

function removeItemCart (name) {
    const index = cart.findIndex (item => item.name === name);

    if(index !== -1) {
        const item = cart[index]

    if(item.quantity > 1) {
        item.quantity -= 1;
        updateCartModal()
        return; 
    }

    cart.splice(index, 1);
    updateCartModal();

    }
}

address.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        address.classList.remove("border-red-500")
        andressWan.classList.add("hidden")
    }
    //
})

checkoutBtn.addEventListener("click", function() {
    // const isOpen = checkRestaurantOpen(); 
    // if(!isOpen) {
    //     alert("RESTAURANTE FECHADO NO MOMENTO!")
    // }


    if(cart.length === 0) return;

    if(address.value === "") {
        andressWan.classList.remove("hidden")
        address.classList.add("border-red-500")
        address.classList.add("border-red-500")
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalFormatted = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });


    const cartItems = cart.map((item) => {
        return (
            ` ${item.name}, Quantidade: (${item.quantity}), Preço: R$ ${item.price},   `
        )
    }).join("")
    const message = encodeURIComponent(`${cartItems}\nTotal: ${totalFormatted}\nEndereço: ${address.value}`)
    const phone = "5511945709088"

    window.open(`https://wa.me/${phone}?text=${message}`,"_blank") 
})


function checkRestaurantOpen () {
    const data = new Date();
    const hora = data.getHours();

    return hora >= 18 && hora < 23; 
}

const spanItem = document.getElementById("date-burgue")
const isOpen = checkRestaurantOpen()

if(isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
} else {
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}