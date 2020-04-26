/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if(x === 0)
        return 0;
    else{
        //Implement Binary Search here
        let left = 0;
        let right = x;
        let mid = Math.floor(left + (right - left) / 2);
        while(left <= right){
            if(mid === Math.floor(x / mid))
                return mid;
            else if(mid > Math.floor(x / mid))
                right = mid - 1;
            else
                left = mid + 1;
            mid = Math.floor(left + (right - left) / 2);
        }
        return mid;
    }
};