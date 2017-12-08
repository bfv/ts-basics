
import { LinkedList } from './linkedlist';

export class Set<T> {

    private list: LinkedList<T>;

    constructor() {
        this.list = new LinkedList<T>();
    }

    add(element: T): boolean {

        if (this.contains(element)) {
            return false;
        }

        this.list.add(element);
    }

    contains(element: T) {
        return this.list.contains(element);
    }

    remove(element: T): boolean {
        return this.list.removeElement(element);
    }

    toArray(): Array<T> {
        return this.list.toArray();
    }
}
