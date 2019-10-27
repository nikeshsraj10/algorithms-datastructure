//Recursively merge sort i numbers starting at node pointed by p 
//Use in-place recursive merge sort
#include <iostream>

using namespace std;


class Node {
public:
	int value;
	Node* next;
	Node(int i) { value = i; next = nullptr; }
	Node() { next = nullptr; }
};

class LinkedList {
public:
	int numNodes;
	Node* head;
	LinkedList() { numNodes = 0; head = nullptr; }
	void makeRandomList(int m, int n);
	void printList();



	//Recursively merge sort i numbers starting at node pointed by p
	void mergeSort(Node*& p, int i);//in-place recursive merge sort


	//Merge i1 numbers starting at node pointed by p1 with i2 numbers
	//starting at node pointed by p2
	void merge(Node*& p1, int i1, Node* p2, int i2);
};

void LinkedList::merge(Node*& p1, int i1, Node* p2, int i2) {
	Node* prev1 = NULL;
	Node* prev2 = NULL;
	Node* ptrHead1 = p1;
	Node* ptrHead2 = p2;
	if (ptrHead1->value > ptrHead2->value) {
		ptrHead2 = ptrHead2->next; //move to next node so as to not lose the link to second list
		p2->next = ptrHead1; // replace the beginning of list1 with first node of list2
		p1 = p2; //replace main head of list to head of second list
		prev1 = p1; //add prev node pointer to new head as the ptrHead1 points to next node to head
		p2 = ptrHead2; // change the head of second list to ptrHead2
	}
	else {
		prev1 = ptrHead1;
		ptrHead1 = ptrHead1->next;
	}
	while (ptrHead1 && ptrHead2) {
		if (ptrHead1->value > ptrHead2->value) {
			prev1->next = ptrHead2;
			ptrHead2 = ptrHead2->next;
			prev1->next->next = ptrHead1;
			prev1 = prev1->next;
		}
		else {
			prev1 = ptrHead1;
			ptrHead1 = ptrHead1->next;
		}
	}
	ptrHead1 = p1;
	while (ptrHead1->next != NULL) {
		ptrHead1 = ptrHead1->next;
	}
	ptrHead1->next = ptrHead2;
	return;
}

void LinkedList::mergeSort(Node*& p, int i) {
	if (p == NULL || p->next == NULL) {
		return;
	}
	else {
		int firsthalfNodes = i / 2; 
		int secondHalfNodes = i - firsthalfNodes; //if odd num of nodes, then the second half will always contain more
		Node* firstHalfHead = p;
		Node* temp = p;
		int count = 1;
		while (count < firsthalfNodes) {
			count++;
			temp = temp->next;
		}
		Node* secondHalfHead = temp->next;
		temp->next = NULL; //Close the first half list

		mergeSort(p, firsthalfNodes);
		mergeSort(secondHalfHead, secondHalfNodes);
		merge(p, firsthalfNodes, secondHalfHead, secondHalfNodes);
	}
}

void LinkedList::makeRandomList(int m, int n) {

	for (int i = 0; i < m; i++) {
		Node* p1 = new Node(rand() % n);
		p1->next = head;
		head = p1;
		numNodes++;
	}
}

void LinkedList::printList() {
	cout << endl;
	Node* p1 = head;
	while (p1 != nullptr) {
		cout << p1->value << " ";
		p1 = p1->next;
	}
}


int main() {

	LinkedList d1;


	d1.makeRandomList(100, 40000);
	d1.printList();

	d1.mergeSort(d1.head, d1.numNodes);
	d1.printList();

	return 0;

}