/**
 * Created by tzabarc on 7/1/15.
 */
//var table = document.querySelector('table');
//var tbody = document.getElementById('tbody');
var table = document.querySelector('table');
//var fragment = document.createDocumentFragment();


//var headers = table.querySelectorAll('th');
//var headersText = [];
//for(var i=0; i<headers;i++){
//    headersText[i] = headers[i].dataset.field;
//}
var currentPage = 1;
var rpp = +document.querySelector('#rpc').value;    //records per page
//alert(rpp);
var start= 0;
var end=start + rpp;

var maxItems=items.length;
genTable();

//var j =10;
//console.time("how long to calculate");
//for(var i=0; i< 1000000; i++) { j += i;}
//console.timeEnd("how long to calculate")


function genTable(evt){
    if (evt && evt.detail) {
        console.log(evt.detail.pagenum);
    }
    //console.log(pagenum);
    var tbody = document.querySelector('tbody');
    var newTbody = document.createElement('tbody');
    var itt = items.slice(start, end);
    itt.forEach(function(item, index){
        var tr = createRowFromObject(item, index);
        newTbody.appendChild(tr);
    });

    table.replaceChild(newTbody,tbody);
    //tbody.appendChild(fragment);
}

function createRowFromObject(obj, index){
    var tr   = document.createElement('tr'),
        tdId = document.createElement('td'),
        tdFn = document.createElement('td'),
        tdLn = document.createElement('td');

    tdId.innerHTML = obj.id;
    tdFn.innerHTML = obj.firstName;
    tdLn.innerHTML = obj.lastName;

    tr.appendChild(createTdSelect(index));
    tr.appendChild(tdId);
    tr.appendChild(tdFn);
    tr.appendChild(tdLn);
    return tr;
}

function createTdSelect(index){
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

function rppChanged(inputObj){
    rpp = +inputObj.value;
    end = start + rpp;
    publish('onRppChanged',{detail:{pagenum: 99}});
    //genTable();
}
subscribe('onRppChanged',genTable);//pubsub
//unsubscribe('onRppChanged',genTable);//pubsub//test unsub

var onPageChange = new CustomEvent('onPageChange',{
    detail:{pagenum:67}
});
document.addEventListener('onPageChange',genTable);
function pageChanged(inputObj){
    currentPage = +inputObj.value;
    start = rpp * (currentPage-1);
    end = start + rpp;
    document.dispatchEvent(onPageChange);
    //genTable();
}
function selectionChanged(){
    var tbody = document.querySelector('tbody');
    var fromIndex = this.oldvalue;
    var toIndex = this.selectedIndex;//value
    var trToMove=this.parentElement.parentElement;
    var trNodeLoose= trToMove.parentElement.removeChild(trToMove);
    var c = document.querySelectorAll('tbody tr');
    if (fromIndex < toIndex){
        for(var i=fromIndex;i<toIndex;i++){
            decTr(c[i]);
        }
        tbody.insertBefore(trNodeLoose,c[i]);
    }else{
        for( i=toIndex ;i<fromIndex;i++){
            incTr(c[i]);
        }
        tbody.insertBefore(trNodeLoose,c[toIndex]);
    }
}
function keepOldVal(){
    this.oldvalue = this.value;
}
function incTr(tr){
    tr.querySelector('select').value++;
}
function decTr(tr){
    tr.querySelector('select').value--;
}
//function getTr(index){
//    var trs = document.querySelectorAll('tbody tr');
//    return trs[index];
//}























