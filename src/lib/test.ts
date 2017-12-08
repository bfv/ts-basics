
// should be done with proper test runners

import { LinkedList } from './linkedlist';
import { Stack } from './stack';
import { Queue } from './queue';
import { Set } from './set';

sets();

function linkedLists() {
    const list = new LinkedList<string>();

    console.log(list.remove());

    list.add('a0');
    list.add('b1');
    list.add('c2');
    list.add('d3');

    for (let item of list) {
        console.log(item);
    }

    console.log('remove', list.remove(1));
    list.add('c2.1', 0);
    list.add('c2.2', 0);
    list.removeLast();
    list.removeLast();

    console.log('first:', list.first.value);
    console.log('last:', list.last.value);
    console.log(list.toArray());
}

function sets() {
    const set = new Set<string>();

    set.add('bronco');
    set.add('femke');
    set.add('lieke');
    set.add('rittha');

    console.log('2x Rittha:', set.add('rittha'));
    console.log('array:', set.toArray());
}

function stacks() {
    const stack = new Stack<number>();
    console.log('empty:', stack.empty);
    stack.push(5);
    console.log('empty:', stack.empty);
}
