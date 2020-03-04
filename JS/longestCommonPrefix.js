/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length > 0){

        console.log(strs);
        let minLength = strs.reduce((a, b) => a.length < b.length ? a : b).length;
        let commonPrefix = new Map();
        strs.forEach((word, index) => {
            for(let i = 0; i < minLength; i++){
                let requiredKey = word[i] + String(i);
                let letterStatus = commonPrefix.has(requiredKey);
                if(index > 0 && !letterStatus){
                    minLength = i;
                    break;
                }
                if(letterStatus){
                    let val = commonPrefix.get(requiredKey);
                    commonPrefix.set(requiredKey, val + 1);
                }
                 else
                     commonPrefix.set(requiredKey, 1);
            }   
        })
        console.log(commonPrefix, minLength);
        let result = minLength > 0 ? [...commonPrefix.keys()].map(ele => ele[0]).slice(0, minLength).join('') : '';
        return result;
    }
    return '';
};

const strs = ["flower","flow","flight", 'flint'];
//const strs = ["dog","racecar","car"]
//const strs = Array(10).fill('00');
//const strs = ['aaa', 'aa', 'aaaaaaaaaaaa', 'aaa', 'aaaaaa'];

console.log(longestCommonPrefix(strs));