
/**
 * Find the sum of all left leaves in a given binary tree.
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
    let sum = {val: 0}
    
    if(!root)
        return sum.val;
    helper(root.left,sum, true);
    helper(root.right, sum, false);
    return sum.val;
};

function helper(node, sum, left){
    if(!node)
        return;
    else if(left && !node.left && !node.right){
        sum.val += node.val;
        helper(node.left, sum, true)
        helper(node.right, sum, false)
    }else{
        helper(node.left, sum, true);
        helper(node.right, sum, false);
    }
        
}

/**
 * Invert a binary tree.
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if(root){
        helper(root);
    }
    return root;
};

function helper(node){
    if(!node)
        return;
    [node.left, node.right] = [node.right, node.left];
    helper(node.left);
    helper(node.right);
}

/**
 * Given a binary tree, return the level order traversal of its nodes' values.
 *  (ie, from left to right, level by level).
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    let result = [];
    let queue = new Array();
    if(root){
        result.push([root.val])
        queue.push(root);
        let intermediate = [];
        //BFS procedure followed to solve the sum
        while(queue.length > 0 || intermediate.length > 0){
            let pushToOutput = [];
            let isNull = true;
            if(queue.length === 0){ //Indicates one level nodes are done and intermediate has all the nodes of that level
                intermediate.forEach(node => {
                    if(node !=  null)
                        isNull = false; 
                    if(node){
                        pushToOutput.push(node.val);
                        queue.push(node);
                    }       
                })
                if(isNull) //if isNull becomes true then it indicates we are done with sweeping the whole tree
                  break;
                intermediate = []; //Empty the intermediate array so that we can store next nodes of next level
                result.push(pushToOutput);
            }
            let poppedNode = queue.shift(); //Get the first element out 
            if(poppedNode){
                intermediate.push(poppedNode.left ? poppedNode.left : null)
                intermediate.push(poppedNode.right ? poppedNode.right : null)
            }else{
                break;
            } 
        }
    }
    return result;
    
};

//BT = [1,2,3,4,5,6,7]
//Output = [[1], [2, 3], [4,5,6,7]]
