import { promises as fs } from 'fs';

async function readData(filename) {
    const data = await fs.readFile(filename, 'utf8')
    return data
};
  
export { readData }