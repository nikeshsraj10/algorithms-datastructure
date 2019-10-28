//Nikesh Shanegere Raj
/*
*Construct a routing table for each node of a digragh, defined in a file called graph.txt, using
*Dijkstra’s shortest path algorithm for each node. (It is possible that more than one edge
*between two nodes.)
*You are required to implement a min_heap for node selection as an intermediate step.
*Follow the required data structures for Graph, Routing_Table, and Heap.
*The format of the input file, graph.txt, is explained in the following example:
*2 //source node
*10 // number of nodes = 10 (labelled 0, 1, 2, …., 9)
*25 //number of directed edges = 25; the next 25 lines define the edges
*1 3 7 //there is an edge from V1 to V3 with a cost of 7
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
	//Do your own constructor(s)
	n_node(int ipid, int ipWeight) {
		id = ipid;
		weight = ipWeight;
	}

	n_node() {
		id = NULL;
		weight = NULL;
	}
};

class rt_node {
public:
	bool is_visited; //true if visited; else false
	int cost; //path cost
	int from; //from node
	int h_pos;//the positon of this node in heap
//Do your own constructor(s)
	rt_node() {
		is_visited = false;
		cost = 99999; //some high value
		from = NULL;
		h_pos = NULL;
	}

	rt_node(int heap_pos) {
		is_visited = false;
		cost = 99999; //some high value
		from = NULL;
		h_pos = heap_pos;
	}

	rt_node(bool is_visited_ip, int cost_ip, int from_ip, int h_pos_ip) {
		is_visited = is_visited_ip;
		cost = cost_ip;
		from = from_ip;
		h_pos = h_pos_ip;
	}
};

class h_node {
public:
	int id;//node id
	int cost; //cost to this node from source
	//Do your own constructor(s)
	h_node() {
		id = NULL;
		cost = 99999;
	}
	h_node(int ip_id) {
		id = ip_id;
		cost = 99999;
	}

	h_node(int ip_id, int ip_cost) {
		id = ip_id;
		cost = ip_cost;
	}
};
void initializeRoutingTable(vector <rt_node>& routingTable, int numOfNodes, int sourceNode);
void initializeHeap(vector <h_node>& heap, int numOfNodes, int sourceNode, vector <rt_node>& routingTable);
void constructRoutingTable(vector <rt_node>& routingTable, vector <h_node>& heap, vector <vector<n_node>* >& graph, int sourceNode);
void constructMinHeap(vector <h_node>& heap, vector <rt_node>& routingTable);
void recursiveHeap(vector <h_node>& heap, int size, int index);
void swapHeapNodes(vector <h_node>& heap, int parentIndex, int childIndex);
void printOutput(vector <rt_node>& routingTable, int sourceNode);

void initializeRoutingTable(vector <rt_node>& routingTable, int numOfNodes, int sourceNode) {
	int iterator{ 0 };
	for (iterator; iterator < routingTable.size(); iterator++) {
		rt_node temp(iterator);
		routingTable[iterator] = temp;
	}
	//Mark source node's cost to be 0 and change is_visited flag value
	routingTable[sourceNode].cost = 0;
	routingTable[sourceNode].is_visited = true;
}

void initializeHeap(vector <h_node>& heap, int numOfNodes, int sourceNode, vector <rt_node>& routingTable) {
	int iterator{ 0 };
	for (iterator; iterator < heap.size(); iterator++) {
		h_node temp(iterator);
		heap[iterator] = temp;
	}
	heap[sourceNode].cost = 0;  //Source node cost should be 0
	constructMinHeap(heap, routingTable);
}

void constructRoutingTable(vector <rt_node>& routingTable, vector <h_node>& heap, vector <vector<n_node>* >& graph, int sourceNode) {
	//Make sure the source node cost n is_visited flag is updated in routing table
	while (heap.size() != 0) {
		//extract the id and cost of the first node in min-heap
		int min_node_id = heap[0].id;
		int min_node_cost = heap[0].cost;
		heap.erase(heap.begin()); // remove the first element of Heap
		//update the cost of nodes which were connected to the removed node
		auto neighbor_vector = *graph[min_node_id];
		int iterator{ 0 };
		for (auto node : neighbor_vector) {
			if ((node.weight + min_node_cost < routingTable[node.id].cost)) {
				routingTable[node.id].cost = node.weight + min_node_cost;
				routingTable[node.id].from = min_node_id;
				routingTable[node.id].h_pos--; //You would have removed the first node
				// And hence the position is being decreased by 1 // <-Explanantion added 1 month after the homework
				heap[routingTable[node.id].h_pos].cost = node.weight + min_node_cost;
				//Update the cost in heap since we construct min heap and select the node with min cost for next iteration
			}
			iterator++;
		}
		/* for (auto row : routingTable) {
			cout << row.cost << '\t' << row.from << '\t' << row.is_visited << endl;
		} */
		routingTable[min_node_id].is_visited = true;
		constructMinHeap(heap, routingTable);
	}
}

void constructMinHeap(vector <h_node>& heap, vector <rt_node>& routingTable) {
	int startIndex = heap.size() / 2 - 1;
	for (int i = startIndex; i >= 0; i--) {
		recursiveHeap(heap, heap.size(), i);
	}
	//Update the heap position in Routing Table
	int iterator{ 0 };
	for (auto heapNode : heap) {
		routingTable[heapNode.id].h_pos = iterator;
		iterator++;
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

void printOutput(vector <rt_node>& routingTable, int sourceNode) {
	int iterator{ 0 };
	for (auto route : routingTable) {
		cout << "The cost from node " << sourceNode << " to node " << iterator << " is " << route.cost
			<< ";from node is " << route.from << endl;
		iterator++;
	}
}

int main() {
	vector <vector<n_node>* > Graph;
	vector <rt_node> Routing_Table;
	vector <h_node> Heap;

	int sourceNode{}, numOfNodes{}, numOfEdges{};

	ifstream  ifs("graph.txt");
	if (!ifs) {
		cerr << "File Not Found";
		exit(1);
	}
	ifs >> sourceNode >> numOfNodes >> numOfEdges; //Get the initial info about the graph
	vector <n_node> temp_objects(numOfEdges); //to store the individual node objects
	vector <vector <n_node> > neighborNodes(numOfNodes); //to store the vectors of each node
	for (int i = 0; i < numOfNodes; i++) {
		Graph.push_back(&neighborNodes[i]);
	}
	//Feteching edge info
	int mainNode{}, connectedNode{}, weight{};
	int iterator = 0;
	while (!ifs.eof()) {
		ifs >> mainNode >> connectedNode >> weight;
		n_node temp_object(connectedNode, weight);
		temp_objects[iterator] = (temp_object);
		neighborNodes[mainNode].push_back(temp_objects[iterator]);
		iterator++;
	}
	Heap.resize(numOfNodes);
	Routing_Table.resize(numOfNodes);
	//Graph has been created
	initializeRoutingTable(Routing_Table, numOfNodes, sourceNode);
	initializeHeap(Heap, numOfNodes, sourceNode, Routing_Table);
	constructRoutingTable(Routing_Table, Heap, Graph, sourceNode);
	printOutput(Routing_Table, sourceNode);
	return 0;
}


