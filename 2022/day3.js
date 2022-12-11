import { readData } from './common.js'

function compute_priority(character) {
    if (character >= 'a' && character <= 'z') return character.charCodeAt() - 96

    return character.charCodeAt() - 65 + 27
}

function compartments(c1, c2, c3) {
    let common = c1.split("").filter(el => c2.split("").includes(el)).filter(el => c3.split("").includes(el))

    console.log(common[0], compute_priority(common[0]), common[0].charCodeAt())

    return compute_priority(common[0])
}

let data = await readData('./Data/day3.txt')
let rucksacks = data.split('\n')

let chunkSize = 3

let result = 0;

for (let i = 0; i < rucksacks.length; i += chunkSize) {
    const chunk = rucksacks.slice(i, i + chunkSize);
    result = result + compartments(...chunk)
}

console.log(result);
