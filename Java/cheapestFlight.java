//Implements Dijkstra's algorithm
//Time complexity can be improved if we use HashMap instead of List to represent Graph
class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst) {
        List<Integer> routingDistance = new ArrayList<Integer>();
        //Above List store the distance of each node from src, initialize to Inifity so that we find the shortest as we go on
        PriorityQueue<Node> minPathHeap = new PriorityQueue<Node>();
        Set<Integer> visited = new HashSet<Integer>();
        //Adjacency List to represent the graph
        List<List<Node>> graph = new ArrayList<List<Node>>();
        //Initialize the graph to contain "n" entries
        for(int i = 0; i < n; i++){
            List<Node> neighborList = new ArrayList<Node>();
            graph.add(neighborList);
            routingDistance.add(Integer.MAX_VALUE);
        }
        //Construct Graph
        constructGraph(graph, flights);
        if(graph.get(src).size() == 0)
            return -1;
        //Initialize routing distance of source to 0
        routingDistance.set(src, 0);
        minPathHeap.add(new Node(src, 0));
        return findShortestAlgorithm(graph, minPathHeap, visited, routingDistance, dst);
    }
    
    public void constructGraph(List<List<Node>> graph, int[][] flights){
        for(int[] flight: flights){
            //System.out.println(flight[0]);
            graph.get(flight[0]).add(new Node(flight[1], flight[2]));
        }
    }
    
    public int findShortestAlgorithm(List<List<Node>> graph, PriorityQueue<Node> minPathHeap, Set<Integer> visited, List<Integer> routingDistance, int dst){
        while(minPathHeap.size() > 0){
            Node removedNode = minPathHeap.poll();
            if(!visited.contains(removedNode.id)){
                //Add the node to visited set
                visited.add(removedNode.id);
                //Add the node's neighbors to Heap
                List<Node> neighbors = graph.get(removedNode.id);
                for(int i = 0; i < neighbors.size(); i++){
                    Node neighbor = neighbors.get(i);
                    if(!visited.contains(neighbor.id)){
                        int weight = neighbor.weight;
                        int removedNodeDistance = routingDistance.get(removedNode.id);
                        //Check if the new route to neighbor is shorter than the exisiting one, if it is then update in the distance array
                        if(removedNodeDistance != Integer.MAX_VALUE &&  removedNodeDistance + weight < routingDistance.get(neighbor.id))
                            routingDistance.set(neighbor.id, removedNodeDistance + weight);
                        else
                            routingDistance.set(neighbor.id, weight);
                        minPathHeap.add(new Node(neighbor.id, routingDistance.get(neighbor.id)));
                        //System.out.println(routingDistance);
                    }
                }
            }
            if(visited.contains(dst))
                return routingDistance.get(dst);
        }
        return -1;
    }
}

class Node implements Comparable<Node>{
    public int id;
    public int weight;
    Node(int id, int weight){
        this.id = id;
        this.weight = weight;
    }
    @Override
    public int compareTo(Node node){
        return this.weight - node.weight;
    }
    
    @Override
    public String toString(){
        return this.id + " " + this.weight;
    }
}

