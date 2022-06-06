import {readLogFile} from "./fileReader.js";

function findTop3Items(mapOfItems) {
    const sortedMap = new Map([...mapOfItems.entries()].sort((a, b) => b[1] - a[1]));
    const sortedItems = Array.from(sortedMap.keys());
    return [sortedItems[0], sortedItems[1], sortedItems[2]]
}

export function main() {
    return readLogFile('./logs/programming-task-example-data.log')
        .then((frequencyMap) => {
            const numberOfIPAddresses = frequencyMap.ipMap.size
            const topIPAddresses = findTop3Items(frequencyMap.ipMap)
            const topURLs = findTop3Items(frequencyMap.urlMap)
            return {numberOfIPAddresses, topIPAddresses, topURLs}
        })
}

main().then((r) => console.log(r))