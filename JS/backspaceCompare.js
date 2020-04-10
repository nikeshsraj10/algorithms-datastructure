/**
 * Given two strings S and T, return if they are equal when both are typed into empty text editors. # means a backspace character.
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function(S, T) {
    return backspacedString(S) === backspacedString(T);
};

function backspacedString(S){
    let sArr = [];
    for(let i = 0; i < S.length; i++){
        if(S[i] === '#'){
            sArr.length > 0 ? sArr.pop() : ';'
        }else{
            sArr.push(S[i])
        }
    }
    return sArr.join('');
}