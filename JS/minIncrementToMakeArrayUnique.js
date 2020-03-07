/**
 * Given an array of integers A, a move consists of choosing any A[i], and incrementing it by 1.
 * Return the least number of moves to make every value in A unique
 * @param {number[]} A
 * @return {number}
 */
var minIncrementForUnique = function(A) {
    if(A.length === 0)
        return 0;
    //Sort the numbers in increasing order
    A.sort((a, b) => a > b ? 1 : -1);
    let temp = new Set();
    console.log(A);
    let moves = 0;
    while(A.length > 0){
        let removedEle = A.shift();
       // console.log(removedEle);
        while(temp.has(removedEle)){
            moves += 1;
            removedEle += 1;
           // console.log(removedEle);
        }
        temp.add(removedEle); 
    }
    return moves;
}