/**
 * Given an array of integers, return indices of the two numbers such that they add
 *  up to a specific target.You may assume that each input would have exactly one solution,
 *  and you may not use the same element twice.
 * 
*/
var twoSum = function(nums, target) {
    let map = new Map();
     nums.forEach((num, index) => {
         map.set(num, index);
     })
     
     for(let i = 0; i < nums.length; i++){
         if(map.has(target - nums[i]) && map.get(target - nums[i]) != i){
             return [map.get(target - nums[i]), i]
         }
     }
 };
/* 
We need to find out the maximum difference (which will be the maximum profit) between two
 numbers in the given array. Also, the second number (selling price)
  must be larger than the first one (buying price).
*/

var maxProfit = function(prices) {
    let profit = 0;
    for(let i = 0; i < prices.length; i++){
        for(let j = i + 1; j < prices.length; j++){
            if(prices[j] > prices[i] && profit < prices[j] - prices[i]){
                        profit = prices[j] - prices[i]
                    }
                }
         }
    return profit;
};
//Brute Force ^^^^
//O(n) vvvv
maxProfitOn = (prices) => {
    if(prices.length == 0 || prices.length == 1)
        return 0;
    let minPrice = Infinity;
    let maxProfit = 0;
    prices.forEach(price => {
        if(price < minPrice)
            minPrice = price;
        else if(price - minPrice > maxProfit)
            maxProfit = price - minPrice;
    })
    return maxProfit;
}

/*
You are given two non-empty linked lists representing two non-negative integers.
The digits are stored in reverse order and each of their nodes contain a single digit. 
Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let result = l1;
      while(l1.next && l2.next){
          l1.val = l1.val + l2.val;
          if(l1.val > 9){
              l1.val = l1.val % 10;
              l1.next.val = l1.next.val + 1;
          }
          l1 = l1.next;
          l2 = l2.next;
      }
    if(!l1.next && !l2.next){
        //When the current nodes are last of existing nodes in both lists
        l1.val = l1.val + l2.val;
        if(l1.val > 9){
            l1.val = l1.val % 10;
            l1.next = new ListNode(1);
        }
    }else if(l2.next){
        //l1 has no next but l2 has more nodes
        //Add the current node values and then add the l2 to its next
        l1.val = l1.val + l2.val;
        if(l1.val > 9){
            l1.val = l1.val % 10;
            l2.next.val = l2.next.val + 1;
            if(l2.next.val > 9){
                if(l2.next.next){
                    let holdL2 = l2.next;
                    while(l2.next.next && l2.next.next.val >= 9){
                        l2.next.val = l2.next.val % 10;
                        l2.next.next.val = l2.next.next.val + 1;
                        l2 = l2.next;
                    }
                    if(l2.next.val > 9 && !l2.next.next){
                        l2.next.val = l2.next.val % 10;
                        l2.next.next = new ListNode(1);
                    }else if(l2.next.val > 9){
                        l2.next.val = l2.next.val % 10;
                        l2.next.next.val = l2.next.next.val + 1;
                    }
                    l1.next = holdL2;
                }else{
                    l2.next.val = l2.next.val % 10;
                    l2.next.next = new ListNode(1);
                    l1.next = l2.next;
                }
            }else{
                l1.next = l2.next;
            }
        }else{
                l1.next = l2.next;
        }
    }else{
        //l1 has more nodes but l2 has no next
        //Add the current node values to l1 and the return l1
        l1.val = l1.val + l2.val;
        if(l1.val > 9){
            l1.val = l1.val % 10;
            l1.next.val = l1.next.val + 1;
            if(l1.next.val > 9){
                if(l1.next.next){
                    while(l1.next.next && l1.next.next.val >= 9){
                        l1.next.val = l1.next.val % 10;
                        l1.next.next.val = l1.next.next.val + 1;
                        l1 = l1.next;
                    }
                    if(l1.next.val > 9 && !l1.next.next){
                        l1.next.val = l1.next.val % 10;
                        l1.next.next = new ListNode(1);
                    }else if(l1.next.val > 9){
                         l1.next.val = l1.next.val % 10;
                         l1.next.next.val = l1.next.next.val + 1;
                    }
                }else{
                    l1.next.val = l1.next.val % 10;
                    l1.next.next = new ListNode(1);
                }
            }
        }
    }
    return result;
};
// Merge two sorted lists
var mergeTwoLists = function(l1, l2) {
    let result;
    if(!l1)
        return l2;
    else if(!l2)
        return l1
    if(l1.val <= l2.val){
        result = l1;
        l1 = l1.next;
    }else{
        result = l2;
        l2 = l2.next;
    }
    let resRef = result;
    while(l1 && l2){
        if(l1.val <= l2.val){
            result.next = l1;
             l1 = l1.next;
        }else{
            result.next = l2;
            l2 = l2.next;
        }
        result = result.next;
    }
    if(l2){
        result.next = l2;
    }else if(l1){
        result.next = l1;
    }
    return resRef;
};
/*
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.
*/
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let complement = new Map([[')', '('], ['}', '{'], [']', '[']]);
    if(s.length == 0)
        return true;
    if(s.length % 2 === 1)
        return false;
    let lastChar = s[s.length - 1];
    if(lastChar == '(' || lastChar == '[' || lastChar == '{')
        return false;
    let stack = new Array();
    while(s){
        if(lastChar == '(' || lastChar == '[' || lastChar == '{'){
            if(lastChar == complement.get(stack[stack.length - 1]))
                stack.pop();
            else
                return false;
        }
        else
            stack.push(lastChar);
        s = s.slice(0, -1);
        lastChar = s[s.length - 1];
    }
    
    return true;
};