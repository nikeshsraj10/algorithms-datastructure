/**
 * You are given coins of different denominations and a total amount of money amount.
 * Write a function to compute the fewest number of coins that you need to make up that amount.
 * If that amount of money cannot be made up by any combination of the coins, return -1
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    let fewestCoins = new Array(amount + 1).fill(Infinity);
    //Above array will hold fewest coin combination for a given index as amount, we need to calculate fewestCoins[amount + 1] to get our result as arrays are zero indexed
    //Initializing it with max value since we are finding minimum combination possible
    fewestCoins[0] = 0;
    for(let i = 0; i <= amount; i++){
        coins.forEach(coin => {
            if(coin <= i){ // i will be the intermediate amounts and if the coin is greater then amount then it doesnt make sense to calculate
                fewestCoins[i] = Math.min(fewestCoins[i], 1 + fewestCoins[i - coin]);
            }
        })
    }
    console.log(fewestCoins)
    return fewestCoins[amount] === Infinity ? -1 : fewestCoins[amount];
};