/**
 * Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * You must do this in-place without making a copy of the array.
 * Minimize the total number of operations.
 */
var moveZeroes = function(nums) {
    let i = 0;
    let j = i + 1;
    while(j < nums.length){
        if(nums[i] === 0){
            while(j < nums.length && nums[j] === 0){
                j += 1;
            }
            if(j < nums.length)
                [nums[i], nums[j]] = [nums[j], nums[i]];
            j = j + 1;
        }else{
            j += 1;
        }
        i += 1;
    }
};