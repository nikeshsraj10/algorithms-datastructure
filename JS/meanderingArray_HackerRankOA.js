function meanderingArray(unSortedArray){
    unSortedArray.sort((num1, num2) => {
        if(num1 > num2)
            return 1;
        return -1;
    });
    let result = [];
    while(unSortedArray.length > 0){
        result.push(unSortedArray.pop());
        result.push(unSortedArray.shift());
    }
    return result;
}