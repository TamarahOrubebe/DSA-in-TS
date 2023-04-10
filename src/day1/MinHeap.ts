export default class MinHeap {
    public length: number;
    private data: number[];
    

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }
        const output = this.data[0];
        if (this.length === 1) {
            this.length = 0;
            this.data = [];
            return output;
        }

        this.data[0] = this.data[this.length - 1];
        this.length--;
        this.heapifyDown(0);

        return output;

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
            this.data[idx] = rValue;
            this.data[rIdx] = pValue;
            this.heapifyDown(rIdx)
        } else if (rValue > lValue && pValue > lValue) {
            this.data[idx] = lValue;
            this.data[lIdx] = pValue;
            this.heapifyDown(lIdx)
        }

    }
    private heapifyUp(idx: number): void {
        const p = this.getParentIdx(idx);
        const parentValue = this.data[p];
        const currentValue = this.data[idx]

        if (parentValue > currentValue) {
            // we swap the currentValue with the prent to maintain the minHeap structure
            this.data[p] = currentValue;
            this.data[idx] = parentValue;

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