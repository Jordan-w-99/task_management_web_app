import { BoardData, BoardList, BoardListItem } from "../models/boardData";
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

export const GetBoard = (allBoardData: BoardData[], id: string): BoardData => {
    const board = allBoardData.find(board => board.id === id)

    if (board == null) {
        throw new Error(`Error: Board With ID ${id} Data Found!`)
    }

    return board
}

export const GetList = (allBoardData: BoardData[], boardId: string, listId: string): BoardList => {
    const board = GetBoard(allBoardData, boardId)

    const list = board.lists.find(l => l.id === listId)

    if (list == null) {
        throw new Error(`Error: List With ID ${listId} Not Found!`)
    }

    return list
}

export const GetListItem = (allBoardData: BoardData[], boardId: string, listId: string, itemId: string): BoardListItem => {
    const list = GetList(allBoardData, boardId, listId);

    const item = list.items.find(i => i.id === itemId)

    if (item == null) {
        throw new Error(`Error: Item With ID ${itemId} Not Found!`)
    }

    return item
}