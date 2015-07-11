/**
 * Created by tzabarc on 7/8/15.
 */
function refreshTables(){
    genProductsTable();
    genCartTable();
}

/**---------------  cart table related  *****************/

function genCartTable(){
    var oldTbody = document.querySelector('.cartTable tbody');
    var newTbody = document.createElement('tbody');

    for (var id in cart.getCart()){
        newTbody.appendChild(createCartRowFromObject(id));
    }

    document.querySelector('.cartTable').replaceChild(newTbody,oldTbody);

    updateTotalCost();
}

function createCartRowFromObject(id){
    var tr   = document.createElement('tr'),
        tdId = document.createElement('td'),
        tdName = document.createElement('td'),
        tdQuantity = document.createElement('td'),
        tdPrice = document.createElement('td');

    var item = getItemById(id);
    tdId.innerHTML = id;
    tdName.innerHTML = item.name;
    tdQuantity.innerHTML = cart.numOfItems(id);
    tdPrice.innerHTML = item.price;

    [tdId, tdName, tdQuantity, tdPrice].forEach(function (elemToAppend) {
        tr.appendChild(elemToAppend);
    });

    return tr;
}

/**---------------  products table related  *****************/
function genProductsTable(){
    var tbody = document.querySelector('.productsTable tbody');
    var newTbody = document.createElement('tbody');
    var currentPageItems = itemsJson.slice(start, end);
    currentPageItems.forEach(function(item, index){
        newTbody.appendChild(createProductsRowFromObject(item, index));
    });
    var table = document.querySelector('.productsTable');

    table.replaceChild(newTbody,tbody);
}

function createProductsRowFromObject(obj, index){

    var tr   = document.createElement('tr'),
        tdId = document.createElement('td'),
        tdName = document.createElement('td'),
        tdDesc = document.createElement('td'),
        tdLimit = document.createElement('td'),
        tdPrice = document.createElement('td'),
        buttonAdd = document.createElement('button'),
        buttonRem = document.createElement('button'),
        tdButtonContainer = document.createElement('td');

    tdId.innerHTML = obj.id;
    tdName.innerHTML = obj.name;
    tdDesc.innerHTML = obj.description;
    tdLimit.innerHTML = obj.limit;
    tdPrice.innerHTML = obj.price;

    buttonAdd.dataset.itemId = buttonRem.dataset.itemId = obj.id;

    buttonAdd.addEventListener('click', addToCart);
    buttonRem.addEventListener('click', remFromCart);
    buttonAdd.innerHTML = "+ Add";
    buttonRem.innerHTML = "- Rem";

    tdButtonContainer.appendChild(buttonAdd);
    tdButtonContainer.appendChild(document.createTextNode(cart.numOfItems(obj.id)));
    tdButtonContainer.appendChild(buttonRem);

    [createTdOrderSelect(index), tdId, tdName, tdDesc, tdLimit, tdPrice, tdButtonContainer].forEach(function (elemToAppend) {
        tr.appendChild(elemToAppend);
    });

    return tr;
}

function createTdOrderSelect(index){
    var td = document.createElement('td');
    var select = document.createElement('select');
    td.appendChild(select);
    var option;
    for(var i = start; i<end; i++){
        option = document.createElement('option');
        option.innerHTML = option.value = i;
        select.appendChild(option);
    }
    select.value = start + index;
    select.onchange = selectionChanged;
    select.onfocus = keepOldVal;
    return td;
}

function keepOldVal(){
    this.oldvalue = this.value;
}
