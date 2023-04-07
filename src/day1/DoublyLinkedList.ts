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
        const node = { value: item } as Node<T>;
        const curr = this.getAtIdx(idx) as Node<T>
        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;
        if (node.prev) {
            node.prev.next = node;
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
            curr = curr.next;
        }

        if (!curr) {
            return undefined;
        }


        return this.removeNode(curr);    
        
    }
    get(idx: number): T | undefined {
        return this.getAtIdx(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAtIdx(idx);

        if (!node) {
            return undefined
        }

        return this.removeNode(node)
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;

        if (this.length === 0) {
            const output = this.head?.value;
            this.head = this.tail = undefined;
            return output;
        }

        if (node?.prev) {
            node.prev.next = node.next;
            
        }
        
        if (node?.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev
        }

        node.prev = node.next = undefined;
        return node.value;
    }
    private getAtIdx(idx: number): Node<T> | undefined {
        let node = this.head;
        for (let i = 0; node && i < idx; i++) {
            node = node.next;
        }
        return node;
    }

    
}