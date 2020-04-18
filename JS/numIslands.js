/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    let islands = 0;
    if(grid.length > 0){
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[0].length; j++){
                if(grid[i][j] === '1'){
                    islands += 1
                    //count the island and turn all the land of this island to water
                   dfs(grid, i , j);
                }
            }
        }
    }
    return islands;
};

function dfs(grid, row, col){
    if(row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] === '0')
            return;
    else{
        grid[row][col] = '0';
        //Call DFS across all 4 directions
        dfs(grid, row - 1, col)
        dfs(grid, row + 1, col)
        dfs(grid, row, col - 1)
        dfs(grid, row, col + 1)
    }
}