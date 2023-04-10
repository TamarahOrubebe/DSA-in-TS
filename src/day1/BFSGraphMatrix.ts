export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const prev = new Array(graph.length).fill(-1);
    const seen = new Array(graph.length).fill(false);

    const q:  number[]= [source];
    seen[source] = true;


    while (q.length) {
        const curr = q.shift() as number;

        if (curr === needle) {
            break;
        }

        const connections = graph[curr];
        // loop through the connections and 
        for (let i = 0; i < connections.length; i++) {
            // continue if there is no edge
            if (connections[i] === 0) {
                continue;
            }

            if (seen[i] === true) {
                continue;
            }

            seen[i] = true;
            prev[i] = curr;
            q.push(i);
        }

    }

    // build it backwards to -1 to keep track of the path.
    let curr = needle;
    const path: number[] = [];
    while (prev[curr] !== -1) {
        path.push(curr)
        curr = prev[curr];
    }

    if (path.length) {
        return [source].concat(path.reverse());
    }
    
    return null;
}