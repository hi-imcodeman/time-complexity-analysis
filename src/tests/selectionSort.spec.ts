import ComplexityAnalyzer from '../index'

function selectionSort(arr:number[], counter?:() => void) {
    let minIdx, temp
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        minIdx = i;
        for (let j = i + 1; j < len; j++) {
            if (counter)
                counter()
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
    return arr;
}


describe('Selection Sort', () => {
    test('should pass for n^2', () => {
        const iteration = 100
        const analyzer = new ComplexityAnalyzer()
        const counter = () => { analyzer.counter() }
        for (let i = 0; i <= iteration; i++) {
            analyzer.n = i
            const input = ComplexityAnalyzer.generateArray(i, 10, 99)
            const output = selectionSort([...input], counter)
        }
        const benchmark = analyzer.findTimeComplexity('n^2',true)
        expect(benchmark.status).toBe('PASS')
    })
})