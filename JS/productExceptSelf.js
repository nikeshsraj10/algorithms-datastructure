/**
 * @param {number[]} nums
 * @return {number[]}
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
//Time Complexity O(n) Space Complexity O(n)
var productExceptSelf = function(nums) {
    let firstNProd = new Array(nums.length);
    let lastNProd = new Array(nums.length);
    let temp = 1;
    for(let i = 0; i < nums.length; i++){
        temp *= nums[i];
        firstNProd[i] = temp;
    }
    temp = 1;
    for(let i = nums.length - 1; i >= 0 ; i--){
            temp *= nums[i];
            lastNProd[i] = temp;
    }
    let result = new Array(nums.length);
    for(let i = 0; i < nums.length; i++){
        if(i > 0 && i < nums.length - 1)
            result[i] = firstNProd[i - 1]*lastNProd[i + 1];
        else if(i > 0)
            result[i] = firstNProd[i - 1];
        else
            result[i] = lastNProd[i + 1];
    }
    return result;
};
//Time Complexity O(n2) Space Complexity O(1)
var productExceptSelf = function(nums) {
    let output = new Array(nums.length);
    for(let i = 0; i < nums.length; i++){
        let temp = 1;
        for(let j = 0; j < nums.length; j++){
            if(j !== i){
                if(nums[j] === 0){
                    temp = 0;
                    break;
                }else{
                    temp *= nums[j];
                }                        
            }
        }
        output[i] = temp;
    }
    return output;
};