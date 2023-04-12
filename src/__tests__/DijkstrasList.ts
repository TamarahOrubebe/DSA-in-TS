import dijkstras_list from "@code/DijkstrasList";
import { list1 } from "./graph";

test("dijkstras via adj list", function () {
    /// waht?
    // what..
    // what...
    expect(dijkstras_list(0, 6, list1)).toEqual([0, 1, 4, 5, 6]);
});