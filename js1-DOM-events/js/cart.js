/**
 * Created by tzabarc on 7/5/15.
 */

function Cart(items){
    var db={};

    var totalSize=0;// no of total items

    //return no of instances after addition
    this.addItem= function(id){
        if (!db[id])
            db[id]=0;

        db[id]++;
        totalSize++;

        return db[id];
    }

    //return no of instances after addition
    this.removeItem= function(id){
        if (db[id]>0){
            totalSize--;
            db[id]--;
            if (db[id]==0)
                delete db[id];

        }
        return db[id] || 0;
    }

    //returns object with items in cart; "id":number
    this.getCart= function(){
        return db;
    }

    //erase cart
    this.erase= function(){
        db={};
    }

    //returns no of unique items
    this.uniqueSize=function(){
        return Object.keys(db).length;
    }

    this.numOfItems = function(id){
        return db[id] || 0;
    }

    this.sumCostById = function(id){
        if(id && !db[id]){
            return 0;
        }

        for(var i=0;i<items.length;i++){
            if(items[i].id == id)
                return this.numOfItems(id) * parseInt(items[i].price,10);
        }
    }

    this.sumCostTotal = function(){
        var sum=0;

        for(var id in db){
            sum+= this.sumCostById(id);
        }
        return sum;
    }
}


