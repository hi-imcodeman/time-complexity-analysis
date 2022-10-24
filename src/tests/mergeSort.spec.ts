import ComplexityAnalyzer from '../index'

function mergeSort(array:number[], half:number = array.length / 2, counter?:() => void) {

    if (array.length < 2) {
        return array
    }

    const left = array.splice(0, half); //left part of array

    return merger(mergeSort(left), mergeSort(array), counter)
}

function merger(left:number[], right:number[], counter?:() => void) {

    const arr:number[] = [];

    while (left.length && right.length) {
        let val:number|undefined=undefined
        if (counter)
            counter()
        if (left[0] < right[0]) {
            val=left.shift()
        } else {
            val=right.shift()
        }
        if(val)
            arr.push(val)
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