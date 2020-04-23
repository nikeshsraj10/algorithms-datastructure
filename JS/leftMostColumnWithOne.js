/**
 * // This is the BinaryMatrix's API interface.
 * // You should not implement it, or speculate about its implementation
 * function BinaryMatrix() {
 *     @param {integer} x, y
 *     @return {integer}
 *     this.get = function(x, y) {
 *         ...
 *     };
 *
 *     @return {[integer, integer]}
 *     this.dimensions = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {BinaryMatrix} binaryMatrix
 * @return {number}
 */
var leftMostColumnWithOne = function(binaryMatrix) {
    let [rows, cols] = binaryMatrix.dimensions();
    let value;
     //Substitute for row
    let i = 0;
    cols -= 1;
    //Flag to determine if 1 exists in the matrix or not
    let one = false;
    //Start from the top right corner if one is found go left, if zero is found go down
    while(cols >= 0 && i < rows){
        value = binaryMatrix.get(i, cols)
        if(value === 1){
            one = true;
            cols -= 1;
        }
        else
            i += 1;
    }
    return one === true ? cols + 1: -1
};

