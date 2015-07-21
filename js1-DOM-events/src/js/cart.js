/**
 * Created by tzabarc on 7/5/15.
 */

function Cart(store){
    'use strict';
    var cartDb = {};

    var totalSize = 0;// no of total items

    //return no of instances after addition
    this.addItem = function (id){
        if (!cartDb[id]){
            cartDb[id] = 0;
        }

        cartDb[id]++;
        totalSize++;

        return cartDb[id];
    };

    //return no of instances after addition
    this.removeItem = function (id){
        if (cartDb[id] > 0){
            totalSize--;
            cartDb[id]--;
            if (cartDb[id] === 0){
                delete cartDb[id];
            }

        }
        return cartDb[id] || 0;
    };

    //returns object with items in cart; "id":number
    this.getCart = function (){
        return cartDb;
    };

    //erase cart
    this.erase = function (){
        cartDb = {};
    };

    //returns no of unique items
    this.uniqueSize = function (){
        return Object.keys(cartDb).length;
    };

    this.numOfItems = function (id){
        return cartDb[id] || 0;
    };

    this.sumCostById = function (id){
        if (id && !cartDb[id]){
            return 0;
        }
        return this.numOfItems(id) * parseInt(store.getItemById(id).getPrice(), 10);
    };

    this.sumCostTotal = function (){
        var sum = 0;

        for (var id in cartDb){
            sum += this.sumCostById(id);
        }
        return sum;
    };
}


