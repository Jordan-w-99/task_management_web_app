import { getRandomItemFromArray } from "./getRandomFromArray";

export const generateNewId = (): string => {
    const ID_LEN = 10
    const idOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'A', 'B', 'C', 'D', 'E', 'F'];

    let newId = ''

    for (let i = 0; i < ID_LEN; i++) {
        newId += getRandomItemFromArray(idOptions)
    }

    return newId
}