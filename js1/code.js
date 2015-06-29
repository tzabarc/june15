//var table = document.querySelector('table');
var tbody = document.querySelector('tbody');
var fragment = document.createDocumentFragment();


//var headers = table.querySelectorAll('th');
//var headersText = [];
//for(var i=0; i<headers;i++){
//    headersText[i] = headers[i].dataset.field;
//}
var maxItems=items.length;
items.forEach(function(item, index){
    var tr = createRowFromObject(item, index);
    fragment.appendChild(tr);

});
tbody.appendChild(fragment);

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
    for(var i = 0; i<maxItems; i++){
        option = document.createElement('option');
        option.innerHTML = option.value = i;
        select.appendChild(option);
    }
    select.value = index;
    select.onchange = selectionChanged;
    select.onfocus = keepOldVal;
    return td;
}

function selectionChanged(){
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