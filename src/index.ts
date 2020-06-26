import _ from 'lodash'

const factorial = (x: number) => {
    // TERMINATION
    if (x < 0) return;
    // BASE
    if (x === 0) return 1;
    // RECURSION
    return x * factorial(x - 1);
}
export default class ComplexityAnalyzer {
    n: number
    private _executions: any
    constructor() {
        this.n = 0
        this._executions = {}
    }
    static generateArray(count: number, min: number, max: number) {
        const array: number[] = []
        while (array.length < count) {
            array.push(_.random(min, max))
        }
        return array
    }

    counter() {
        if (this._executions[this.n])
            this._executions[this.n]++
        else
            this._executions[this.n] = 1
    }

    findTimeComplexity(expected: string, debug = false) {
        const benchmark = {
            'good': 0,
            'poor': 0
        }
        Object.entries(this._executions).forEach(entry => {
            const complexities = []
            const key = Number(entry[0])
            const value = Number(entry[1])
            complexities.push({ 'log(n)': Math.ceil(Math.log(key)) })
            complexities.push({ 'n': key })
            complexities.push({ 'n(log(n))': Math.ceil(key * Math.log(key)) })
            complexities.push({ 'n^2': key * key })
            complexities.push({ '2^n': Math.pow(2, key) })
            complexities.push({ 'n!': factorial(key) })
            complexities.push({ 'n^3': key * key * key })
            const observedTimeComplexity = _.find(complexities, obj => value <= Object.values(obj)[0])
            const expectedTimeComplexity = _.find(complexities, obj => obj[expected])
            const difference = value - expectedTimeComplexity[expected]
            /* istanbul ignore if */
            if (debug) {
                console.log({
                    n: key,
                    executions: value,
                    expectedTimeComplexity,
                    observedTimeComplexity,
                    difference
                });
            }
            if (difference <= 0)
                benchmark.good++
            else
                benchmark.poor++
        })
        const result = { ...benchmark, status: benchmark.poor < benchmark.good ? 'PASS' : 'FAIL' }
        /* istanbul ignore if */
        if (debug) {
            console.log(result);
        }
        return result
    }

}