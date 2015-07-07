/**
 * Created by tzabarc on 7/6/15.
 */
/*
 /*

 JS Bean - Live Editor Ex.

 Requirements
 1. Do not change the HTML/CSS
 2. Inject the given HTML into the iFrame as markup
 3. Inject the given CSS into the iFrame as styles
 4. Make it Live! Changing the HTML/CSS should reflect the result

 Hints:
 1. Inject the styles into a <style> tag in the iframe <head>
 2. To catch textarea changes, use `input` event
 3. You can use one function for both event handlers and the initial injection

 Extra:
 1. Adjust the iFrame height based on it's content's height
 Minimum height should default to 200px

 */

//--------------------------------
// Your code here
//--------------------------------

//var ddd = document.createElement('body');
var ifr= frames[0].document;
ifr.head.innerHTML= "<style></style>";
var framebody = frames[0].document.body;
//var framehead = frames[0].document.head;
//var framestyle = frames[0].document.head.firstElementChild;

var style=document.querySelector('style');
var sd = frames[0].document.querySelector("style");






var contTextArea= document.getElementById("html");
var styleTextArea= document.getElementById("css");


framebody.innerHTML = contTextArea.value;
sd.innerHTML = styleTextArea.value;
