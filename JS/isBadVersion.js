/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let start = 1, end = n;
        mid = fetchMid(start, end);
        let badVersion;
        let loopRuns = 0;
        let badVersionFound = false;
        while(loopRuns < n){
            badVersion = isBadVersion(mid);
            if(badVersion){
                //first bad version will be btw start and mid
                mid--;
                //Keep decreamenting untill good version is found and return mid + 1
                //Can be improved by continuing using Binary Search logic
                while(mid > 0 && isBadVersion(mid))
                    mid--;
                return mid + 1;
            }else{
                //Shows that Mid is not the bad version hence the bad version will be btw mid and end.
                start = mid + 1;
            }
            mid = fetchMid(start, end);
            loopRuns++;
        }
        //NO bad version found and hence the latest version is returned
        //Came to this conclusion after testing with various inputs
        return n;
    
    };
};

function fetchMid(start, end){
    return Math.floor(start + (end - start) / 2);
}
