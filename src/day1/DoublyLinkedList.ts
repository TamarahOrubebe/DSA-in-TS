type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>
}


export default class DoublyLinkedList<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;
    

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        const node = { value: item } as Node<T>;
        if (idx > this.length) {
            throw new Error("cannot add new node beyond the length of the list")
        }

        if (idx === 0) {
            this.append(item);
            return;
        }

        if (idx === this.length) {
            this.prepend(item)
            return;
        }

        this.length++;
        const curr = this.getAtIdx(idx);
        node.next = curr;
        node.prev = curr?.prev as Node<T>
        node.prev.next = node;
        if (curr?.prev) {
            curr.prev = node;
        }

    }


    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++
        if (!this.tail) {
            this.head = this.tail = node;
            return
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next
        }
        
        if (!curr) {
            return undefined;
        }
        
        if (this.length === 0) {
            const output = this.head?.value;
            this.head = this.tail = undefined;
            return output;
        }

        if (curr?.prev) {
            curr.prev.next = curr.next;
            
        }
        
        if (curr?.next) {
            curr.next.prev = curr.prev;
        }

        if (curr === this.head) {
            this.head = curr.next;
        }

        if (curr === this.tail) {
            this.tail = curr.prev
        }

        curr.prev = curr.next = undefined;
        return curr.value;
    }
    get(idx: number): T | undefined {
        return this.getAtIdx(idx)?.value;
    }

    private getAtIdx(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr;
    }

    removeAt(idx: number): T | undefined {

}
}