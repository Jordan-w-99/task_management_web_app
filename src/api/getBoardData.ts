import { BoardData } from "../models/boardData";
import { BoardDetails } from "../models/boardDetails";

export const GetAllBoardData = (): BoardData[] => {
    const savedBoardsJSONString = localStorage.getItem('savedBoards')

    if (savedBoardsJSONString == null) {
        return []
    }

    return JSON.parse(savedBoardsJSONString)
}

export const GetBoards = (): BoardDetails[] => {
    return GetAllBoardData().map((board): BoardDetails => ({
        title: board.title,
        id: board.id
    }))
}

export const GetBoardData = (id: string): BoardData => {
    return GetAllBoardData().find(board => board.id === id) as BoardData
}