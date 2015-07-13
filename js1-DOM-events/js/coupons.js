/**
 * Created by tzabarc on 7/13/15.
 */
function Coupon(code) {
    this.code = code;
    this.active = false;
}

function DiscountCoupon(code,discountPercent) {
    Coupon.call(this,code); // call super constructor.
    this.discountPercent = discountPercent;
}
// subclass extends superclass
DiscountCoupon.prototype = Object.create(Coupon.prototype);
DiscountCoupon.prototype.constructor = DiscountCoupon;


function FreeItemCoupon(code,itemId) {
    Coupon.call(this,code); // call super constructor.
    this.itemId = itemId;
}
// subclass extends superclass
FreeItemCoupon.prototype = Object.create(Coupon.prototype);
FreeItemCoupon.prototype.constructor = FreeItemCoupon;

var coupons= (function (){


    var couponsDB={
            "coupy"      : new DiscountCoupon("coupy"),
            "salelbanel" : new FreeItemCoupon("salelbanel")
        };


    function addCoupon(inputObj){
        activateCoupon(inputObj.value);
        inputObj.value="";

    }
    function activateCoupon(code){
       if(couponsDB[code] && couponsDB[code].active===false){
           couponsDB[code].active = true;
           console.log("good coupon")
           //update current refund amount in $ (add property)
           //update total refund ->update total cost
           //draw coupon raw in table
          


       }

    }


    return {
        //getRefundSum : getRefundSum,
        addCoupon : addCoupon

    }
}())