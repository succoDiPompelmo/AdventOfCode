import { readData } from './common.js'

function get_assignments(raw_data) {
    return raw_data.split('\n').map(el => el.split(',')).map(el => el.map(x => x.split('-').map(y => Number(y))))
}

function point_in_interval(point, interval) {
    if (point >= interval[0] && point <= interval[1]) {
        return true
    }

    return false
}

function assignment_contain(assignment_1, assignment_2) {
    if (point_in_interval(assignment_2[0], assignment_1) || (point_in_interval(assignment_2[1], assignment_1)) || (point_in_interval(assignment_1[0], assignment_2)) || (point_in_interval(assignment_1[1], assignment_2))) {
        return true
    }

    return false
}

let data = await readData('./Data/day4.txt')
let assignments = get_assignments(data)

let result = assignments.filter(x => assignment_contain(x[0], x[1]) || assignment_contain(x[1], x[0]))

console.log(result, result.length)

