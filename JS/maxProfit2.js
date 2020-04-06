/**
 * Say you have an array for which the ith element is the price of a given stock on day i.
 * Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).
 * You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let i = 0;
    let buy = i;
    let profit = 0;
    if(prices.length > 0){
        while(i + 1 < prices.length){
            if(prices[i] > prices[i + 1] ){
                if(buy !== i)
                    profit = profit + prices[i] - prices[buy];
                buy = i + 1;
            }
            i += 1;
        }
        if(buy !== prices.length - 1)
            profit = profit + prices[prices.length - 1] - prices[buy];
        //Above branch handles corner case where the price is increasing order and never enter branch inside loop
    
    }
        return profit;
};