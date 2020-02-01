var rootToLeafPath = function(root){
    if(root){
        let result = [];
        if(root.left)
            helper(root.left, [root.val], result);
        if(root.right)
            helper(root.right, [root.val], result);
        //console.log(result);
        return result;
    }
}

function helper(node, arr, result){
    arr.push(node.val);
    if(!node.left && !node.right)
        return result.push(arr);
    if(node.left)
        helper(node.left, [...arr], result);
    if(node.right)
        helper(node.right, [...arr], result);
}