/**
 * Created by tzabarc on 7/1/15.
 */
var table = document.querySelector('#xitems');
var currentPage = 1;

//var j =10;
//console.time("how long to calculate");
//for(var i=0; i< 1000000; i++) { j += i;}
//console.timeEnd("how long to calculate")
init();
var rpp = +document.querySelector('#rpc').value;    //records per page
var start= 0;

var end=start + rpp;
function genTable(evt){
    if (evt && evt.detail) {
        console.log(evt.detail.pagenum);
    }
    var tbody = document.querySelector('tbody');
    var newTbody = document.createElement('tbody');
    var itt = items.slice(start, end);
    itt.forEach(function(item, index){
        var tr = createRowFromObject(item, index);
        newTbody.appendChild(tr);
    });

    table.replaceChild(newTbody,tbody);
}

function createRowFromObject(obj, index){

    var tr   = document.createElement('tr'),
        tdId = document.createElement('td'),
        tdName = document.createElement('td'),
        tdDesc = document.createElement('td'),
        tdLim = document.createElement('td'),
        tdPrc = document.createElement('td'),
        buttonAdd = document.createElement('button'),
        buttonRem = document.createElement('button'),
        tdAdd = document.createElement('td');
    tdId.innerHTML = obj.id;
    tdName.innerHTML = obj.name;
    tdDesc.innerHTML = obj.description;
    tdLim.innerHTML = obj.limit;
    tdPrc.innerHTML = obj.price;

    //tdAdd.innerHTML = '<button type="button" itemId=' + obj.id + ' onclick="addToCart(this)">+add</button>0 <button type="button" onclick="remFromCart(this)">-rem</button>' ;
    buttonAdd.dataset.itemId = obj.id;
    buttonRem.dataset.itemId = obj.id;

    //buttonAdd.onclick = addToCart; // (this) ?

    buttonAdd.addEventListener('click', addToCart);
    buttonRem.addEventListener('click', remFromCart);
    buttonAdd.innerHTML = "+ Add";
    buttonRem.innerHTML = "- Rem";


    tdAdd.appendChild(buttonAdd);
    tdAdd.appendChild(document.createTextNode("0"));
    tdAdd.appendChild(buttonRem);


    //buttonRem.onclick = remFromCart; // (this) ?



    tr.appendChild(createTdSelect(index));
    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdDesc);
    tr.appendChild(tdLim);
    tr.appendChild(tdPrc);
    tr.appendChild(tdAdd);
    return tr;
}

function createTdSelect(index){
    var td = document.createElement('td');
    var select = document.createElement('select');
    td.appendChild(select);
    var option;
    for(var i = start; i<end; i++){
//genTable();
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

    subscribe('onRppChanged',genTable);//pubsub
//unsubscribe('onRppChanged',genTable);//pubsub//test unsub
//genTable();
}
var onPageChange = new CustomEvent('onPageChange',{
    detail:{pagenum:67}
});
document.addEventListener('onPageChange',genTable);
function pageChanged(inputObj){
    currentPage = +inputObj.value;
    start = rpp * (currentPage-1);
    end = start + rpp;
    document.dispatchEvent(onPageChange);
}
function selectionChanged(){
    var tbody = document.querySelector('tbody');
    var fromIndex = this.oldvalue;
    var toIndex = this.selectedIndex;//value
    var trToMove=this.parentElement.parentElement;
    var trNodeLoose= trToMove.parentElement.removeChild(trToMove);
    var c = document.querySelectorAll('tbody tr');
    if (fromIndex < toIndex){
//updateCart(diff)
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
function addToCart(){
    this.nextSibling.textContent = cart.addItem(this.dataset.itemId);

}
function remFromCart(){
    this.previousSibling.textContent = cart.removeItem(this.dataset.itemId);

}

//function getTr(index){
//    var trs = document.querySelectorAll('tbody tr');
//    return trs[index];
//}
var cart;
function init(){
    cart= new Cart();
    genTable();
}




















