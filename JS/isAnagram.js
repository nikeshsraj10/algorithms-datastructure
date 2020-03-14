/**
 * Given two strings s and t , write a function to determine if t is an anagram of s.
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length != t.length)
        return false;
    if(s === '' && t === '')
        return true;
    let map = new Map();
    for(let i = 0; i < s.length; i++){
        if(map.has(s[i])){
            let val = map.get(s[i]);
            map.set(s[i], val + 1);
        }else{
            map.set(s[i], 1);
        }
    }
    for(let i = 0; i < t.length; i++){
        if(map.has(t[i])){
            let val = map.get(t[i]);
            map.set(t[i], val - 1);
        }else{
            map.set(t[i], -1);
        }
    }
    return [...map.values()].every((val) => val === 0);
};

