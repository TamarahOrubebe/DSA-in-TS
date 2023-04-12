import MinHeap from "./MinHeap";

export default function dijkstras_list(source: number, sink: number, graph: WeightedAdjacencyList): number[] {

    const prev = new Array(graph.length).fill(-1);
    const distances = new Array(graph.length).fill(Infinity);
    const minHeap = new MinHeap();

    distances[source] = 0;
    minHeap.insert(source);

    while (minHeap.length) {
        const curr = minHeap.delete();
        const connections = graph[curr];

        for (let i = 0; i < connections.length; i++) {
            const edge = connections[i];
            const distance = distances[curr] + edge.weight;

            if (distance < distances[edge.to]) {
                distances[edge.to] = distance;
                prev[edge.to] = curr;
                minHeap.insert(edge.to);
            }
            
        }
       
    }

    // walk back to get shortest path to the sink;
    const path: number[] = [];
    let curr: number = sink;

    while (prev[curr] !== - 1) {
        path.push(curr);
        curr = prev[curr];
    }


    path.push(source);
    return path.reverse();

}