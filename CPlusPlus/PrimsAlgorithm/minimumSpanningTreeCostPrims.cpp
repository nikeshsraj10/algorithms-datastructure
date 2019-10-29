//Nikesh Shanegere Raj
//Implementation of Prim’s algorithm with the help of min-heap
/*
*The format of the input file, graph.txt, is explained in the following example:
*2 //source node
*10 // number of nodes = 10 (labelled 0, 1, 2, …., 9)
*25 //number of directed edges = 25; the next 25 lines define the edges
*1 3 7 //there is an edge from V1 to V3 with a cost of 7, Since it is bidirectional, create another edge 3 1 7
*5 2 1 //there is an edge from V5 to V2 with a cost of 1
*/
#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>

using namespace std;


class n_node { //stand for neighbor_node
public:
	int id;  //neighbor id
	int weight; //edge weight
	n_node(int ipid, int ipWeight) {
		id = ipid;
		weight = ipWeight;
	}

	n_node() {
		id = NULL;
		weight = NULL;
	}
};

class visited_node {
public:
	int id;
	bool is_visited;

	visited_node() {
		id = NULL;
		is_visited = false;
	}

	visited_node(int ip_id) {
		id = ip_id;
		is_visited = false;
	}

	visited_node(int ip_id, bool ip_is_visited) {
		id = ip_id;
		is_visited = ip_is_visited;
	}
};

class h_node {
public:
	int node1_id;//node id
	int node2_id;
	int cost; //cost to this node from source

	h_node() {
		node1_id = NULL;
		node2_id = NULL;
		cost = 99999;
	}

	h_node(int ip_id1, int ip_id2, int ip_cost) {
		node1_id = ip_id1;
		node2_id = ip_id2;
		cost = ip_cost;
	}
};

void constructMinHeap(vector <h_node>& heap);
void recursiveHeap(vector <h_node>& heap, int size, int index);
void swapHeapNodes(vector <h_node>& heap, int parentIndex, int childIndex);
void initializeCheckVisitedStructure(vector <visited_node>& checkVisited);
void pushElementsToHeap(vector <h_node>& heap, vector <n_node>& neighbors, int mainNode);
void constructMinimumSpanningTree(vector <vector<n_node>* >& graph, vector <h_node>& heap,
	vector <h_node>& minimumSpanningTree, vector <visited_node>& checkVisited, int sourceNode);


void constructMinHeap(vector <h_node>& heap) {
	int startIndex = heap.size() / 2 - 1;
	for (int i = startIndex; i >= 0; i--) {
		recursiveHeap(heap, heap.size(), i);
	}
}

void recursiveHeap(vector <h_node>& heap, int size, int index) {
	int smallest = index;
	int left = 2 * index + 1;
	int right = 2 * index + 2;

	if (left < size && heap[left].cost < heap[smallest].cost)
		smallest = left;

	if (right < size && heap[right].cost < heap[smallest].cost)
		smallest = right;

	if (smallest != index) {
		swapHeapNodes(heap, smallest, index);

		recursiveHeap(heap, heap.size(), smallest);
	}
}

void swapHeapNodes(vector <h_node>& heap, int parentIndex, int childIndex) {
	auto temp = heap[parentIndex];
	heap[parentIndex] = heap[childIndex];
	heap[childIndex] = temp;
}

void constructMinimumSpanningTree(vector <vector<n_node>* >& graph, vector <h_node>& heap,
	vector <h_node>& minimumSpanningTree, vector <visited_node>& checkVisited, int sourceNode) {
	vector <n_node> sourceNodeNeighbour = *(graph[sourceNode]);
	pushElementsToHeap(heap, sourceNodeNeighbour, sourceNode);
	constructMinHeap(heap);
	//Extracted source node neighbours and formed min_heap
	while (heap.size() != 0) {
		bool node1_visited = checkVisited[heap[0].node1_id].is_visited;
		bool node2_visited = checkVisited[heap[0].node2_id].is_visited;
		//Check if both the nodes are visited OR if both the node_id are same inside first elem of heap
		// If both are ids are same then it means the node is connected to itself
		if (node1_visited == true && node2_visited == true || (heap[0].node1_id == heap[0].node2_id)) {
			heap.erase(heap.begin());
			constructMinHeap(heap);
		}
		else {
			//Even if one the node is not  visited then add it to MST
			minimumSpanningTree.push_back(heap[0]);
			//Adding neighbours of node whose visited flag is false
			if (node1_visited == false) {
				pushElementsToHeap(heap, *(graph[heap[0].node1_id]), heap[0].node1_id);
				checkVisited[heap[0].node1_id].is_visited = true;
			}
			if (node2_visited == false) {
				pushElementsToHeap(heap, *(graph[heap[0].node2_id]), heap[0].node2_id);
				checkVisited[heap[0].node2_id].is_visited = true;
			}
			heap.erase(heap.begin());
			constructMinHeap(heap);
		}
	}
}

void initializeCheckVisitedStructure(vector <visited_node>& checkVisited) {
	for (size_t i = 0; i < checkVisited.size(); i++) {
		visited_node tempObject(i);
		checkVisited[i] = tempObject;
	}
}

void pushElementsToHeap(vector <h_node>& heap, vector <n_node>& neighbors, int mainNode) {
	for (auto node : neighbors) {
		h_node tempObj(mainNode, node.id, node.weight);
		heap.push_back(tempObj);
	}
}

int computeCostAndPrintOutput(vector <h_node> minimumSpanningTree) {
	int MSTCost{ 0 };
	for (auto branch : minimumSpanningTree) {
		cout << branch.node1_id << " " << branch.node2_id << " " << branch.cost << endl;
		MSTCost += branch.cost;
	}
	cout << "The overall cost of the minimum spanning tree is " << MSTCost << endl;
	return MSTCost;
}

int main() {
	vector <vector<n_node>* > Graph;
	vector <h_node> Heap;
	vector <h_node> minimumSpanningTree;
	vector <visited_node> checkVisited;

	int sourceNode{}, numOfNodes{}, numOfEdges{};

	ifstream  ifs("graph.txt");
	if (!ifs) {
		cerr << "File Not Found";
		exit(1);
	}
	ifs >> sourceNode >> numOfNodes >> numOfEdges; //Get the initial info about the graph
	vector <n_node> temp_objects(numOfEdges * 2); //to store the individual node objects
	checkVisited.resize(numOfNodes);
	// multiplied by 2 because its a undirected graph
	vector <vector <n_node> > neighborNodes(numOfNodes); //to store the vectors of each node
	for (int i = 0; i < numOfNodes; i++) {
		Graph.push_back(&neighborNodes[i]);
	}
	//Feteching edges info
	int mainNode{}, connectedNode{}, weight{};
	int iterator = 0;
	while (!ifs.eof()) {
		ifs >> mainNode >> connectedNode >> weight;
		//node object for mainNode -> connectedNode
		n_node temp_object(connectedNode, weight);
		temp_objects[iterator] = (temp_object);
		neighborNodes[mainNode].push_back(temp_objects[iterator]);
		iterator++;
		//node object for connectedNode -> mainNode
		n_node temp_object2(mainNode, weight);
		temp_objects[iterator] = (temp_object2);
		neighborNodes[connectedNode].push_back(temp_objects[iterator]);
		iterator++;
	}
	//Graph has been created
	initializeCheckVisitedStructure(checkVisited);
	constructMinimumSpanningTree(Graph, Heap, minimumSpanningTree, checkVisited, sourceNode);
	//cout << "Source Node is " << sourceNode << endl;
	int MSTCost{ 0 };
	MSTCost = computeCostAndPrintOutput(minimumSpanningTree);
	return 0;
}


