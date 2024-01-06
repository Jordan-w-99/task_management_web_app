import { BoardData } from "../models/boardData";
import { BoardDetails } from "../models/boardDetails"; 3

export const uploadNewBoard = (newBoard: BoardDetails): void => {
    const savedBoardsJSONString = localStorage.getItem('savedBoards')

    const newBoardData: BoardData = {
        ...newBoard,
        lists: []
    }

    // No data.
    if (savedBoardsJSONString == null || savedBoardsJSONString.trim() === '') {
        localStorage.setItem('savedBoards', JSON.stringify([newBoardData]))

        return
    }

    const data = JSON.parse(savedBoardsJSONString)
    localStorage.setItem('savedBoards', JSON.stringify([...data, newBoardData]))
}
