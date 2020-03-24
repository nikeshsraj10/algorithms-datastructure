/**
 * @param {number[]} height
 * @return {number}
 */
//O(n) Solution
var maxArea = function(height) {
    if(height.length == 2)
        return 1 * Math.min(...height);
    else{
        let largestBlock;
        let i = 0, j = height.length - 1;
        let maxArea = 0;
        while(j !== i){
            let width = j - i;
            let h = Math.min(height[i], height[j]);
            let area = width * h;
            if(area > maxArea)
                maxArea = area;
            height[j] > height[i] ? i++ : j--;
        }
        return maxArea;
    }
        
};
//O(n2) Solution
var maxAreaBF = function(height) {
    if(height.length == 2)
        return 1 * Math.min(...height);
    else{
       let maxArea = 0;
       for(let j = height.length - 1; j >= 0; j--){
           for(let i = 0; i < j; i++){
               let width = j - i;
               let h = Math.min(height[j], height[i]);
               let area = width * h;
               if(area > maxArea)
                   maxArea = area;
           }
       }
        return maxArea;
    }
};