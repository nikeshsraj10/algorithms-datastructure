/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {
    let count = 0;
    let sum = 0;
    let map = new Map();
    map.set(sum, {start: 0, end:null});
    nums.forEach((value, index) => {
        value === 1 ? sum += 1 : sum -= 1;
        if(map.has(sum)){
            let obj = map.get(sum);
            obj.end = index;
            if(obj.end - obj.start > count){
                count = obj.end - obj.start;
            }
        }else{
            map.set(sum, {start: index + 1, end:null});
        }
    })
    return count !=  0 ? count + 1: count;
};

//In line21, start has been initialized with start + 1 because the the index with which the sum matches is always the next one.
//Also, count + 1 is returned because the arrays are zero indexed