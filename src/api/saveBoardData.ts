import { BoardDetails } from "../models/boardDetails"; 3

export const uploadNewBoard = (newBoard: BoardDetails): void => {
    const savedBoardsJSONString = localStorage.getItem('savedBoards')

    // No data.
    if (savedBoardsJSONString == null || savedBoardsJSONString.trim() === '') {
        localStorage.setItem('savedBoards', JSON.stringify([newBoard]))

        return
    }

    const data = JSON.parse(savedBoardsJSONString)
    localStorage.setItem('savedBoards', JSON.stringify([...data, newBoard]))
}