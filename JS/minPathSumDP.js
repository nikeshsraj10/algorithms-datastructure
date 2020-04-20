/**
 * Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    if(grid.length > 0){
        let dp = new Array(grid.length).fill(0).map(arr => new Array(grid[0].length).fill(0));
        //dp array will be used to calculate the minimum sum possible to get to any co-ordinate i , j
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[0].length; j++){
                //Add the cells value
                dp[i][j] += grid[i][j];
                //Check the values of above and left cell as oly 2 directions are permitted and add the minimum of 2 values
                if(i - 1 >= 0 && j - 1 >= 0)
                    dp[i][j] += Math.min(dp[i - 1][j], dp[i][j - 1]);
                else if(i - 1 >= 0)
                    dp[i][j] += dp[i - 1][j]
                else if(j - 1 >= 0)
                    dp[i][j] += dp[i][j - 1]
            }
        }
        return dp[grid.length - 1][grid[0].length - 1];
    }
};