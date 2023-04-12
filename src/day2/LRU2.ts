type Node<V> = {
    value: V;
    next?: Node<V>;
    prev?: Node<V>;
}

function createNode<V>(value: V): Node<V> {
    return { value };
};

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V> | undefined;
    private tail?: Node<V> | undefined;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;
    

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // check if the node exists;
            // if not create it, prepend it and trim the cache;
            // else 
                // detach it, prepend it and update its value;


        let node = this.lookup.get(key);
        if (!node) {
            node = createNode(value);
            this.prepend(node);
            this.length++;
            this.trimCache();
            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        }

        this.detach(node);
        this.prepend(node);
        node.value = value;
    }
    get(key: K): V | undefined {
        // check if a node exists 
            // if not return undefined;
            // if it does move it to the front
            // return its value
        const node = this.lookup.get(key);
        if (!node) {
            return;
        }

        this.detach(node);
        this.prepend(node);

        return node.value;
    }

    private detach(node: Node<V>): void {

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

         if (this.head === node) {
            this.head = this.head.next;
         }
        
        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = undefined;
        node.prev = undefined;
        

        
    }


    private prepend(node: Node<V>): void {
        
        if (!this.head) {
            this.head = this.tail = node;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }

        const tail = this.tail as Node<V>
        this.detach(this.tail as Node<V>)
        const key = this.reverseLookup.get(tail) as K;
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        this.length--;

    }
}