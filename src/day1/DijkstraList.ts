function hasUnvisited(seen: boolean[], distances: number[]): boolean {
    return seen.some((s, i) => !s && distances[i] < Infinity)
}

function getLowestUnvisited(seen: boolean[], distances: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) {
            continue;
        }

        if (lowestDistance > distances[i]) {
            lowestDistance = distances[i];
            idx = i;
        }
    }

    return idx;
}
export default function dijkstra_list(source: number, sink: number, graph: WeightedAdjacencyList): number[] {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);
    const distances: number[] = new Array(graph.length).fill(Infinity);

    distances[source] = 0;


    while (hasUnvisited(seen, distances)) {
        const curr = getLowestUnvisited(seen, distances);

        seen[curr] = true;
        const edges = graph[curr];
        for (let i = 0; i < edges.length; i++) {
            const edge = edges[i];
            if (seen[edge.to]) {
                continue;
            }

            const distance = distances[curr] + edge.weight;
            if (distance < distances[edge.to]) {
                distances[edge.to] = distance;
                prev[edge.to] = curr;
            }
        }
        
    }

    // when the loop above ends, we will have a distances array filled with the shortest distances from
    // the start node to every other node. To get the shortest path between two particular nodes we have to
    // walk back starting from the target node at this point.
    
    const output: number[] = [];
    let curr = sink;
    while (prev[curr] !== -1) {
        output.push(curr);
        curr = prev[curr];
    }

    output.push(source);
    return output.reverse();
}