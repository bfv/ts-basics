import { LinkedList } from './linkedlist';

export class Queue<T> {

    private list: LinkedList<T>;

    constructor() {
        this.list = new LinkedList<T>();
    }

    offer(element: T): boolean {
        this.list.add(element);
        return true;
    }

    peek(): T {
        return this.list.get();
    }

    poll(): T {
        return this.list.remove();
    }
}
