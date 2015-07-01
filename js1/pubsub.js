/**
 * Created by tzabarc on 6/30/15.
 */

var events={};

function subscribe(eType, cb){
    if (!events[eType])
        events[eType] = [];
    events[eType] = events[eType].concat(cb);
}

function unsubscribe(eType, cb ){
    var idx = events[eType].indexOf(cb);
    if (idx>=0){
        events[eType].splice(idx,1);
        return true;
    }
    return false;
}

function publish(eType, data){
    events[eType].forEach(function(cb){
        cb(data);
    })
}
