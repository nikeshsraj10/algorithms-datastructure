/**
 * Given an array of strings, group anagrams together.
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    if(strs.length > 0){
         let map = new Map();
        strs.forEach((word, index) => {
            let key = word.split('').sort().join('');
            if(map.has(key)){
                let value = [...map.get(key), word];
                map.set(key, value);
            }else{
                map.set(key, [word]);
            }
        });
        console.log(map);
        return [...map.values()];   
    }else
        return []
};

let input = ["eat", "tea", "tan", "ate", "nat", "bat"];
//Expected Output
/*
* [
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
*/
console.log(groupAnagrams(input));