/**
 * Created by tzabarc on 7/15/15.
 */

function rppChanged(inputObj) {
    'use strict';
    rpp = +inputObj.value;
    end = start + rpp;
    publish('onRppChanged', {detail: {pagenum: 99}});

    subscribe('onRppChanged', genProductsTable);//pubsub
}

function pageChanged(inputObj) {
    'use strict';
    currentPage = +inputObj.value;
    start = rpp * (currentPage - 1);
    end = start + rpp;
    document.dispatchEvent(onPageChange);
}

function selectionChanged() {
    'use strict';
    var tbody = document.querySelector('.productsTable .tbody');
    var fromIndex = this.oldvalue;
    var toIndex = this.selectedIndex;//value
    var trToMove = this.parentElement.parentElement;
    var trNodeLoose = trToMove.parentElement.removeChild(trToMove);
    var itemRows = document.querySelectorAll('.productsTable .tbody .Row');
    var i;
    if (fromIndex < toIndex) {
        for ( i = fromIndex; i < toIndex; i++) {
            itemRows[i].querySelector('select').value--;
        }
        if (toIndex === end - 1){
            tbody.appendChild(trNodeLoose);
            console.log('last');
        }else {
            tbody.insertBefore(trNodeLoose, itemRows[i]);
        }
    }else {
        for (i = toIndex; i < fromIndex; i++) {
            itemRows[i].querySelector('select').value++;
        }
        tbody.insertBefore(trNodeLoose, itemRows[toIndex]);
    }
}

function addToCart() {
    'use strict';
    this.nextSibling.textContent = cart.addItem(this.dataset.itemId);
    genCartTable();
}

function remFromCart() {
    'use strict';
    this.previousSibling.textContent = cart.removeItem(this.dataset.itemId);
    genCartTable();
}
