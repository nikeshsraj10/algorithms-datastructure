/**
 * @param {number[]} nums
 * @return {number[]}
 */
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