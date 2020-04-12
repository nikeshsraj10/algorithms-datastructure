#include <iostream>
#include <vector>
#include <queue>

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