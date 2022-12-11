import { readData } from './common.js'

let data = await readData('./2022/Data/day5.txt')
let data_by_rows = data.split('\n')

let starting_stacks_raw = data_by_rows.slice(0, 10)
let rearrangement_procedures = data_by_rows.slice(10)

function parse_row(row, stacks) {
    for (let index = 0; index < 9; index++) {

        if (typeof stacks[index] == 'undefined') {
            stacks[index] = new Array()
        }

        let cell_value = row[1 + index * 4]

        if (cell_value !== ' ') {
            stacks[index].push(cell_value)
        }
    }
}

function make_starting_stacks(stacks_raw) {
    let stacks = []
    for (let index = stacks_raw.length - 3; index >= 0; index--) {
        parse_row(stacks_raw[index], stacks)
    }

    return stacks
}

function pop_from_push_to(stack, n, from, to) {

    let to_push = []

    for (let index = 0; index < n; index++) {
        let pop_value = stack[from].pop()

        if (typeof pop_value == 'undefined') {
            break
        }

        to_push.push(pop_value)
    }

    stack[to].push(...to_push.reverse())
}

let stacks = make_starting_stacks(starting_stacks_raw)
rearrangement_procedures.forEach(procedure => {
    let result = procedure.match(/move (\d+) from (\d+) to (\d+)/);
    
    let move = result[1]
    let from = result[2]
    let to = result[3]

    pop_from_push_to(stacks, move, from - 1, to - 1)
})

stacks.forEach(stack => {
    console.log(stack.at(-1))
})