/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if(head){
        let count = 1;
        let prev = null;
        let slow = head;
        let fast = head.next;
        if(fast)
            head = fast;
        while(slow && fast){
            slow.next = fast.next;
            fast.next = slow;
            if(fast !== head)
                prev.next = fast;
            prev = slow;
            slow = slow.next;
            fast = slow ? slow.next : null;
        }
    }
    return head;
};