export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
    // base cases
    // structural check
    // you have got to the end where both trees cannot keep recursing meaning they are the same shape
    if (a === null && b === null) {
        return true;
    }

    // structural check
    // you have got to the end and one tree cannot recurse but the other can continue means they are not the  
    // same shape
    if (a === null || b === null) {
        return false;
    }

    // value check
    if (a.value !== b.value) {
        return false
    }

    return compare(a.left, b.left) && compare(a.right, b.right)
}