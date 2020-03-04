/**
 * Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).
 *
 *  Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if(root){
        let queue = new Array();
        //level property is added so that it becomes easy to push to result array
        root.level = 0;
        queue.push(root);
        let result = [];
        while(queue.length > 0){
            let poppedNode = queue.shift();
            //Check if there is an array for that level, if not then create and add the elem to array
            if(result.length !== poppedNode.level + 1)
                result.push([poppedNode.val])
            else{
                //If its odd level then add the newly discovered ele to first place
                if(poppedNode.level % 2 === 1)
                    result[poppedNode.level].unshift(poppedNode.val);
                else
                    result[poppedNode.level].push(poppedNode.val);       
            }

            if(poppedNode.left){
                poppedNode.left.level = poppedNode.level + 1;
                queue.push(poppedNode.left);
            }
            if(poppedNode.right){
                poppedNode.right.level = poppedNode.level + 1;
                queue.push(poppedNode.right);
            }
        }
        return result;
    }else
        return [];
    
};