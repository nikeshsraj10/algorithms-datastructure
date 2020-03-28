//Problem Statement
//Given a binary tree, return the inorder traversal of its nodes' values.
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    var output = [];
    intermediateMethod(root, output)
    return output;
};
function intermediateMethod(root, output){
    if(root != null){
        intermediateMethod(root.left, output);
        output.push(root.val)
        intermediateMethod(root.right, output)
    }
    
}