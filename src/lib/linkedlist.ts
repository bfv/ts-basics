
import { Comparable } from './collections';

class ListItem<T> {

    previous: ListItem<T>;
    value: T;
    next: ListItem<T>;

    constructor(prev: ListItem<T>, value: T, next?: ListItem<T>) {
        this.previous = prev;
        this.value = value;

        if (next !== undefined) {
            this.next = next;
        }
    }
}

export class LinkedList<T> implements Iterable<T> {

    // refactor properties get, private set
    first: ListItem<T>;
    last: ListItem<T>;
    size: number = 0;

    add(element: T, position?: number) {

        // default, add last
        if (position === undefined) {
            position = this.size;
        }

        if (position === 0 && this.size > 0) {
            const oldFirst = this.first;

            this.first = new ListItem<T>(null, element, oldFirst);
            if (oldFirst !== undefined) {
                oldFirst.previous = this.first;
            }
        }
        else if (position === this.size) {

            const oldLast = this.last;
            const newItem = new ListItem<T>(oldLast, element);
            this.last = newItem;

            if (oldLast == null) {
                this.first = newItem;
                this.last = newItem;
            }
            else {
                oldLast.next = newItem;
            }
        }
        else {
            const oldItem = this.item(position);
            const newItem = new ListItem<T>(oldItem.previous, element, oldItem);

            oldItem.previous = newItem;
            if (newItem.previous !== undefined) {
                newItem.previous.next = newItem;
            }
        }

        this.size++;
    }

    clear() {

        for (let listItem = this.first; listItem !== undefined;) {
            let next = listItem.next;
            listItem.previous = null;
            listItem.next = null;
            listItem.value = null;
            listItem = next;
        }

        this.first = null;
        this.last = null;
        this.size = 0;
    }

    contains(element: T): boolean {
        for (let item of this) {
            if (item === element) {
                return true;
            }
        }
        return false;
    }

    get(index: number = 0): T {
        return this.item(index).value;
    }

    indexOf(element: T): number {
        let i = 0;
        for (let item of this) {
            if (item === element) {
                return i;
            }
        }
        return -1;
    }

    private item(index: number): ListItem<T> {

        let current: ListItem<T>;

        if (index < (this.size >> 1)) {
            current = this.first;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
        }
        else {
            current = this.last;
            for (let i = this.size - 1; i > index; i--) {
                current = current.previous;
            }
        }

        return current;
    }

    remove(index: number = 0): T {
        return this.removeItem(this.item(index));
    }

    removeElement(element: T): boolean {

        let i = this.indexOf(element);
        if (i < 0) {
            return false;
        }

        this.remove(i);
        return true;
    }

    removeLast(): T {
        return this.remove(this.size - 1);
    }

    private removeItem(elementToRemove: ListItem<T>): T {

        if (elementToRemove === undefined) {
            return null;
        }

        const removeValue: T = elementToRemove.value;

        if (elementToRemove === this.first) {
            this.first = elementToRemove.next;
            if (elementToRemove.next !== undefined) {
                elementToRemove.next.previous = null;
            }
        }
        else if (elementToRemove === this.last) {
            this.last = elementToRemove.previous;
            if (elementToRemove.previous !== undefined) {
                elementToRemove.previous.next = null;
            }
        }
        else {
            elementToRemove.previous.next = elementToRemove.next;
            elementToRemove.next.previous = elementToRemove.previous;
        }

        this.size--;

        return removeValue;
    }

    // sets value of specified element, returns old value
    set(element: T, position: number): T {

        const item = this.item(position);
        const oldValue = item.value;
        item.value = element;

        return oldValue;
    }

    toArray(): Array<T> {

        const array: Array<T> = [];

        for (let listItem = this.first; listItem !== undefined;) {
            array.push(listItem.value);
            listItem = listItem.next;
        }

        return array;
    }

    [Symbol.iterator]() {
        let current = this.first;
        return {
            next(): IteratorResult<T> {

                const keep = current;
                if (current !== undefined) {
                    current = current.next;
                    return {
                        done: false,
                        value: keep.value
                    };
                }
                else {
                    return {
                        done: true,
                        value: null
                    };
                }
            }
        };
    }
}

