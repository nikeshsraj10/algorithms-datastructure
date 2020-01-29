rankIndex = (values, rank) => {
    let result = [];
    values.forEach(value => {
        result.push(value.reduce((a, b) => a + b));
    });
    let resultantMap = new Map();
    result.forEach((value, index) => {
        resultantMap.set(index, value);
    });
    return [...resultantMap.entries()].sort((a, b) => {
        if(a[1] > b[1])
            return -1;
        else if(a[1] < b[1])
            return 1;
        else{
            //Equal marks case
            if(a[0] > b[0])
                return 1;
            else
                return -1;
        }
    })[rank - 1][0];
}

let marks = [
    [99,97,98,93],
    [71,65,98,82],
    [95,94,91,85],
    [85,77,97,99],
    [86,98,75,90]
]

console.log(rankIndex(marks, 2)); //Returns index of 2nd rank