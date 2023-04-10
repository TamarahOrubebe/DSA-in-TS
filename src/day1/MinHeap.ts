export default class MinHeap {
    public length: number;
    private data: number[];
    

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {

    }
    delete(): number {

    }

    private heapifyDown(idx: number): void {
        const lIdx = this.getLeftChildIdx(idx);
        const rIdx = this.getRightChildIdx(idx);

        if (lIdx >= this.length || idx >= this.length) {
            return;
        }

        const lValue = this.data[lIdx];
        const rValue = this.data[rIdx];
        const pValue = this.data[idx]

        // check the smallest of the children and swap that one with the parent. 
        // after the swap, call the heapifyDown() again to continue.
        if (lValue > rValue && pValue > rValue) {
            [this.data[idx], this.data[rIdx]] = [this.data[rIdx], this.data[idx]] 
            this.heapifyDown(rIdx)
        } else if (rValue > lValue && pValue > lValue) {
            [this.data[idx], this.data[lIdx]] = [this.data[lIdx], this.data[idx]] 
            this.heapifyDown(lIdx)
        }

    }
    private heapifyUp(idx: number): void {
        const p = this.getParentIdx(idx);
        const parentValue = this.data[p];
        const currentValue = this.data[idx]

        if (parentValue > currentValue) {
            // we swap the currentValue with the prent to maintain the minHeap structure
            [this.data[idx], this.data[p]] = [this.data[p], this.data[idx]];

            // call the heapifyUp func to continue swapping until the minimum value is at the top.
            this.heapifyUp(p)
        }
    }

    private getParentIdx(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private getLeftChildIdx(idx: number): number {
        return idx * 2 + 1;
    }
    private getRightChildIdx(idx: number): number {
        return idx * 2 + 2;
    }

    
}