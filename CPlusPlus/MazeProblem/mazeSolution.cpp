//Nikesh Shanegere Raj
//Solve the maze using both BFS and DFS
#include <iostream>
#include <fstream>
#include <vector>
#include <stack>
#include <queue>
#include <string>
#include <bitset>

using namespace std;

class cell {
public:
	int id;
	int wall;
	bool visited;
	bool in_structure;
	int from;

	cell() {
		id = NULL;
		wall = 0;
		visited = false;
		in_structure = false;
		from = -1;
	}

	cell(int ip_id, int ip_wall) {
		id = ip_id;
		wall = ip_wall;
		visited = false;
		in_structure = false;
		from = -1;
	}

	cell(int ip_id, int ip_wall, bool ip_visited, bool ip_in_structure) {
		id = ip_id;
		wall = ip_wall;
		visited = ip_visited;
		in_structure = ip_in_structure;
	}
};

void DFS(vector <cell> &maze, int n, int start, int end);
void BFS(vector <cell> &maze, int n, int start, int end);
void printSolution(vector <cell>& maze, int start, int end);
void printMaze2d(vector <cell> maze, int start, int end);

void DFS(vector <cell> &maze, int n, int start, int end) {
	int numOfCellsPerRow = sqrt(n);
	stack <cell> traverseGraph;
	traverseGraph.push(maze[start]);
	maze[start].in_structure = true;
	while (!traverseGraph.empty() && (maze[end].in_structure != true)) {
		int topId = traverseGraph.top().id;
		maze[topId].visited = true;
		traverseGraph.pop();
		//Use topId to extract neighbors of popped element
		//mark in_structure & from for those neighbors
		//If one of the nieghbors is the "end" then come out of the loop
		string poppedElemWall = bitset<4>(maze[topId].wall).to_string();
		if (poppedElemWall[3] == '0' && ((maze.size() > topId + numOfCellsPerRow) 
			&& maze[topId + numOfCellsPerRow].in_structure != true && maze[topId + numOfCellsPerRow].visited != true)) {
				traverseGraph.push(maze[topId + numOfCellsPerRow]);
				maze[topId + numOfCellsPerRow].in_structure = true;
				maze[topId + numOfCellsPerRow].from = topId;

		}
		if (poppedElemWall[2] == '0' && (maze.size() > topId + 1 && maze[topId + 1].in_structure != true
			&& maze[topId + 1].visited != true)) {
			traverseGraph.push(maze[topId + 1]);
			maze[topId + 1].in_structure = true;
			maze[topId + 1].from = topId;
		}
		if (poppedElemWall[1] == '0' && ((topId - numOfCellsPerRow >= 0 && maze.size() > topId - numOfCellsPerRow)
			&& maze[topId - numOfCellsPerRow].in_structure != true && maze[topId - numOfCellsPerRow].visited != true)) {
			traverseGraph.push(maze[topId - numOfCellsPerRow]);
			maze[topId - numOfCellsPerRow].in_structure = true;
			maze[topId - numOfCellsPerRow].from = topId;
		}
		if (poppedElemWall[0] == '0' && ((topId - 1 >= 0 && maze.size() > topId - 1) && maze[topId - 1].in_structure != true
			&& maze[topId - 1].visited != true)) {
			traverseGraph.push(maze[topId - 1]);
			maze[topId - 1].in_structure = true;
			maze[topId - 1].from = topId;
		}

	}
	cout << "Using DFS:" << endl;
	if (maze[end].in_structure == true) {
		printSolution(maze, start, end);
		cout << endl;
	}
	else cout << "No Solution" << endl;
}

void BFS(vector <cell> &maze, int n, int start, int end) {
	int numOfCellsPerRow = sqrt(n);
	queue <cell> traverseGraph;
	traverseGraph.push(maze[start]);
	maze[start].in_structure = true;
	while (!traverseGraph.empty() && (maze[end].in_structure != true)) {
		int topId = traverseGraph.front().id;
		maze[topId].visited = true;
		traverseGraph.pop();
		//Use topId to extract neighbors of popped element
		//mark in_structure & from for those neighbors
		//If one of the nieghbors is the "end" then come out of the loop
		string poppedElemWall = bitset<4>(maze[topId].wall).to_string();
		if (poppedElemWall[3] == '0' && ((maze.size() > topId + numOfCellsPerRow)
			&& maze[topId + numOfCellsPerRow].in_structure != true && maze[topId + numOfCellsPerRow].visited != true)) {
			traverseGraph.push(maze[topId + numOfCellsPerRow]);
			maze[topId + numOfCellsPerRow].in_structure = true;
			maze[topId + numOfCellsPerRow].from = topId;
		}
		if (poppedElemWall[2] == '0' && (maze.size() > topId + 1 && maze[topId + 1].in_structure != true
			&& maze[topId + 1].visited != true)) {
			traverseGraph.push(maze[topId + 1]);
			maze[topId + 1].in_structure = true;
			maze[topId + 1].from = topId;
		}
		if (poppedElemWall[1] == '0' && ((topId - numOfCellsPerRow >= 0 && maze.size() > topId - numOfCellsPerRow)
			&& maze[topId - numOfCellsPerRow].in_structure != true && maze[topId - numOfCellsPerRow].visited != true)) {
			traverseGraph.push(maze[topId - numOfCellsPerRow]);
			maze[topId - numOfCellsPerRow].in_structure = true;
			maze[topId - numOfCellsPerRow].from = topId;
		}
		if (poppedElemWall[0] == '0' && ((topId - 1 >= 0 && maze.size() > topId - 1) && maze[topId - 1].in_structure != true
			&& maze[topId - 1].visited != true)) {
			traverseGraph.push(maze[topId - 1]);
			maze[topId - 1].in_structure = true;
			maze[topId - 1].from = topId;
		}

	}

	cout << "Using BFS:" << endl;
	if (maze[end].in_structure == true) {
		printSolution(maze, start, end);
		cout << endl;
	}
	else cout << "No Solution" << endl;
}

void printSolution(vector <cell>& maze, int start, int end) {
	if (end == start) {
		cout << start;
		return;
	}
	else printSolution(maze, start, maze[end].from);
	cout << "->" << end;
}

void printMaze2d(vector <cell> maze, int start, int end) {
	int cellsPerRow = sqrt(maze.size());
	vector <vector <char>> maze2d(cellsPerRow);
	char sym = '+';
	for (auto& i : maze2d) {
		i = vector <char>(cellsPerRow);
		for (auto& j : i) {
			j = sym;
		}
	}
	sym = 'v';
	while (end != start) {
		int row = end / cellsPerRow;
		int column = end % cellsPerRow;
		maze2d[row][column] = sym;
		int prevEnd = end;
		end = maze[end].from;
		if (prevEnd - end == cellsPerRow) {
			sym = 'v';
		}else if (prevEnd - end == -cellsPerRow) {
			sym = '^';
		}else if (prevEnd - end == 1) {
			sym = '>';
		}else {
			sym = '<';
		}

	}
	int row = start / cellsPerRow;
	int column = start % cellsPerRow;
	maze2d[row][column] = sym;
	for (auto i : maze2d) {
		for (auto j : i) {
			cout << j << " ";
		}
		cout << endl;
	}
}


int main() {

	int numOfCells{ 0 }, startingCell{ 0 }, targetCell{ 0 };
	ifstream ifs("maze.txt");

	ifs >> numOfCells >> startingCell >> targetCell;
	vector <cell> maze(numOfCells);
	int iterator{ 0 }, wall{ 0 };
	while (!ifs.eof()) {
		ifs >> wall;
		cell temp(iterator, wall);
		maze[iterator++] = temp;
	}
	DFS(maze, numOfCells, startingCell, targetCell);
	//printMaze2d(maze, startingCell, targetCell);
	//Reset the values of from, in_structure and visited flags of all cells
	for (auto &ind_cell : maze) {
		ind_cell.from = -1;
		ind_cell.in_structure = false;
		ind_cell.visited = false;
	}
	BFS(maze, numOfCells, startingCell, targetCell);
	//Below method prints the BFS solution for the Maze 
	cout << "BFS 2D Solution for the Maze:" << endl;
	printMaze2d(maze, startingCell, targetCell);
	return 0;
}

