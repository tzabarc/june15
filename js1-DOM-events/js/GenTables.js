/**
 * Created by tzabarc on 7/8/15.
 */
function refreshTables() {
    genProductsTable();
    genCartTable();
}

/**---------------  cart table related  *****************/

function genCartTable() {
    var oldTbody = document.querySelector('.cartTable .tbody');
    var newTbody = document.createElement('div');
    newTbody.className = "tbody";

    for (var id in cart.getCart()) {
        newTbody.appendChild(createCartRowFromObject(id));
    }

    document.querySelector('.cartTable').replaceChild(newTbody, oldTbody);

    updateTotalCost(cart.sumCostTotal());
}

function createCartRowFromObject(id) {
    var tr = document.createElement('div');
    tr.className = "Row";
    var tdId = document.createElement('div');
    tdId.className = "Cell";
    var tdName = document.createElement('div');
    tdName.className = "Cell";
    var tdQuantity = document.createElement('div');
    tdQuantity.className = "Cell";
    var tdPrice = document.createElement('div');
    tdPrice.className = "Cell";

    var item = getItemById(id);
    tdId.innerHTML = id;
    tdName.innerHTML = item.name;
    tdQuantity.innerHTML = cart.numOfItems(id);
    tdPrice.innerHTML = item.getPrice();

    [tdId, tdName, tdQuantity, tdPrice].forEach(function (elemToAppend) {
        tr.appendChild(elemToAppend);
    });

    return tr;
}

/**---------------  products table related  *****************/
function genProductsTable() {
    var table = document.querySelector('.productsTable');
    var tbody = document.querySelector('.productsTable .tbody');
    var newTbody = document.createElement('div');
    newTbody.className = "tbody";
    var currentPageItems = itemsJson.slice(start, end);
    currentPageItems.forEach(function (item, index) {
        newTbody.appendChild(createProductsRowFromObject(item, index));
    });

    table.replaceChild(newTbody, tbody);
}

function createProductsRowFromObject(obj, index) {

    var tr = document.createElement('div');
    tr.className = "Row " + obj.typeName;
    var tdId = document.createElement('div');
    tdId.className = "Cell";
    var tdName = document.createElement('div');
    tdName.className = "Cell";
    var tdDesc = document.createElement('div');
    tdDesc.className = "Cell";
    var tdLimit = document.createElement('div');
    tdLimit.className = "Cell";
    var tdPrice = document.createElement('div');
    tdPrice.className = "Cell";
    var buttonAdd = document.createElement('button');
    var buttonRem = document.createElement('button');
    var tdButtonContainer = document.createElement('div');
    tdButtonContainer.className = "Cell";

    tdId.innerHTML = obj.id;
    tdName.innerHTML = obj.name;
    tdDesc.innerHTML = obj.description;
    tdLimit.innerHTML = obj.limit;
    tdPrice.innerHTML = obj.getPrice();

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

function createTdOrderSelect(index) {
    var td = document.createElement('div');
    td.className = "Cell";

    var select = document.createElement('select');
    td.appendChild(select);
    var option;
    for (var i = start; i < end; i++) {
        option = document.createElement('option');
        option.innerHTML = option.value = i;
        select.appendChild(option);
    }
    select.value = start + index;
    select.onchange = selectionChanged;
    select.onfocus = keepOldVal;
    return td;
}

function keepOldVal() {
    this.oldvalue = this.value;
}
