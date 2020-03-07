/**
 * Given a list of daily temperatures T, return a list such that, for each day in the input,
 *  tells you how many days you would have to wait until a warmer temperature.
 *  If there is no future day for which this is possible, put 0 instead.
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
    let result = new Array(T.length).fill(0);
    for(let i = 0; i < T.length; i++){
        if(i == T.length - 1)
            break;
        for(let j = i + 1; j < T.length; j++){
            if(T[j] > T[i]){
                result[i] = (j - i);
                break;
            }
        }
    }
    return result;
};

let T = [73, 74, 75, 71, 69, 72, 76, 73]; //Output should be  [1, 1, 4, 2, 1, 1, 0, 0]
let res = dailyTemperatures(T);
console.log(res);

//Using Stacks
var dailyTemperaturesStack = function(T) {
    let result = new Array(T.length).fill(0);
    let stack = new Array();
    for(let i = 0; i < T.length; i++){
        while(stack.length > 0 && T[i] > T[stack[0]]){
            idx = stack.shift();
            result[idx] = i - idx;
        }
        stack.unshift(i);
    }
    return result;
};