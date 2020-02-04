
/**
 * Given a string, find the length of the longest substring without repeating characters.
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let map = new Map();
    let len = 0;
    for(let i = 0, j = 0; i < s.length; i++){
        j = i;
        while(!map.has(s[j]) && j < s.length)
            map.set(s[j], j++);
        i = map.get(s[j]);
        len = map.size > len ? map.size : len;
        map.clear()
    }
    return len;
};