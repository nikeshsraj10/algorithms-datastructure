/**
 * Given a string s, return the last substring of s in lexicographical order.
 * @param {string} s
 * @return {string}
 */
var lastSubstring = function(s) {
    let startChar = 0, position = [];
     for(let i = 0; i < s.length; i++){
         if(s.charCodeAt(i) > startChar){
             startChar = s.charCodeAt(i);
             position = [i];
         }else if(s.charCodeAt(i) === startChar)
             position.push(i)
     }
     //position array has position of the lexiographically highest element's positions
     //Found the char at the start of our substring
     if(position.length == 1){
          if(position[0] === 0)
              return s;
          else
              return s.slice(position[0]);
     }
     let curr, globalMax;
     position.forEach(pos => {
         curr = s.slice(pos); 
         if(!globalMax)
             globalMax = curr;
         if(curr > globalMax)
             globalMax = curr;
     });
     return globalMax;
 };