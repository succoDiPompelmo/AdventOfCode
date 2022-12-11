import { readData } from './common.js'
let data = await readData('./2022/Data/day8.txt')

let patch = new Array()

data.split('\n').forEach(row => {
    patch.push(new Array(...row.split("")))
})

function check_visible(array, element_index) {

    let a = 0
    let b = array.length - 1

    for (let i = element_index - 1; i >= 0; i--) {
        if (array[i] >= array[element_index]) {
            a = i
            break
        }
    }

    for (let j = element_index + 1; j < array.length; j++) {
        console.log(array[j], array[element_index])
        if (array[j] >= array[element_index]) {
            b = j
            break
        }
    }

    // let a = array.slice(0, element_index).filter(el => el >= array[element_index])
    // let b = array.slice(element_index + 1).find(el => el >= array[element_index])

    // console.log(array, element_index, a, b)

    return ((element_index - a) * (b - element_index))
}

let max = 0

for (let i = 0; i < patch.length; i++) {    
    for (let j = 0; j < patch.length; j++) {
        let row = patch[i]
        let col = patch.map(x => x[j]);

        let value = check_visible(row, j) * check_visible(col, i)
        // console.log(i, j, value)

        if (value > max) {
            max = value
        }
    }
}

console.log(max)