//Brute Force Algorithm
var longestPalindrome = function(s) {
    let lps = '';
    if(s.split('').reverse().join('') === s)
        return s;
    for(let j = 0; j < s.length; j++){
        for(let i = 0; i < s.length; i++){
            if(j + i > s.length)
                break;
            let str = s.substr(j, i + 1);
            if(str.split('').reverse().join('') === str && str.length > lps.length)
                lps = str;   
        }
    }
    return lps;
};

str = "jglknendplocymmvwtoxvebkekzfdhykknufqdkntnqvgfbahsljkobhbxkvyictzkqjqydczuxjkgecdyhixdttxfqmgksrkyvopwprsgoszftuhawflzjyuyrujrxluhzjvbflxgcovilthvuihzttzithnsqbdxtafxrfrblulsakrahulwthhbjcslceewxfxtavljpimaqqlcbrdgtgjryjytgxljxtravwdlnrrauxplempnbfeusgtqzjtzshwieutxdytlrrqvyemlyzolhbkzhyfyttevqnfvmpqjngcnazmaagwihxrhmcibyfkccyrqwnzlzqeuenhwlzhbxqxerfifzncimwqsfatudjihtumrtjtggzleovihifxufvwqeimbxvzlxwcsknksogsbwwdlwulnetdysvsfkonggeedtshxqkgbhoscjgpiel"
console.log(longestPalindrome(str));

//O(n2) Algorithm
function longestPalindromeSubstring(s){
    if(s == null || s.length === 0)
        return '';
    let start = 0, end = 0;
    for(let i = 0; i < s.length; i++){
        let len1 = lengthOfPalindrome(s, i, i); //Check for odd length Palindrome
        let len2 = lengthOfPalindrome(s, i, i + 1); //Check for even length Palindrome
        let len  = Math.max(len1, len2);
        if(len > end - start){
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len/2);
        }
    }
    //racecar
    return s.substring(start, end + 1);
}

function lengthOfPalindrome(str, left, right){
    if(str == null || str.length === 0)
        return 0;
    while(left >= 0 && right < str.length && str[left] == str[right]){
        left--;
        right++;
    }
    return right - left - 1;
}

//Manacher's Algorithm --> O(n) complexity