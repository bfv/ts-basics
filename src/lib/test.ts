
// should be done with proper test runners

import { LinkedList } from './linkedlist';
import { Stack } from './stack';
import { Queue } from './queue';
import { Set } from './set';
import { Matrix } from './matrix';

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

function matrices() {

    /*
    Gaussian elimination is used to solve n equations with n variables
    In this example we're trying to solve:
     2x + y -  z =   8
    -3x - y + 2z = -11
    -2x + x + 2z =  -3
    */
    function testGaussian() {
        let m1 = new Matrix(3, 3);
        m1.setValues([[2, 1, -1], [-3, -1, 2], [-2, 1, 2]]);

        let m2 = new Matrix(3, 1);
        m2.setValues([[8], [-11], [-3]]);

        m1.gaussianEliminate(m2).display();
    }

    function testGaussian2() {
        let m1 = new Matrix(3, 3);
        m1.setValues([[1, 3, -2], [3, 5, 6], [2, 4, 3]]);

        let m2 = new Matrix(3, 1);
        m2.setValues([[5], [7], [8]]);

        m1.gaussianEliminate(m2).display();
    }

    function testGaussian4() {
        let m1 = new Matrix(3, 3);
        m1.setValues([
            [2, -1, -0],
            [-1, 2, -1],
            [0, -1, 2]
        ]);

        let m2 = new Matrix(3, 3);
        m2.setValues([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);

        m1.gaussianEliminate(m2).display();
    }

    testGaussian2();

}
