import readline from 'readline';
import * as fs from "fs";

export async function readLogFile(pathToFile) {
    const frequencyMap = {
        ipMap: new Map(),
        urlMap: new Map()
    }
    const rl = readline.createInterface({
        input: fs.createReadStream(pathToFile),
    });
    const regex = /\d{4}\]\s\"\w*\s(?<path>\S*)\s/g;

    for await (const line of rl) {
        const ip = line.split(' - ')[0]
        const path = regex.exec(line).groups.path
        regex.lastIndex = 0; // required as regex is stateful and will match `return` after the first one
        updateFrequency(frequencyMap.ipMap, ip);
        updateFrequency(frequencyMap.urlMap, path);
    }
    return frequencyMap
}

function updateFrequency(mapToUpdate, item) {
    if (mapToUpdate.has(item)) {
        mapToUpdate.set(item, mapToUpdate.get(item) + 1)
    } else {
        mapToUpdate.set(item, 1)
    }
}