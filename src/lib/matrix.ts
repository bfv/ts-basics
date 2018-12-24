
// matrices are 1 based indexed
// M(i, j) means: row i, column j
// M(1, 1) is the left upper corner of the matrix

export class Matrix {

    private data: { [key: number]: { [key: number]: number } };

    constructor(public readonly rows: number, public readonly cols: number, public readonly defaultValue = 0) {
        this.data = {};
        this.init();
    }

    private init() {
        this.iterateElements((i, j) => {
            this.setValue(i, j, this.defaultValue);
        });
    }

    setValue(i: number, j: number, value: number) {

        if (this.data[i] === undefined) {
            this.data[i] = {};
        }

        this.data[i][j] = value;
    }

    getValue(i: number, j: number): number {
        let value: number;

        if (this.data[i][j] === undefined) {
            value = this.defaultValue;
        }
        else {
            value = this.data[i][j];
        }
        return value;
    }

    setValues(values: number[][]) {
        this.iterateElements((i, j) => {
            this.setValue(i, j, values[i - 1][j - 1]);
        });
    }

    add(other: Matrix) {
        let mr = new Matrix(this.rows, other.cols);

        mr.iterateElements((i, j) => {
            mr.data[i][j] = this.data[i][j] + other.data[i][j];
        });

        return mr;
    }

    multiply(other: Matrix): Matrix {

        let mr = new Matrix(this.rows, other.cols);

        mr.iterateElements((i, j) => {
            let result = 0;
            for (let k = 1; k <= this.cols; k++) {
                result += this.data[i][k] * other.data[k][j];
            }
            mr.data[i][j] = result;
        });

        return mr;
    }

    scalarMultiply(scalar: number) {
        let mr = new Matrix(this.rows, this.cols);

        mr.iterateElements((i, j) => {
            mr.data[i][j] = this.data[i][j] * scalar;
        });

        return mr;
    }

    transpose(): Matrix {
        let mr = new Matrix(this.cols, this.rows);
        mr.iterateElements((i, j) => {
            mr.data[i][j] = this.data[j][i];
        });
        return mr;
    }

    iterateElements(f: (i: number, j: number) => void) {
        for (let i = 1; i <= this.rows; i++) {
            for (let j = 1; j <= this.cols; j++) {
                f(i, j);
            }
        }
    }

    gaussianEliminate(answers: Matrix) {

        let solution = new Matrix(answers.cols, this.rows);
        let calcdata = this.fillGaussianCalculationData(answers);

        // j is column
        for (let j = 1; j <= this.cols; j++) {

            // findmaxrow to prevent zeros in the diagonal
            if (j < this.rows) {
                let maxRow = calcdata.findMaxColValue(j);
                if (maxRow !== j) {
                    calcdata.swapRows(j, maxRow);
                }
            }

            for (let i = 1; i <= this.rows; i++) {
                if (i !== j && calcdata.getValue(i, j) !== 0.0) {
                    let scalar = -1 * (calcdata.getValue(i, j) / calcdata.getValue(j, j));
                    calcdata.addScalarMultiple(j, scalar, i);
                }
            }
        }

        for (let k = 1; k <= this.rows; k++) {
            let val = calcdata.getValue(k, k);
            if (val !== 1) {
                calcdata.scalarMultiplyRow(k, 1 / val);
            }
        }

        for (let k = 1; k <= calcdata.rows; k++) {
            solution.setValue(1, k, Math.round(calcdata.getValue(k, calcdata.cols) * 1000) / 1000);  // 3 digits max
        }

        return solution;
    }

    // find the maximum value in the given column and return the row number of that maximum value
    private findMaxColValue(col: number): number {
        let maxValue = Math.abs(this.data[col][col]);
        let maxRow = col;
        for (let i = col; i <= this.rows; i++) {
            if (Math.abs(this.data[i][col]) > maxValue) {
                maxValue = Math.abs(this.data[i][col]);
                maxRow = i;
            }
        }
        return maxRow;
    }

    private fillGaussianCalculationData(answers: Matrix): Matrix {
        let calcdata = new Matrix(this.rows, this.cols + 1);

        // copy this to data matrix
        this.iterateElements((i, j) => {
            calcdata.setValue(i, j, this.data[i][j]);
        });

        // copy answer column to data matrix
        for (let i = 1; i <= answers.rows; i++) {
            calcdata.setValue(i, calcdata.cols, answers.getValue(i, 1));
        }

        return calcdata;
    }

    // operates on this.data, so no new Matrix
    private swapRows(r1: number, r2: number) {
        for (let j = 1; j <= this.cols; j++) {
            let temp = this.data[r1][j];
            this.data[r1][j] = this.data[r2][j];
            this.data[r2][j] = temp;
        }
    }

    // operates on this.data, so no new Matrix
    private scalarMultiplyRow(row: number, scalar: number) {
        for (let j = 1; j <= this.cols; j++) {
            this.data[row][j] *= scalar;
        }
    }

    // operates on this.data, so no new Matrix
    private addScalarMultiple(sourceRow: number, scalar: number, targetRow: number) {
        for (let j = 1; j <= this.cols; j++) {
            this.data[targetRow][j] += scalar * this.data[sourceRow][j];
        }
    }

    display() {
        // determine "widest" value per column
        let widths = new Array<number>(this.cols + 1);
        for (let j = 1; j <= this.cols; j++) {
            let maxWidth = 0;
            for (let i = 1; i <= this.rows; i++) {
                maxWidth = Math.max(maxWidth, this.round(this.data[i][j], 3).toString().length);
            }
            widths[j] = maxWidth;
        }

        for (let i = 1; i <= this.rows; i++) {
            let row = '| ';
            for (let j = 1; j <= this.cols; j++) {
                row += this.format(this.round(this.data[i][j], 3), widths[j]) + ' ';
            }
            row += '|';
            console.log(row);
        }
    }

    private round(value: number, decimals: number) {
        return Math.round(
            value * Math.pow(10, decimals)
        ) / Math.pow(10, decimals);
    }

    private format(value: number, width: number): string {
        let result = value.toString();
        while (result.length < width) {
            result = ' ' + result;
        }
        return result;
    }
}
