
import { LinkedList } from './linkedlist';

export class Stack<T> {

    get empty(): boolean {
        return (this.list.size === 0);
    }

    get size(): number {
        return this.list.size;
    }

    private list: LinkedList<T>;

    constructor() {
        this.list = new LinkedList<T>();
    }

    peek(): T {
        return this.list.last.value;
    }

    pop(): T {
        return this.list.removeLast();
    }

    push(element: T) {
        this.list.add(element);
    }

}
