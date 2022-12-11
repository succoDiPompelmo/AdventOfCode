import { readData } from './common.js'

let data = await readData('./Data/Day1.txt')

let foods_calories_by_elf = data.split('\n\n').map(x => x.split('\n').map(x => Number(x)))
let total_foods_calories_by_elf = foods_calories_by_elf.map(x => x.reduce((partialSum, a) => partialSum + a, 0))

let result = total_foods_calories_by_elf.sort().reverse()
