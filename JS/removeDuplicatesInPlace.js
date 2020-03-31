/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let i = 0;
    let insertPos = i + 1; //Takes care of next position to insert
    while(i < nums.length){
        let j = i + 1;
        while(nums[j] === nums[i]){
            j += 1;
        }
        if(j !== insertPos) //To make sure we are not replacing at the same place
            nums[insertPos] = nums[j];
        i = j;
        insertPos++;
    }
    return insertPos - 1;
};