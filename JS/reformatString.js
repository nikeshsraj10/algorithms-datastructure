/**
 * Given alphanumeric string s. You have to find a permutation of the string where 
 * no letter is followed by another letter and no digit is followed by another digit.
 *  That is, no two adjacent characters have the same type. Return an empty string if it is impossible to reformat the string.
 * @param {string} s
 * @return {string}
 */
var reformat = function(s) {
    if(s.length === 1)
        return s;
    //If s has only numbers
    if(!isNaN(s))
        return "";
    //If s has only alphabets
    else if(s.split('').every(char => char.charCodeAt() >= 97 && char.charCodeAt() <= 122))
        return "";
    else{
        let nums = [];
        let chars = [];
        for(let i = 0; i < s.length; i++){
            if(isChar(s[i]))
                chars.push(s[i]);
            else
                nums.push(s[i]);
        } 
        let diff = Math.abs(chars.length - nums.length);
        if(diff <= 1){
            let result = '';
            if(diff === 0)
                for(let i = 0; i < nums.length; i++)
                    result += nums[i] + chars[i];
            else{
                if(nums.length > chars.length){
                    result = constructString(nums, chars);
                }else{
                    result = constructString(chars, nums);
                }
            }
            return result;
        }else{
            //IF there are more numbers to match den chars or viceversa
            return "";
        }
            
    }
};

function isChar(char){
    return char.charCodeAt() >= 97 && char.charCodeAt() <= 122;
}

function constructString(arr1, arr2){
    let str = '';
    let i = 0;
    for( i = 0; i < arr2.length; i++){
        str += arr1[i] + arr2[i];
    }
    str += arr1[i];
    return str;
}