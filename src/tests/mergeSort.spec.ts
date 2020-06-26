import ComplexityAnalyzer from '../index'

function mergeSort(array, half = array.length / 2, counter = null) {

    if (array.length < 2) {
        return array
    }

    const left = array.splice(0, half); //left part of array

    return merger(mergeSort(left), mergeSort(array), counter)
}

function merger(left, right, counter) {

    const arr = [];

    while (left.length && right.length) {
        if (counter)
            counter()
        if (left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }

    return [...arr, ...left, ...right];
}


describe('Merge Sort', () => {
    test('should pass for n(log(n))', () => {
        const iteration = 500
        const analyzer = new ComplexityAnalyzer()
        const counter = () => { analyzer.counter() }
        for (let i = 0; i <= iteration; i++) {
            analyzer.n = i
            const input = ComplexityAnalyzer.generateArray(i, 1, 999)
            const output = mergeSort(JSON.parse(JSON.stringify(input)), input.length / 2, counter)
        }
        const benchmark = analyzer.findTimeComplexity('n(log(n))')
        expect(benchmark.status).toBe('PASS')
    })
})