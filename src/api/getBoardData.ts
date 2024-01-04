import { BoardData } from "../models/boardData";
import { BoardDetails } from "../models/boardDetails";
import boardData from '../savedBoards.json'

export const GetBoards = (): BoardDetails[] => {
    return boardData.savedBoards.map((board): BoardDetails => ({
        title: board.title,
        id: board.id
    }))
}

export const GetBoardData = (id: string): BoardData => {
    return boardData.savedBoards.find(board => board.id === id) as BoardData
}