/**
 * Given an array of integers nums, you start with an initial positive value startValue.
 * In each iteration, you calculate the step by step sum of startValue plus elements in nums (from left to right).
 * Return the minimum positive value of startValue such that the step by step sum is never less than 1.
 * @param {number[]} nums
 * @return {number}
 */
var minStartValue = function(nums) {
    if(nums.every((num) => num > 0))
        return 1;
    else{
        //There are negative numbers
        let minSum = 0;
        let sum = 0;
        nums.forEach(num => {
           sum += num;
            if(sum < minSum)
                minSum = sum;
        })
    return Math.abs(minSum) + 1;
    }
};