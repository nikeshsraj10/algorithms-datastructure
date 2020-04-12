/**
 * 
 * @param {number} finalAmount 
 * @param {array} coins 
 * @return {number} 
 */
function totalCombinations(finalAmount, coins){
    let result = new Array(finalAmount + 1).fill(0);
    result[0] = 1;
    coins.forEach(coin => {
        result.forEach((val, amount) => {
            if(amount >= coin){
                result[amount] += result[amount - coin]
            }
        })
    })
    console.log(result);
    return result[finalAmount];
}
//result array will hold the combinations for each amount represented by index
//result[5] will give number of combinations of the given coins to make amount 5
totalCombinations(12, [1,2,5]);