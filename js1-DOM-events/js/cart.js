/**
 * Created by tzabarc on 7/5/15.
 */

function Cart(){
    var db={};

    totalSize=0;// no of total items

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
        if (id)
            return db[id] || 0;
        else
            return totalSize;
    }

    this.sumCost = function(id){
        var sum=0;
        if(id && !db[id]){
            return 0;
        }

        for(var i=0;i<items.length;i++){
            if(id){
                if(items[i].id == id)
                    return this.numOfItems(id) * parseInt(items[i].price,10);
            }
            else{
                sum+= this.numOfItems(id) * parseInt(items[i].price,10);// big big problem
            }

        }

        return sum;
    }
}


