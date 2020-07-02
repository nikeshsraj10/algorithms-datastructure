/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        LinkedList<List<Integer>> result = new LinkedList();
        if(root != null){
            Queue<TreeNode> nodes = new LinkedList();
            nodes.add(root);
            while(nodes.size() > 0){
                final int len = nodes.size();
                List<Integer> temp = new ArrayList(); 
                for(int i = 0; i < len; i++){
                    TreeNode popped = nodes.poll();
                    temp.add(popped.val);
                    if(popped.left != null)
                        nodes.add(popped.left);
                    if(popped.right != null)
                        nodes.add(popped.right);
                }
                result.addFirst(temp);
            }
        }
        return result;
    }
}