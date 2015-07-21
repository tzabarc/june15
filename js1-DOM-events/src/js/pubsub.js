/**
 * Created by tzabarc on 6/30/15.
 */

var events = {};

function subscribe(eType, cb){
    'use strict';
    if (!events[eType]){
        events[eType] = [];
    }
    events[eType] = events[eType].concat(cb);
}

function unsubscribe(eType, cb ){
    'use strict';
    var idx = events[eType].indexOf(cb);
    if (idx >= 0){
        events[eType].splice(idx, 1);
        return true;
    }
    return false;
}

function publish(eType, data){
    'use strict';
    if (events[eType]){
        events[eType].forEach(function (cb) {
            cb(data);
        });
    }
}
