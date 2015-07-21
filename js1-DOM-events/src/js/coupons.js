/**
 * Created by tzabarc on 7/13/15.
 */
function Coupon(code) {
    'use strict';
    this.code = code;
    this.active = false;
}

function DiscountCoupon(code, discountPercent) {
    'use strict';
    Coupon.call(this, code); // call super constructor.
    this.discountPercent = discountPercent;
}
// subclass extends superclass
DiscountCoupon.prototype = Object.create(Coupon.prototype);
DiscountCoupon.prototype.constructor = DiscountCoupon;


function FreeItemCoupon(code, itemId) {
    'use strict';
    Coupon.call(this, code); // call super constructor.
    this.itemId = itemId;
}
// subclass extends superclass
FreeItemCoupon.prototype = Object.create(Coupon.prototype);
FreeItemCoupon.prototype.constructor = FreeItemCoupon;

var coupons = (function () {
    'use strict';
    var couponsDB = {
        coupy: new DiscountCoupon('coupy', 25),
        salelbanel: new FreeItemCoupon('salelbanel', '01cd0f1cec513a04')
    };


    function getRefundSum() {
        var sum = 0;
        for (var key in couponsDB) {
            sum += getRefundByCode(key);
        }
        return sum;
    }

    function getRefundByCode(code) {

        if (!couponsDB[code] || !couponsDB[code].active){
            return 0;
        }

        if (couponsDB[code] instanceof DiscountCoupon){
            return cart.sumCostTotal() * couponsDB[code].discountPercent / 100;
        }else if (couponsDB[code] instanceof FreeItemCoupon){
            return store.getItemById(couponsDB[code].itemId).getPrice();
        }
        return 0;
    }

    function addCoupon(inputObj) {
        activateCoupon(inputObj.value);
        inputObj.value = '';
    }

    function activateCoupon(code) {
        if (couponsDB[code] && couponsDB[code].active === false) {
            couponsDB[code].active = true;
            console.log('activating coupon');
            //update current refund amount in $ (add property)
            addCouponRow(couponsDB[code]);//draw coupon raw in table
            updateFinalPrice();//update total refund ->update total cost
        }
    }

    return {
        getRefundByCode: getRefundByCode,
        getRefundSum: getRefundSum,
        addCoupon: addCoupon
    };
}());


var tbodyCoupons = document.querySelector('#couponTableBody');
function addCouponRow(couponObj){
    'use strict';
    var tr = document.createElement('div');
    tr.className = 'Row';
    var tdCode = document.createElement('div');
    tdCode.className = 'Cell';
    var tdType = document.createElement('div');
    tdType.className = 'Cell';
    var tdPercent = document.createElement('div');
    tdPercent.className = 'Cell';
    var tdItemName = document.createElement('div');
    tdItemName.className = 'Cell';
    var tdRefund = document.createElement('div');
    tdRefund.className = 'Cell';

    [tdCode, tdType, tdPercent, tdItemName, tdRefund].forEach(function (elemToAppend) {
        tr.appendChild(elemToAppend);
    });

    tdCode.innerText = couponObj.code;
    tdRefund.innerText = coupons.getRefundByCode(couponObj.code).toFixed(2) + '$';
    if (couponObj instanceof DiscountCoupon){

        tdType.innerText = 'Discount';
        tdPercent.innerText = couponObj.discountPercent + '%';
        tdItemName.innerText = '-';

    }else if (couponObj instanceof FreeItemCoupon){

        tdType.innerText = 'Free Item';
        //noinspection Eslint,Eslint,Eslint
        tdPercent.innerText = '-';
        var item = store.getItemById(couponObj.itemId);
        tdItemName.innerText = item.name;
    }
    tbodyCoupons.appendChild(tr);
}

var beforeDiscountCostValueElem = document.querySelector('.beforeDiscountCostValue');
var discountCostValueElem = document.querySelector('.discountCostValue');
var totalCostValueElem = document.querySelector('.totalCostValue');
function updateFinalPrice(){
    'use strict';
    var beforeDiscountCostValue = beforeDiscountCostValueElem.innerText = cart.sumCostTotal();
    var discountCostValue = discountCostValueElem.innerText = coupons.getRefundSum();
    totalCostValueElem.innerText = beforeDiscountCostValue - discountCostValue + '';
}
