/**
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

var diameterOfBinaryTree = function(root) {
    var diameter ={val: 0}; //Object because we have to pass it by reference so that we can compare values
    if(!root || (!root.left && !root.right))//Tree has 0 or 1 Nodes 
        return 0;
    height(root, diameter);
    return diameter.val - 1;
};

function height(root, diameter){
    if(!root)
        return 0;
    let leftHeight = height(root.left, diameter);
    let rightHeight = height(root.right, diameter)
    diameter.val = Math.max(diameter.val, 1 + leftHeight + rightHeight);
    return 1 + Math.max(leftHeight, rightHeight);
}