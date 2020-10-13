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
    }
});

// remove items from cart
cart.addEventListener("click", (item) => {
     if(item.target.hasAttribute('href')) {
         let rmItem = item.target.parentElement.parentElement.parentElement;
         rmItem.remove();
     }
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
                    <div class="card-header card-title bg-info text-light py-3 mb-3">
                        <h4 id="itemname">${pack.name}</h4></div>
                    <img class="card-img-top" src="${pack.image}" alt="Card image cap" height="300" width="100">
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
        <div class="col-md-3 d-flex align-items-left">
            <p>${itemName}</p>
        </div>
        <div class="col-md-3 d-flex align-items-right">
            <p>${quantity}</p>
        </div>
        <div class="col-md-3vd-flex align-items-right">
            <p>${price}</p>
        </div>
    </div>
    `;
    cart.appendChild(li);
}
