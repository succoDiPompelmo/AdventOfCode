import { readData } from './common.js'

let data = await readData('./2022/Data/day6.txt')
let stack = new Array()

function is_unique(array) {

    for (let index = 0; index < array.length; index++) {
        if (array.indexOf(array[index]) != index) {
            return false
        }   
    }

    return true
}

data.split("").find((letter, index) => {
    stack.push(letter)

    if (stack.length > 14) {
        stack.shift()
    }

    if (stack.length == 14) {
        if (is_unique(stack)) {
            console.log(stack, index + 1)
            return true
        }
    }

    return false
})