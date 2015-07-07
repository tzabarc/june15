/**
 * Created by tzabarc on 7/6/15.
 */
/*
 Dynamic iFrame Ex.

 Requirements:
 1. On each link click, update the iFrame with the relevant URL
 */
function updateSrc(e){

    e.preventDefault();
    var ifr=document.querySelector("iframe");
    ifr.src=e.target.href;
}
var anchors=document.querySelectorAll('a');
for(var i=0;i<anchors.length;i++)
    anchors[i].onclick=updateSrc;
