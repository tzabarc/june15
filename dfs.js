/**
 * Created by tzabarc on 7/15/15.
 */
function runDFS(rootNode, terminationTest, operationFunction){
    // your magic here
    if(terminationTest(rootNode)){
        return;
    }

    operationFunction(key);

    var children = node.childNodes;
    for (var i = 0; i < children.length; i++) {
        runDFS(children[i], terminationTest, operationFunction);
    }



}

function terminateOnUL(node) {
        return node.nodeName === "UL";
}

function operationFunc(node) {
    if (node.type === document.TEXT_NODE)
        textArr.push(node.innerText);

}


var textArr=[];
runDFS(document.body, terminateOnUL, operationFunc);