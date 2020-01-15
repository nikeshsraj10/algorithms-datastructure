function longestCommonSubsequence(a, b) {
    //Construct the table to find the length of LCS
    let lcsTable = [];
    for(let i = 0; i < a.length + 1; i++){
        lcsTable[i] = [];
        for(let j = 0; j < b.length + 1; j++)
            lcsTable[i].push(0)
    }
    for(let i = 0; i < a.length + 1; i++){
        for(let j = 0; j < b.length + 1; j++){
            if(i === 0 || j === 0)
                lcsTable[i][j] = 0;
            else if(a[i - 1] == b[j - 1])
                lcsTable[i][j] = 1 + lcsTable[i -1][j - 1];
            else
                lcsTable[i][j] = Math.max(lcsTable[i - 1][j], lcsTable[i][j - 1]);
        }
    }
   // console.table(lcsTable);
   let result = []; 
   //Reconstruct  the LCS from lcsTable
    function reconstructLCS(n, m){
        if(n == 0 || m == 0)
            return [];
        else if(a[n - 1] == b[m - 1])
            return reconstructLCS(n - 1, m - 1) + result.push(b[m - 1]);
        else if(lcsTable[n][m] == lcsTable[n][m - 1])
            return reconstructLCS(n, m - 1);
        else
            return reconstructLCS(n-1, m);
            
    }
    reconstructLCS(a.length, b.length);
   // console.log(result);
    return result;
}

a = [1, 2, 3, 4, 1];
b = [3, 4, 1, 2, 1, 3];
/*
a = [ 3, 9, 8, 3, 9, 7, 9, 7, 0 ];
b = [ 3, 3, 9, 9, 9, 1, 7, 2, 0, 6 ];
*/
/*a = [
    "16",
    "27",
    "89",
    "79",
    "60",
    "76",
    "24",
    "88",
    "55",
    "94",
    "57",
    "42",
    "56",
    "74",
    "24",
    "95",
    "55",
    "33",
    "69",
    "29",
    "14",
    "7",
    "94",
    "41",
    "8",
    "71",
    "12",
    "15",
    "43",
    "3",
    "23",
    "49",
    "84",
    "78",
    "73",
    "63",
    "5",
    "46",
    "98",
    "26",
    "40",
    "76",
    "41",
    "89",
    "24",
    "20",
    "68",
    "14",
    "88",
    "26"
  ]
  b = [
    "27",
    "76",
    "88",
    "0",
    "55",
    "99",
    "94",
    "70",
    "34",
    "42",
    "31",
    "47",
    "56",
    "74",
    "69",
    "46",
    "93",
    "88",
    "89",
    "7",
    "94",
    "41",
    "68",
    "37",
    "8",
    "71",
    "57",
    "15",
    "43",
    "89",
    "43",
    "3",
    "23",
    "35",
    "49",
    "38",
    "84",
    "98",
    "47",
    "89",
    "73",
    "24",
    "20",
    "14",
    "88",
    "75"
  ];
  */
 c = 'abcdaf';
 d = 'acbcf'
console.log(longestCommonSubsequence(c,d));