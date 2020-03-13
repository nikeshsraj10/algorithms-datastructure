class TreeNode{
    constructor(value){
        this.value = value;
        this.left = this.right = this.parent = null;
        this.height = 1;
    }
}

class AVLTree{
    constructor(){
        this.rootNode = null;
    }

    addNode(value){
        let newNode = new TreeNode(value);
        if(!this.rootNode){
            this.rootNode = newNode;
            return;
        }else{
            let tempNode = this.rootNode;
            let prevNode = null;
            //Search for the position where our new node is going to be inserted
            while(tempNode){
                prevNode = tempNode;
                if(value >= tempNode.value)
                    tempNode = tempNode.right;
                else
                    tempNode = tempNode.left
            }
            if(prevNode.value >= value){
                prevNode.left = newNode;
            }else{
                prevNode.right = newNode;
            }
            newNode.parent = prevNode;
            //The node has been inserted at right position
            //Now we have to update the height and check for possible violations
            let violationObj = this.updateHeight(newNode.parent);
            //PATTERN = [1:RR, 2:RL, 3:LL, 4:LR]
            if(violationObj){
                let parent = null;
                switch(violationObj.violationPattern){
                    case 1: {
                        this.L_Rotate(violationObj.node);
                        this.changeHeightOfNode(violationObj.node);
                        parent = violationObj.node.parent;
                        this.changeHeightOfNode(parent);
                    }
                    break;
                    case 2: {
                        let rChild = violationObj.node.right;
                        //R_Roate on RChild of Node
                        this.R_Rotate(rChild);
                        this.changeHeightOfNode(rChild);
                        parent = rChild.parent;
                        this.changeHeightOfNode(parent);
                        //L_Rotate on Node
                        this.L_Rotate(violationObj.node);
                        this.changeHeightOfNode(violationObj.node);
                        parent = violationObj.node.parent;
                        this.changeHeightOfNode(parent);
                    }
                    break;
                    case 3: {
                        this.R_Rotate(violationObj.node);
                        this.changeHeightOfNode(violationObj.node);
                        parent = violationObj.node.parent;
                        this.changeHeightOfNode(parent);
                    }
                    break;
                    case 4: {
                        //L_Rotate on LChild of Node
                        let lChild = violationObj.node.left;
                        this.L_Rotate(lChild);
                        this.changeHeightOfNode(lChild);
                        parent = lChild.parent;
                        this.changeHeightOfNode(parent);
                        //R_Rotate on Node
                        this.R_Rotate(violationObj.node);
                        this.changeHeightOfNode(violationObj.node);
                        parent = violationObj.node.parent;
                        this.changeHeightOfNode(parent);
                    }
                    break;
                }
            }
        }
    }

    changeHeightOfNode(node){
        let [lChildHeight, rChildHeight] = this.getHeights(node);
        if(node && node.height != Math.max(lChildHeight, rChildHeight) + 1)
            node.height = Math.max(lChildHeight, rChildHeight) + 1;
    }

    //Following function updates the height of the tree and checks for any violations
    //PATTERN = [1:RR, 2:RL, 3:LL, 4:LR]
    updateHeight(parentNode){
        while(parentNode){
            let [lChildHeight, rChildHeight] = this.getHeights(parentNode);
            //Updating parents height
            if(parentNode.height !== Math.max(lChildHeight, rChildHeight) + 1)
                parentNode.height = Math.max(lChildHeight, rChildHeight) + 1;
            //Check for Violations
            if(Math.abs(lChildHeight - rChildHeight) > 1){
                //There is a Violation
                let pattern = 0; 
                if(lChildHeight > rChildHeight){
                    //L pattern
                    let [lChildHeight2, rChildHeight2] = this.getHeights(parentNode.left);
                    if(lChildHeight2 >= rChildHeight2)
                        pattern = 3;
                    else
                        pattern = 4;
                }else{
                    //R Pattern
                    let [lChildHeight2, rChildHeight2] = this.getHeights(parentNode.right);
                    if(lChildHeight2 > rChildHeight2)
                        pattern = 2;
                    else
                        pattern = 1;
                }
                return {node: parentNode, violationPattern: pattern};
            }
            parentNode = parentNode.parent;
        }
        return null; //Indicates no violation has occurred
    }

    getHeights(node) {
        let lChildHeight = (node && node.left) ? node.left.height : 0;
        let rChildHeight = (node && node.right) ? node.right.height : 0;
        return [lChildHeight, rChildHeight];
    }

    //Functions for Rotations
    L_Rotate(treeNode){
        treeNode.right.parent = treeNode.parent;
        if(treeNode.parent){
            if(treeNode.parent.left == treeNode)
                treeNode.parent.left = treeNode.right;
            else
                treeNode.parent.right = treeNode.right
        }
        treeNode.parent = treeNode.right;
        treeNode.right = treeNode.parent.left;
        treeNode.parent.left = treeNode;
        if(treeNode == this.rootNode)
            this.rootNode = treeNode.parent
    }

    R_Rotate(treeNode){
        treeNode.left.parent = treeNode.parent;
        if(treeNode.parent){
            if(treeNode.parent.left == treeNode)
                treeNode.parent.left = treeNode.left;
            else
                treeNode.parent.right = treeNode.left
        }
        treeNode.parent = treeNode.left;
        treeNode.left = treeNode.parent.left;
        treeNode.parent.right = treeNode;
        if(treeNode == this.rootNode)
            this.rootNode = treeNode.parent;
    }

    inOrderTraversal(node){
        if(!node)
            return;
        this.inOrderTraversal(node.left);
        console.log(`Value is ${node.value}, height is ${node.height}`);
        this.inOrderTraversal(node.right);
    }
}

//export default AVLTree;
module.exports = {
    AVLTree: AVLTree
}