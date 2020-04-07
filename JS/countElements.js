/**
 * Given an integer array arr, count element x such that x + 1 is also in arr.
 * If there're duplicates in arr, count them seperately.
 * @param {number[]} arr
 * @return {number}
 */

//Solution 2 --> Using Maps -- TC O(n) SC O(n) 
var countElements = function(arr) {
    let result = 0;
    let map = new Map();
    arr.forEach(num => {
        if(map.has(num)){
            let val = map.get(num);
            map.set(num, val + 1);
        }else{
            map.set(num, 1)
        }
    });
    console.log(map);
   for([key, value] of map){
       if(map.has(key + 1)){
            result += value;
        }
   }
        
    return result;
}

//Solution 1 --> Sorting the array O(nlogn)
var countElements = function(arr) {
    arr.sort((num1, num2) => {
        if(num1 > num2)
            return 1;
        else if(num1 < num2)
            return -1
        else
            return 0;
    });
    console.log(arr);
    let count = 0;
    let i = 0;
    let j = i + 1; 
    let inter = 1;
    while(i < arr.length && j < arr.length){
        while(j < arr.length && arr[i] === arr[j]){
            inter += 1;
            i += 1;
            j += 1;
        }
        if(j < arr.length && arr[i] === arr[j] - 1){
            count += inter
        }
        inter = 1;
        i = j;
        j = i + 1;
    }
    return count;
};