//Nikesh Shanegere Raj
//73266-7953

#include <iostream> //to use cout
#include <algorithm> //to use max function such as  i = max(a, b);

using namespace std;

//You need to use the following node class for each node of the AVL tree
class node {
public:
	int value;
	int height;//this is tree height. Leaf node is 1; empty node (i.e., NIL) is 0
	node* parent;
	node* l_child;
	node* r_child;
	node() {}
	node(int i) { value = i; height = 1; parent = l_child = r_child = nullptr; }

};

class avl_tree {
public:
	node* root;
	avl_tree() {
		root = nullptr;
	}

	//************************************************************************************
	//Implement the following member functions
	void add_node(int i);
	//if case of a tie, add i to the last of existing nodes with value i in the in-order sequence

	void delete_node(int i);
	//Delete the node with value i.
	//in case of multiple nodes with value i, delete the first node with value i in the in-order traveral sequence


	void in_order_traversal(node* p); //such as 2 5 9 11 11 14 15 15 ...

	pair<node*, int> height_update(node* p);
	/*
	This function will be invoked by add_node and delete_node.
	p points to the first node that we need to check for possible height update.
	We then need to check possible height update toward root.
	All nodes whose heights need to be updated will be performed in this function.
	The function returns a pair.  If no imbalance is detected, the first of the pair will be nullptr;
	otherwise it will be the address of the action node.
	The second of the pair will be 0 if no imbalance is detected;
	otherwise its value is 1,2,3,4 for RR RL, LL, and LR pattern, respectively.
	*/

	void L_Rotate(node* p);
	//p points to the node at which the rotation will be performed.

	void R_Rotate(node* p);
	//p points to the node at which the rotation will be performed.
};

void avl_tree::add_node(int i) {
	if (!root) {
		root = new node(i);
	}
	else {
		node* newNode = new node(i);
		node* currentNode = root;
		node* prevNode = nullptr;
		while (currentNode) {
			prevNode = currentNode;
			if (i >= currentNode->value)
				currentNode = currentNode->r_child;
			else
				currentNode = currentNode->l_child;
		}
		if (i >= prevNode->value)
			prevNode->r_child = newNode;
		else
			prevNode->l_child = newNode;
		newNode->parent = prevNode;
		pair<node*, int> ruleViolationDetails = height_update(prevNode);
		//Check the first of ruleViolationDetails and map accordingly
		//if its null, tree is balanced else check for the second and perform required rotations
		if (ruleViolationDetails.first) {
			//1,2,3,4 for RR RL, LL, and LR
			node* par = nullptr;
			switch (ruleViolationDetails.second) {
			case 1: {
				L_Rotate(ruleViolationDetails.first);
				//Update height after Rotation
				if (ruleViolationDetails.first->height != max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
					ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1)
					ruleViolationDetails.first->height = max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
						ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1;
				par = ruleViolationDetails.first->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;
			}
				  break;
			case 2: {
				node* rightChild = ruleViolationDetails.first->r_child;
				R_Rotate(ruleViolationDetails.first->r_child);

				if (rightChild->height != max(rightChild->l_child ? rightChild->l_child->height : 0, rightChild->r_child ? rightChild->r_child->height : 0) + 1)
					rightChild->height = max(rightChild->l_child ? rightChild->l_child->height : 0, rightChild->r_child ? rightChild->r_child->height : 0) + 1;
				par = rightChild->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;

				L_Rotate(ruleViolationDetails.first);

				if (ruleViolationDetails.first->height != max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
					ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1)
					ruleViolationDetails.first->height = max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
						ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1;
				par = ruleViolationDetails.first->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;
			}
				  break;
			case 3: {
				R_Rotate(ruleViolationDetails.first);

				if (ruleViolationDetails.first->height != max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
					ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1)
					ruleViolationDetails.first->height = max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
						ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1;
				par = ruleViolationDetails.first->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;
			}
				  break;
			case 4: {
				node* leftChild = ruleViolationDetails.first->l_child;
				L_Rotate(ruleViolationDetails.first->l_child);

				if (leftChild->height != max(leftChild->l_child ? leftChild->l_child->height : 0, leftChild->r_child ? leftChild->r_child->height : 0) + 1)
					leftChild->height = max(leftChild->l_child ? leftChild->l_child->height : 0, leftChild->r_child ? leftChild->r_child->height : 0) + 1;
				par = leftChild->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;

				R_Rotate(ruleViolationDetails.first);
				if (ruleViolationDetails.first->height != max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
					ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1)
					ruleViolationDetails.first->height = max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
						ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1;
				par = ruleViolationDetails.first->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;

			}
				  break;
			default: {}
			}
		}
	}
}

void avl_tree::delete_node(int i) {
	node* temp = root;
	node* deleteNode = nullptr;
	node* prevNode = nullptr;
	while (temp) {
		if (temp->value == i) {
			//Check if there are more nodes with same value
			if (temp->l_child) {
				while (temp->l_child && temp->l_child->value == i)
					temp = temp->l_child;
			}
			deleteNode = temp;
			break;
		}
		else if (i > temp->value)
			temp = temp->r_child;
		else
			temp = temp->l_child;
	}
	if (deleteNode != nullptr && deleteNode == root && deleteNode->height == 1) {
		root = nullptr;
		delete deleteNode;
		return;
	}
	if (deleteNode != nullptr && deleteNode->height == 1) {
		prevNode = deleteNode->parent;
		if (prevNode->l_child && prevNode->l_child->value == i) {
			prevNode->l_child = nullptr;
		}
		else {
			prevNode->r_child = nullptr;
		}
		delete deleteNode;
	}
	else if (deleteNode != nullptr && deleteNode->height == 2) {
		int rChildHeight = deleteNode->r_child ? deleteNode->r_child->height : 0;
		int lChildHeight = deleteNode->l_child ? deleteNode->l_child->height : 0;
		if (rChildHeight > lChildHeight) {
			deleteNode->value = deleteNode->r_child->value;
			deleteNode = deleteNode->r_child;
			prevNode = deleteNode->parent;
			prevNode->r_child = nullptr;
			if (deleteNode == root)
				root = prevNode;
			delete deleteNode;
		}
		else if (lChildHeight > 0) {
			deleteNode->value = deleteNode->l_child->value;
			deleteNode = deleteNode->l_child;
			prevNode = deleteNode->parent;
			prevNode->l_child = nullptr;
			if (deleteNode == root)
				root = prevNode;
			delete deleteNode;
		}
	}
	else if (deleteNode != nullptr) {
		//Find Predecessor or Successors depending on TreeHeight
		if (deleteNode->r_child->height > deleteNode->l_child->height) {
			//Find Successor
			node* dRChild = deleteNode->r_child;
			while (dRChild->l_child) {
				dRChild = dRChild->l_child;
			}
			deleteNode->value = dRChild->value;
			deleteNode = dRChild;
			if (dRChild->height == 1) {
				deleteNode->parent->l_child = nullptr;
			}
			else {
				//It is parent of leaf node, so replace with its leaf node and den delete
				//In Successor, this case will have a child to its right.
				dRChild = dRChild->r_child;
				deleteNode->value = dRChild->value;
				deleteNode->r_child = nullptr;
				deleteNode = dRChild;
			}
		}
		else {
			//Find Predecessor
			node* dLChild = deleteNode->l_child;
			while (dLChild->r_child)
				dLChild = dLChild->r_child;
			deleteNode->value = dLChild->value;
			deleteNode = dLChild;
			if (dLChild->height == 1) {
				deleteNode->parent->r_child = nullptr;
			}
			else {
				//In predecessor, this case will have a child to its left.
				dLChild = dLChild->l_child;
				deleteNode->value = dLChild->value;
				deleteNode->l_child = nullptr;
				deleteNode = dLChild;
			}
		}
		prevNode = deleteNode->parent;
		delete deleteNode;
	}
	pair<node*, int> ruleViolationDetails = height_update(prevNode);
	//if Violation, Rotate, Fix and adjust heights **else do nothing as the heights are updated in height_update method**
	if (ruleViolationDetails.first) {
		//There is a violation after delete, hence check recursively for the violation once the rotations are done
		//as violation propogates in delete
		while (ruleViolationDetails.first) {
			//1,2,3,4 for RR RL, LL, and LR
			node* par = nullptr;
			switch (ruleViolationDetails.second) {
			case 1: {
				L_Rotate(ruleViolationDetails.first);
				//Update height after Rotation
				if (ruleViolationDetails.first->height != max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
					ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1)
					ruleViolationDetails.first->height = max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
						ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1;
				par = ruleViolationDetails.first->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;
			}
				  break;
			case 2: {
				node* rightChild = ruleViolationDetails.first->r_child;
				R_Rotate(ruleViolationDetails.first->r_child);

				if (rightChild->height != max(rightChild->l_child ? rightChild->l_child->height : 0, rightChild->r_child ? rightChild->r_child->height : 0) + 1)
					rightChild->height = max(rightChild->l_child ? rightChild->l_child->height : 0, rightChild->r_child ? rightChild->r_child->height : 0) + 1;
				par = rightChild->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;

				L_Rotate(ruleViolationDetails.first);

				if (ruleViolationDetails.first->height != max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
					ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1)
					ruleViolationDetails.first->height = max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
						ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1;
				par = ruleViolationDetails.first->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;
			}
				  break;
			case 3: {
				R_Rotate(ruleViolationDetails.first);
				if (ruleViolationDetails.first->height != max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
					ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1)
					ruleViolationDetails.first->height = max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
						ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1;
				par = ruleViolationDetails.first->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;
			}
				  break;
			case 4: {
				node* leftChild = ruleViolationDetails.first->l_child;
				L_Rotate(ruleViolationDetails.first->l_child);

				if (leftChild->height != max(leftChild->l_child ? leftChild->l_child->height : 0, leftChild->r_child ? leftChild->r_child->height : 0) + 1)
					leftChild->height = max(leftChild->l_child ? leftChild->l_child->height : 0, leftChild->r_child ? leftChild->r_child->height : 0) + 1;
				par = leftChild->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;

				R_Rotate(ruleViolationDetails.first);
				if (ruleViolationDetails.first->height != max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
					ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1)
					ruleViolationDetails.first->height = max(ruleViolationDetails.first->l_child ? ruleViolationDetails.first->l_child->height : 0,
						ruleViolationDetails.first->r_child ? ruleViolationDetails.first->r_child->height : 0) + 1;
				par = ruleViolationDetails.first->parent;
				if (par && par->height != max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1)
					par->height = max(par->l_child ? par->l_child->height : 0, par->r_child ? par->r_child->height : 0) + 1;

			}
				  break;
			default: {}
			}
			if (ruleViolationDetails.first->parent && ruleViolationDetails.first->parent->parent)
				ruleViolationDetails = height_update(ruleViolationDetails.first->parent->parent);
			else
				ruleViolationDetails.first = nullptr;
		}
	}
}

pair<node*, int> avl_tree::height_update(node* p) {
	while (p) {
		if (p->height != max(p->l_child ? p->l_child->height : 0, p->r_child ? p->r_child->height : 0) + 1)
			p->height = max(p->l_child ? p->l_child->height : 0, p->r_child ? p->r_child->height : 0) + 1;
		int lChildHeight1 = p->l_child ? p->l_child->height : 0;
		int rChildHeight1 = p->r_child ? p->r_child->height : 0;
		if (abs(lChildHeight1 - rChildHeight1) > 1) {
			//AVL Tree height property violation has occurred
			int pattern;
			if (lChildHeight1 > rChildHeight1) {
				//L
				int lChildHeight2 = p->l_child->l_child ? p->l_child->l_child->height : 0;
				int rChildHeight2 = p->l_child->r_child ? p->l_child->r_child->height : 0;
				if (lChildHeight2 >= rChildHeight2)
					pattern = 3; //LL
				else
					pattern = 4; //LR
			}
			else {
				//R
				int lChildHeight2 = p->r_child->l_child ? p->r_child->l_child->height : 0;
				int rChildHeight2 = p->r_child->r_child ? p->r_child->r_child->height : 0;
				if (rChildHeight2 >= lChildHeight2)
					pattern = 1; //RR
				else
					pattern = 2; //RL
			}
			return make_pair(p, pattern);;
		}
		p = p->parent;
	}
	return make_pair(nullptr, 0);
}

void avl_tree::L_Rotate(node* p) {
	node* rChild = p->r_child;
	if (rChild) {
		rChild->parent = p->parent;
		if (p != root) {
			if (p->parent->value > rChild->value)
				p->parent->l_child = rChild;
			else
				p->parent->r_child = rChild;
		}
		else {
			root = rChild;
		}
		p->parent = rChild;
		p->r_child = rChild->l_child;
		rChild->l_child ? (rChild->l_child->parent = p) : (rChild->l_child = nullptr);
		rChild->l_child = p;
	}
}

void avl_tree::R_Rotate(node* p) {
	node* lChild = p->l_child;
	if (lChild) {
		lChild->parent = p->parent;
		if (p != root) {
			if (p->parent->value > lChild->value)
				p->parent->l_child = lChild;
			else
				p->parent->r_child = lChild;
		}
		else {
			root = lChild;
		}
		p->parent = lChild;
		p->l_child = lChild->r_child;
		lChild->r_child ? (lChild->r_child->parent = p) : (lChild->r_child = nullptr);
		lChild->r_child = p;
	}

}

void avl_tree::in_order_traversal(node* p) {
	if (!p)
		return;
	in_order_traversal(p->l_child);
	cout << "(" << p->value << ", " << p->height << ") ";
	in_order_traversal(p->r_child);
}

int main() {
	//Different test cases will be used during grading.
	avl_tree t1;
	t1.add_node(10);
	t1.add_node(20);
	t1.add_node(30);
	t1.add_node(15);
	t1.add_node(45);
	t1.add_node(60);
	t1.add_node(35);
	t1.add_node(75);
	t1.add_node(55);
	t1.in_order_traversal(t1.root);
	cout << endl;
	t1.delete_node(75); //Delete Leaf Node, no violation
	t1.in_order_traversal(t1.root);
	cout << endl;
	t1.delete_node(10); //Delete Parent of Leaf Node, 1 violation
	t1.in_order_traversal(t1.root);
	cout << endl;
	t1.add_node(65);
	t1.add_node(70);
	t1.add_node(75);
	t1.add_node(80);
	t1.add_node(85);
	t1.add_node(90);
	t1.in_order_traversal(t1.root);
	cout << endl;
	t1.delete_node(15);
	t1.add_node(20);
	t1.in_order_traversal(t1.root);
	cout << endl;
	t1.add_node(45);
	t1.add_node(45);
	t1.in_order_traversal(t1.root);
	cout << endl;
	getchar();
	getchar();
	return 0;
}