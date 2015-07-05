/**
 * Created by tzabarc on 7/5/15.
 */

function Cart(){
    var db={};

    this.totalSize=0;// no of total items

//return no of instances after addition
    this.addItem= function(id){
        if (!db[id])
            db[id]=0;

        db[id]++;
        this.totalSize++;

        return db[id];
    }

//return no of instances after addition
    this.removeItem= function(id){
        if (db[id]>0){
            this.totalSize--;

            db[id]--;
            return db[id];
        }
        return 0;
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

}


