let packages = document.querySelector('#packages');
let cart = document.querySelector('#viewCart');

// add eventlistener
// load packages from package.json file
document.addEventListener("DOMContentLoaded", (e) => {
    fetch('js/packages.json')
     .then(resp => resp.json())
     .then(data => {
        // console.log(data);
         showPackages(data);
     });
})

// add items in cart
packages.addEventListener('click', (e) => {
    //console.log(e.target);
    if(e.target.hasAttribute('href')) {
      let item = e.target.parentElement.parentElement;
      showCarts(item);
      showAmount(item);
    }
    e.preventDefault();
});

// remove items from cart
cart.addEventListener("click", (item) => {
     if(item.target.hasAttribute('href')) {
         let rmItem = item.target.parentElement.parentElement.parentElement;
         rmItem.remove();
         minusAmount(rmItem);
     }
     item.preventDefault();
})

function showPackages(package) {
    package.products.forEach(pack => {
        addToPackages(pack);
    })
}


function addToPackages(pack) {
    let card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
                    <div class="card">
                    <div class="card-header card-title bg-info text-light text-uppercase py-3 mb-3">
                        <h4 id="itemname">${pack.name}</h4></div>
                    <img class="card-img-top" src="${pack.image}" alt="Card image cap" height="150" width="30">
                    <div class="card-body">
                            <ul>
                                <li>Size : ${pack.size}</li>
                                <li>Color: ${pack.color}</li>
                            </ul>
                            <h1 class="text-success d-flex justify-content-center mb-3">${pack.currency} ${pack.price}</h1>
                            <a href="#" id="addToCart" class="btn btn-primary btn-block">${pack.button}</a>
                    </div>
                    `;
    packages.appendChild(card);
}

function showCarts(item) {

   // console.log(item);
    let itemName = item.getElementsByTagName("H4")[0].innerHTML;
    let quantity = 1;
    let price = item.getElementsByTagName("H1")[0].innerHTML;
    //console.log(cart.querySelector("#noItem"));
    if(cart.querySelector("#noItem") != null) {
        cart.querySelector("#noItem").remove();
    }
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
    <div class="row">
        <div class="col-md-3">
            <a href="#"  id="delete" class="delete text-danger">X</a>
        </div>
        <div class="col-md-3 text-uppercase">
            <p>${itemName}</p>
        </div>
        <div class="col-md-3">
            <p>${quantity}</p>
        </div>
        <div class="col-md-3">
            <p>${price}</p>
        </div>
    </div>
    `;
    cart.appendChild(li);
    
}

function showAmount(e) {
    let total = document.querySelector("#total");
    amount = parseInt(total.getElementsByTagName("span")[1].innerHTML);
    let itemPrice = e.getElementsByTagName("H1")[0].innerHTML;
    itemPrice = parseInt(itemPrice.split(" ")[1]);
    total.getElementsByTagName("span")[1].innerHTML = amount + itemPrice;

}

function minusAmount(minItem) {
    let total = document.querySelector("#total");
    amount = parseInt(total.getElementsByTagName("span")[1].innerHTML);
    let itemAmount = minItem.getElementsByTagName("p")[2].innerHTML;
    itemAmount = parseInt(itemAmount.split(" ")[1]);
    total.getElementsByTagName("span")[1].innerHTML = amount - itemAmount;
}