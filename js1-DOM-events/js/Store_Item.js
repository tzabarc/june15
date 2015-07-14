/**
 * Created by tzabarc on 7/7/15.
 */
function Item(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
    this.typeName = 'Item';
}

Item.prototype.getPrice = function () {
    return (parseInt(this.price, 10)).toFixed(2) +'$';
};
function SaleItem(obj, discount) {
    Item.call(this, obj); // call super constructor.
    this.discount = discount;
    this.typeName = 'SaleItem';
}
// subclass extends superclass
SaleItem.prototype = Object.create(Item.prototype);
SaleItem.prototype.constructor = SaleItem;
SaleItem.prototype.getPrice = function () {
    return ((parseInt(this.price) * (1 - (this.discount / 100))).toFixed(2))+'$';
};

function Store(objArr) {
    var itemsDB=[];
    for(var i = 0; i<objArr.length; i++){
        var currItem = objArr[i];
        if(Math.random()>0.5){
            itemsDB.push(new Item(currItem));
        }else{
            var discount = parseInt(Math.random()*100,10);
            itemsDB.push(new SaleItem(currItem, discount));
        }

    }

    this.getItemById = function(id) {
        for (var i=0; i < itemsDB.length; i++) {
            if (itemsDB[i].id === id) {
                return itemsDB[i];
            }
        }
    };

}


