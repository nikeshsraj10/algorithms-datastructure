/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    let set = new Set();
    wordDict.forEach(word => set.add(word));
    let res = Array(s.length + 1).fill(false);
    res[0] = true; //Suggesting, for an empty string the val is true
    for(let len = 1; len <= s.length; len++){
        for(let i = 0; i < len; i++){
            if(res[i] && set.has(s.slice(i, len))){
                res[len] = true;
                break;
             }
        }
    }
    return res[s.length];
}