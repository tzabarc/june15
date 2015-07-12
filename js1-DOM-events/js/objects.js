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
}
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
}


function Coupon(code) {
    this.code = code;

}

function DiscountCoupon() {
    Coupon.call(this); // call super constructor.
}
// subclass extends superclass
DiscountCoupon.prototype = Object.create(Coupon.prototype);
DiscountCoupon.prototype.constructor = DiscountCoupon;


function FreeItemCoupon() {
    Coupon.call(this); // call super constructor.
}
// subclass extends superclass
FreeItemCoupon.prototype = Object.create(Coupon.prototype);
FreeItemCoupon.prototype.constructor = FreeItemCoupon;
