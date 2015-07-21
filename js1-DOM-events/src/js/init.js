/**
 * Created by tzabarc on 7/1/15.
 */
/*global itemsJson */

//var j = 10;
//console.time("how long to calculate");
//for (var i=0; i< 1000000; i++) { j += i;}
//console.timeEnd("how long to calculate")


var currentPage = 1;
var rpp = +document.querySelector('#rpc').value;    //records per page
var start = 0;
var end = start + rpp;
var store = new Store(itemsJson);
var cart = new Cart(store);

var onPageChange = new CustomEvent('onPageChange', {detail: {pagenum: 67}});
document.addEventListener('onPageChange', genProductsTable);

genProductsTable();





















