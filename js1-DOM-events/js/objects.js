/**
 * Created by tzabarc on 7/7/15.
 */
function Item(obj){
    //this.  =obj.  ;
}
function SaleItem(){
    Item.call(this); // call super constructor.

}
// subclass extends superclass
SaleItem.prototype = Object.create(Item.prototype);
SaleItem.prototype.constructor = SaleItem;



function Coupon(code){
    this.code= code;

}

function DiscountCoupon(){
    Coupon.call(this); // call super constructor.
}
// subclass extends superclass
DiscountCoupon.prototype = Object.create(Coupon.prototype);
DiscountCoupon.prototype.constructor = DiscountCoupon;




function FreeItemCoupon(){
    Coupon.call(this); // call super constructor.
}
// subclass extends superclass
FreeItemCoupon.prototype = Object.create(Coupon.prototype);
FreeItemCoupon.prototype.constructor = FreeItemCoupon;
