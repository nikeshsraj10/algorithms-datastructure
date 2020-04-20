/**
 * LC 1418 Display Table of Food Orders in a Restaurant
 * @param {string[][]} orders
 * @return {string[][]}
 */
var displayTable = function(orders) {
    let tableNumbers = {};
    let foodItems = new Map();
    orders.forEach(([cName, tableNum, foodItem]) => {
        if(!tableNumbers[tableNum]){
            tableNumbers[tableNum] = {};
        }
         tableNumbers[tableNum][foodItem] = 0;
        if(foodItems.has(foodItem)){
            let val = foodItems.get(foodItem);
            val.push(tableNum);
            foodItems.set(foodItem, val)
        }else{
            foodItems.set(foodItem, [tableNum]);
        }
    });
    for(let [food, tables] of foodItems){
        tables.forEach(table => {
            if(tableNumbers[table])
                tableNumbers[table][food] = +tableNumbers[table][food] + 1
            else
                tableNumbers[table][food] = 1;
        })
    }
    let output = [["Table", ...[...foodItems.keys()].sort()]];
    Object.keys(tableNumbers).forEach(tables => {
        let inter = new Array(output[0].length).fill('0');
        inter[0] = tables
        output.push(inter);
    });
    for(let i = 1; i < output[0].length; i++){
        Object.values(tableNumbers).forEach((obj, index) => {
            if(obj[output[0][i]]){
                output[1 + index][i] = String(obj[output[0][i]]);
            }     
        })
    }
   return output;
};