/**
 * Created by tzabarc on 7/1/15.
 */

//var j =10;
//console.time("how long to calculate");
//for(var i=0; i< 1000000; i++) { j += i;}
//console.timeEnd("how long to calculate")
var currentPage = 1;
var rpp = +document.querySelector('#rpc').value;    //records per page
var start = 0;
var end = start + rpp;

init();

function updateTotalCost(price) {
    document.querySelector(".beforeDiscountCostValue").innerText = price;
}

function rppChanged(inputObj) {
    rpp = +inputObj.value;
    end = start + rpp;
    publish('onRppChanged', {detail: {pagenum: 99}});

    subscribe('onRppChanged', refreshTables);//pubsub
}
var onPageChange = new CustomEvent('onPageChange', { detail: {pagenum: 67}
});

document.addEventListener('onPageChange', refreshTables);
function pageChanged(inputObj) {
    currentPage = +inputObj.value;
    start = rpp * (currentPage - 1);
    end = start + rpp;
    document.dispatchEvent(onPageChange);
}
function selectionChanged() {
    var tbody = document.querySelector('.tbody');
    var fromIndex = this.oldvalue;
    var toIndex = this.selectedIndex;//value
    var trToMove = this.parentElement.parentElement;
    var trNodeLoose = trToMove.parentElement.removeChild(trToMove);
    var tbodyRow = document.querySelectorAll('.tbody .Row');
    if (fromIndex < toIndex) {
        for (var i = fromIndex; i < toIndex; i++) {
            tbodyRow[i].querySelector('select').value--;
        }
        tbody.insertBefore(trNodeLoose, tbodyRow[i]);
    } else {
        for (i = toIndex; i < fromIndex; i++) {
            tbodyRow[i].querySelector('select').value++;
        }
        tbody.insertBefore(trNodeLoose, tbodyRow[toIndex]);
    }
}
function addToCart() {
    this.nextSibling.textContent = cart.addItem(this.dataset.itemId);
    genCartTable();

}
function remFromCart() {
    this.previousSibling.textContent = cart.removeItem(this.dataset.itemId);
    genCartTable();

}

//function getTr(index){
//    var trs = document.querySelectorAll('tbody tr');
//    return trs[index];
//}
var store;
var cart;
function init() {
    store = new Store(itemsJson);
    cart = new Cart(store);
    genProductsTable();
//    genCartTable();
}




















