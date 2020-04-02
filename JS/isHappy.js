/**
 * @param {number} n
 * @return {boolean}
 */
/**
 * 
 * {A happy number is a number defined by the following process: Starting with any positive integer,
 *  replace the number by the sum of the squares of its digits, and repeat the process until the number
 *  equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. 
 *  Those numbers for which this process ends in 1 are happy numbers.} n 
 */
var isHappy = function(n) {
    if(n){
        let set = new Set(); //map to store new numbers to check if we have a cycle
        let digitArray = String(n).split('');
        let newNum = 0;
        digitArray.forEach((num) => newNum += +num * +num);
        if(newNum == 1)
            return true;
        set.add(+newNum);
        while(newNum != 1){
            digitArray = String(newNum).split('');
            newNum = 0;
            digitArray.forEach((num) => newNum += +num * +num);
            if(newNum == 1)
                return true;
            else if(set.has(+newNum))
                return false; //Cycle detected so return false
            else
                set.add(+newNum);   //Add newNum to set
        }
    }

};