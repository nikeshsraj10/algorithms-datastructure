/**
 * Two strings are anagrams if they are permutations of each other.
 * Given an array of strings, remove each string that is an anagram of an earlier string, then
 * return the remaining array in sorted order.
 */

 funWithAnagrams = text => {
     let map = new Map();
     text.forEach(word => {
         let sortedWord = word.split('').sort().join('');
         if(!map.has(sortedWord))
            map.set(sortedWord, word);
     })
     return [...map.values()].sort();
 }

 let text = ['code','doce', 'ecod', 'framer', 'anagram', 'aaagrnm', 'frame'];

 console.log(funWithAnagrams(text)); 
 //Output: [ 'anagram', 'code', 'frame', 'framer' ]