import { readData } from './common.js'
let data = await readData('./2022/Data/day7.txt')

function build_path(path, command) {
    if (command == '/') {
        return []
    }

    if (command == '..') {
        path.pop()
        return
    }

    path.push(command)
}

function mkdir(filesystem, path) {
    let current_dir = filesystem;
    path.forEach(sub_path => {
        if (!current_dir.has(sub_path)) {
            current_dir.set(sub_path, new Map())   
        }
        current_dir = current_dir.get(sub_path)
    })
}

function touch(filesystem, path, filename, size) {
    let current_dir = filesystem;
    path.forEach(sub_path => {
        if (!current_dir.has(sub_path)) {
            current_dir.set(sub_path, new Map())   
        }
        current_dir = current_dir.get(sub_path)
    })

    current_dir.set(filename, size)
}

function build_filesystem(rows) {
    let filesystem = new Map()
    rows.forEach(row => {
        let cd = row.match(/\$ cd (.+)/);
        if (cd !== null) {
            build_path(path, cd[1])
        }
    
        let dir = row.match(/dir (.+)/);
        if (dir != null) {
            path.push(dir[1])
            mkdir(filesystem, path)
            path.pop()
        }
    
        let file = row.match(/(\d+) (.+)/);
        if (file != null) {
            touch(filesystem, path, file[2], Number(file[1]))
        }
    })

    return filesystem
}

let result = 99999999999999;

function dir_with_size_at_most(current_dir, size) {
    let current_size = 0;

    for (const [key, value] of current_dir) {
        if (value instanceof Map) {
            current_size = current_size + dir_with_size_at_most(current_dir.get(key), size)
        } else {
            current_size = current_size + value
        }
    }

    if (current_size >= size && current_size <= result) {
        result = current_size
    }

    return current_size;
}

let path = new Array()
let filesystem = build_filesystem(data.split('\n'))

dir_with_size_at_most(filesystem, 6728267)
console.log(result)