/**
 * Created by tzabarc on 7/13/15.
 */
var coupons= (function (){


    var couponsDB={
            "coupy"      : new DiscountCoupon("coupy"),
            "salelbanel" : new FreeItemCoupon("salelbanel")
        };

    return {
        getRefundSum : getRefundSum,
        add

    }
}())