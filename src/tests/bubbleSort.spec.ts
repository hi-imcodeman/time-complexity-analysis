import ComplexityAnalyzer from '../index'

const bubbleSort = (inputArr, counter = null) => {
    const len = inputArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (counter)
                counter()
            if (inputArr[j] > inputArr[j + 1]) {
                const tmp = inputArr[j];
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
            }
        }
    }
    return inputArr;
};


describe('Bubble Sort', () => {
    test('should pass for O(n^2)', () => {
        const iteration = 100
        const analyzer = new ComplexityAnalyzer()
        const counter = () => { analyzer.counter() }
        for (let i = 0; i <= iteration; i++) {
            analyzer.n = i
            const input = ComplexityAnalyzer.generateArray(i, 10, 99)
            const output = bubbleSort(JSON.parse(JSON.stringify(input)), counter)
        }
        const benchmark = analyzer.findTimeComplexity('n^2')
        expect(benchmark.status).toBe('PASS')
    })
    test('should fail for O(n)', () => {
        const iteration = 100
        const analyzer = new ComplexityAnalyzer()
        const counter = () => { analyzer.counter() }
        for (let i = 0; i <= iteration; i++) {
            analyzer.n = i
            const input = ComplexityAnalyzer.generateArray(i, 10, 99)
            const output = bubbleSort(JSON.parse(JSON.stringify(input)), counter)
        }
        const benchmark = analyzer.findTimeComplexity('n')
        expect(benchmark.status).toBe('FAIL')
    })
})