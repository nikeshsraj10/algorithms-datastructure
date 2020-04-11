/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = new Array();
    this.minEle = {value: null, position: null};
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    if(this.minEle.value == null)
        this.minEle = {value: x, position: 0};
    else if(x < this.minEle.value)
        this.minEle = {value: x, position: this.stack.length};
    this.stack.push(x);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if(this.minEle.position == this.stack.length - 1){
        //get new min
        if(this.stack.length === 1){
            //Empty stack
            this.minEle = {value: null, position: null};
        }else{
            let curr = {value: this.stack[0], position: 0};
            this.stack.forEach((val, idx) => {
                if(idx !== 0 && idx != this.stack.length - 1){
                    if(val < curr.value ){
                        curr = {value: val, position: idx};
                    }
                }
                
            });
            this.minEle = curr;
        }
    }
    this.stack.pop();
    
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.minEle.value;
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */