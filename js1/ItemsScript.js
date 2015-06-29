/**
 * Created by tzabarc on 6/29/15.
 */
fragment = document.createDocumentFragment();

var tr = document.createComment('tr');
var td = document.createComment('td');

tr.appendChild(td);
fragment.appendChild(tr);

tr.removeChild();