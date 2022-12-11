import { readData } from './common.js'

function choice_normalizer(choice) {
    if (choice == 'X') return 'A';
    if (choice == 'Y') return 'B';
    if (choice == 'Z') return 'C';

    return choice
}

function normalize_choice_score(choice_score) {
    if (choice_score == 0) {
        return 3
    }

    if (choice_score == 4) {
        return 1
    }

    return choice_score
}

function compute_round_score(expected_outcome, choice) {

    let choice_score = 1;

    if (expected_outcome == 'A') {
        choice_score = (choice.charCodeAt() - 64) - 1
    }

    if (expected_outcome == 'B') {
        choice_score =  (choice.charCodeAt() - 64)
    }

    if (expected_outcome == 'C') {
        choice_score = (choice.charCodeAt() - 64) + 1
    }

    return normalize_choice_score(choice_score)
}

function compute_score(round) {
    let choice = round[0]
    let expected_outcome = round[2]

    let match_score = compute_round_score(choice_normalizer(expected_outcome), choice)
    let choice_score = (choice_normalizer(expected_outcome).charCodeAt() - 65) * 3
    return match_score + choice_score
}

let data = await readData('./Data/day2.txt')
let rounds_score = data.split('\n').map(round => compute_score(round))

console.log(rounds_score.reduce((partialSum, a) => partialSum + a, 0))

