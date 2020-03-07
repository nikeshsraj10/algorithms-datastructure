/**
 * Given a binary tree, each node has value 0 or 1.  Each root-to-leaf path represents a binary number starting with the most significant bit.
 * For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.
 * For all leaves in the tree, consider the numbers represented by the path from the root to that leaf.
 * Return the sum of these numbers.
 * 
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
var sumRootToLeaf = function(root) {
    let result = [];
    if(root){
        helper(root, [String(root.val)], result);
        return result.reduce((curr, prev) => curr + prev);
    }else{
        return 0;
    }
};

function helper(root, currentArr, result){
    if(!root.left && !root.right)
        return result.push(parseInt(currentArr, 2)); //Convert Binary String to Decimal Int
    if(root.left)
        helper(root.left, currentArr + String(root.left.val), result);
    if(root.right)
        helper(root.right, currentArr + String(root.right.val), result)
    
}