/**
 * Created by tzabarc on 7/7/15.
 */
/**---------------  Item related  *****************/
function Item(obj) {
    "use strict";
    for (var key in obj) {
        this[key] = obj[key];
    }
    //this.typeName = 'Item';
}
Item.prototype.getPrice = function () {
    return parseInt(this.price, 10);
};

function SaleItem(obj, discount) {
    "use strict";
    Item.call(this, obj); // call super constructor.
    this.discount = discount;
    //this.typeName = 'SaleItem';
}
SaleItem.prototype = Object.create(Item.prototype);
SaleItem.prototype.constructor = SaleItem;
SaleItem.prototype.getPrice = function () {
    return parseInt(this.price) * (1 - this.discount / 100);
};
/**---------------  Store related  *****************/

function Store(objArr) {
    "use strict";
    var itemsDB=[];
    for(var i = 0; i<objArr.length; i++){
        if(Math.random()>0.5){
            itemsDB.push(new Item(objArr[i]));
        }else{
            var discount = parseInt(Math.random()*100,10);
            itemsDB.push(new SaleItem(objArr[i], discount));
        }
    }

    this.getItemsSlice = function(start, end) {
        start= start || 0;
        end= end || itemsDB.length-1;
        return itemsDB.slice(start, end);
    };

    this.getItemById = function(id) {
        for (var i=0; i < itemsDB.length; i++) {
            if (itemsDB[i].id === id) {
                return itemsDB[i];
            }
        }
    };

}


