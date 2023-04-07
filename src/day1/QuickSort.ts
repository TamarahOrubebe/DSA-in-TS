function qs(arr: number[], lo: number, hi: number) {
    if (lo >= hi) {
        return;
    }

    const pivot = partition(arr, lo, hi)

    qs(arr, lo, pivot - 1);
    qs(arr, pivot + 1, hi);
}

// the partition function is to get the index of the pivot. 
function partition(arr: number[], lo: number, hi: number) {
    // get the pivot for comaprison to know when to swap elements
    const pivot = arr[hi];

    // start idx at -1 and increment by 1 when a swap would be done.
    let idx = -1;

    for (let i = 0; i < hi; i++) {
        const temp = arr[i];
        if (arr[i] <= pivot) {
            idx++;
            arr[i] = arr[idx];
            arr[idx] = temp;
        }
    }

    // we need to put the pivot element at its correct index;
    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    return idx;
}


export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}