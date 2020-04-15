/**
 * You are given a string s containing lowercase English letters, and a matrix shift, where shift[i] = [direction, amount]:
 * direction can be 0 (for left shift) or 1 (for right shift). 
 * Return the final string after all operations.
 * @param {string} s
 * @param {number[][]} shift
 * @return {string}
 */
var stringShift = function(s, shift) {
    let rotate = 0;
    shift.forEach(([dir, amount], index) => {
        if(dir === 0)
            rotate -= amount
        else
            rotate += amount;        
    });
    rotate = rotate % s.length;
    //Return Original String if rotate is 0
    if(rotate === 0)
            return s;
        else{
            if(rotate > 0){
                //Right Rotate
                return s.slice(s.length - rotate) + s.slice(0, s.length - rotate);
            }else{
                //Left Rotate
                //Convert the number to positive
                rotate *= -1;
                return s.slice(rotate) + s.slice(0, rotate)
            }
        }
};