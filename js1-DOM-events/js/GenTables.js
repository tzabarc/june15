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
    var item = store.getItemById(id);
    /*
    var item = store.getItemById(id);
    for (var att in item) {
        if (item.hasOwnProperty(att)) {

        var tdId = document.createElement('div');
        tdId.className = "Cell";
        td.innerText = item[att]
        tr.appendChild(td);
    }
    }*/

    tdId.innerText = id;
    tdName.innerText = item.name;
    tdQuantity.innerText = cart.numOfItems(id);
    tdPrice.innerText = item.getPrice();

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
    tdName.innerText = obj.name;
    tdDesc.innerText = obj.description;
    tdLimit.innerText = obj.limit;
    tdPrice.innerText = obj.getPrice();

    buttonAdd.dataset.itemId = buttonRem.dataset.itemId = obj.id;

    buttonAdd.addEventListener('click', addToCart);
    buttonRem.addEventListener('click', remFromCart);
    buttonAdd.innerText = "+ Add";
    buttonRem.innerText = "- Rem";

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
        option.innerText = option.value = i;
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
