import ComplexityAnalyzer from '../index'

function quickSort(arr:number[], left:number, right:number, counter?:() => void) {
    const len = arr.length
    let pivot, partitionIndex;


    if (left < right) {
        pivot = right;
        partitionIndex = partition(arr, pivot, left, right, counter);

        //sort left and right
        quickSort(arr, left, partitionIndex - 1, counter);
        quickSort(arr, partitionIndex + 1, right, counter);
    }
    return arr;
}

function partition(arr:number[], pivot:number, left:number, right:number, counter?:() => void) {
    const pivotValue = arr[pivot]
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
        if (counter)
            counter()
        if (arr[i] < pivotValue) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(arr, right, partitionIndex);
    return partitionIndex;
}
function swap(arr:number[], i:number, j:number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


describe('Quick Sort', () => {
    test('should pass for n(log(n))', () => {
        const iteration = 500
        const analyzer = new ComplexityAnalyzer()
        const counter = () => { analyzer.counter() }
        for (let i = 0; i <= iteration; i++) {
            analyzer.n = i
            const input = ComplexityAnalyzer.generateArray(i, 1, 999)
            const output = quickSort([...input], 0, i - 1, counter)
        }
        const benchmark = analyzer.findTimeComplexity('n^2')
        expect(benchmark.status).toBe('PASS')
    })
})