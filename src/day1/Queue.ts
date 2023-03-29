type Node<T> = {
    value: T,
    next?: Node<T>
}

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;
    

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

        enqueue(item: T): void {

    }
    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        
        this.length--;
        const head = this.head;
        this.head = this.head.next;

        // free in other languages that do not have garbage collection
        head.next = undefined;

        return head.value;

    }

    peek(): T | undefined {
            return this.head?.value;
    }
}