function generateSubstrings(str){
    //Brute Force -> O(n2)
   // let result = new Set();
   let result = []; 
    for(let j = 0; j < str.length; j++){
        for(let i = 0; i < str.length; i++){
            if(j + i > str.length)
                break;
           // result.add(str.substr(j,i+1));
           result.push(str.substr(j,i+1));
        }
    }
    return result;
}

console.log(generateSubstrings('babad'));
