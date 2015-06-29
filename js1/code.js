var table = document.querySelector('table');
var fragment = document.createDocumentFragment();
var tbody = document.querySelector('tbody');


var headers = table.querySelectorAll('th');
var headersText = [];
for(i=0; i<headers;i++){
    headersText[i] = headers[i].dataset['field'];
}

items.forEach(function(item, index, array){
    var tr = createRowFromObject(item, index);
    fragment.appendChild(tr);

    if(index===19) {
        tbody.appendChild(fragment);
    }
});

function createRowFromObject(obj, index){
    var tr = document.createElement('tr');
    var
        tdId = document.createElement('td'),
        tdFn = document.createElement('td'),
        tdLn= document.createElement('td');

    tr.appendChild(createSelect(index));
    tr.appendChild(tdId);
    tr.appendChild(tdFn);
    tr.appendChild(tdLn);

    tdId.innerHTML = obj.id;
    tdFn.innerHTML = obj.firstName;
    tdLn.innerHTML = obj.lastName;
    return tr;
}


function createSelect(index){
    var td = document.createElement('td');
    var select = document.createElement('select');
    td.appendChild(select);
    var option;
    for(var i = 0; i<20; i++){
        option = document.createElement('option');
        option.innerHTML = i.toString();
        option.value = i;
        select.appendChild(option);
    }
    select.value = index;
    select.onchange = selectionChanged;
    return select;
}

function selectionChanged(){
    console.log(arguments);
}
