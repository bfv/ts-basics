
import { expect, should } from 'chai';
import 'mocha';
import { Matrix } from './matrix';

describe('Matrices', () => {

    let mIdentity2 = new Matrix(2, 2);
    mIdentity2.setValues([[1, 0], [0, 1]]);

    let mIdentity3 = new Matrix(3, 3);
    mIdentity3.setValues([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

    let mOnes2 = new Matrix(2, 2);
    mOnes2.setValues([[1, 1], [1, 1]]);

    let m2 = new Matrix(2, 2);
    m2.setValues([[1, 2], [3, 4]]);

    it('test the tester', () => {
        expect(0).to.be.equal(0);
    });

    it('getValue should return correct value', () => {
        expect(mIdentity2.getValue(1, 1)).to.be.equal(1);
        expect(mIdentity2.getValue(1, 2)).to.be.equal(0);
    });

    it('add operation', () => {
        let mt = m2.add(mIdentity2);
        expect(mt.getValue(1, 1)).to.be.equal(2);
        expect(mt.getValue(1, 2)).to.be.equal(2);
        expect(mt.getValue(2, 1)).to.be.equal(3);
        expect(mt.getValue(2, 2)).to.be.equal(5);
    });

    it('multiply operation', () => {
        let mt = m2.multiply(mOnes2);
        expect(mt.getValue(1, 1)).to.be.equal(3);
        expect(mt.getValue(1, 2)).to.be.equal(3);
        expect(mt.getValue(2, 1)).to.be.equal(7);
        expect(mt.getValue(2, 2)).to.be.equal(7);
    });

    it('scalar multiply operation', () => {
        let mt = m2.scalarMultiply(2);
        expect(mt.getValue(1, 1)).to.be.equal(2);
        expect(mt.getValue(1, 2)).to.be.equal(4);
        expect(mt.getValue(2, 1)).to.be.equal(6);
        expect(mt.getValue(2, 2)).to.be.equal(8);
    });

    let m3 = new Matrix(3, 3);
    m3.setValues([[2, 1, -1], [-3, -1, 2], [-2, 1, 2]]);

    let ms = new Matrix(3, 1);
    ms.setValues([[8], [-11], [-3]]);

    it('gaussian elimination', () => {
        /*
        Gaussian elimination is used to solve n equations with n variables
        In this example we're trying to solve:
         2x + y -  z =   8
        -3x - y + 2z = -11
        -2x + x + 2z =  -3
        */
        let mr = m3.gaussianEliminate(ms);
        expect(mr.getValue(1, 1)).to.be.equal(2);
        expect(mr.getValue(1, 2)).to.be.equal(3);
        expect(mr.getValue(1, 3)).to.be.equal(-1);
    });

    it('not equal when size differs', () => {
        expect(mIdentity2.equals(mIdentity3)).to.be.equal(false);
    });

    it('not equal when content differs', () => {
        expect(mIdentity2.equals(m2)).to.be.equal(false);
    });

    it('equal when size and content are the same', () => {
        let mt = new Matrix(2, 2);
        mt.setValues([[1, 2], [3, 4]]);
        expect(m2.equals(mt)).to.be.equal(true);
    });

});
