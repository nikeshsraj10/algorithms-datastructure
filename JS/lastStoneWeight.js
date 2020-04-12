/**
 * @param {number[]} stones
 * @return {number}
 */

 //Optimized algorithm using Max Heap O(n * logn) in CPlusPlus
/**
 * 
class Solution {
    public:
        int lastStoneWeight(vector<int>& stones) {
            priority_queue<int> stonesMH;
            for(int ele: stones)
                stonesMH.push(ele);
            while(stonesMH.size() > 1){
                int stone1 = stonesMH.top();
                stonesMH.pop();
                int stone2 = stonesMH.top();
                stonesMH.pop();
                if(stone1 != stone2)
                    stonesMH.push(abs(stone1 - stone2));
            }
            return stonesMH.size() == 1 ? stonesMH.top() : 0;
        }
};
 */

 //O(n * n * logn)
var lastStoneWeight = function(stones) {
    if(stones.length === 1)
        return stones[0];
    sortStones(stones);
    let len = stones.length - 1;
    for(let i = 0; i < len;i++){
        if(stones.length < 2)
            break;
        let stone1 = stones.shift();
        let stone2 = stones.shift();
        stone1 !== stone2 ? stones.push(Math.abs(stone1 - stone2)): '';
        sortStones(stones);
    }
    return stones.length === 1 ? stones[0] : 0;
};


function sortStones(stones){
    stones.sort((num1, num2) => {
        if(num1 > num2)
            return -1;
        else
            return 1;
    });
}