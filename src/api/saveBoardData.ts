import { BoardData, BoardList, BoardListItem } from "../models/boardData";
import { BoardDetails } from "../models/boardDetails";
import { GetAllBoardData, GetBoard, GetList, GetListItem } from "./getBoardData";

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

    const data: BoardData[] = JSON.parse(savedBoardsJSONString)
    localStorage.setItem('savedBoards', JSON.stringify([...data, newBoardData]))
}

export const saveBoard = (boardId: string, updatedLists: BoardList[]) => {
    const data = GetAllBoardData()

    const boardToUpdate = GetBoard(data, boardId)
    boardToUpdate.lists = updatedLists

    localStorage.setItem('savedBoards', JSON.stringify(data))
}

export const saveBoardList = (boardId: string, listId: string, updatedListItems: BoardListItem[]) => {
    const data = GetAllBoardData()

    const listToUpdate = GetList(data, boardId, listId)
    listToUpdate.items = updatedListItems

    localStorage.setItem('savedBoards', JSON.stringify(data))
}

export const updateBoardTitle = (boardId: string, updatedTitle: string) => {
    const data = GetAllBoardData()

    const boardToUpdate = GetBoard(data, boardId)
    boardToUpdate.title = updatedTitle

    localStorage.setItem('savedBoards', JSON.stringify(data))
}

export const updateListTitle = (boardId: string, listId: string, updatedTitle: string) => {
    const data = GetAllBoardData()

    const listToUpdate = GetList(data, boardId, listId)
    listToUpdate.title = updatedTitle

    localStorage.setItem('savedBoards', JSON.stringify(data))
}

export const updateListItemTitle = (boardId: string, listId: string, itemId: string, updatedTitle: string) => {
    const data = GetAllBoardData()

    const itemToUpdate = GetListItem(data, boardId, listId, itemId)
    itemToUpdate.title = updatedTitle;

    localStorage.setItem('savedBoards', JSON.stringify(data))
}

export const updateListItemCompleteStatus = (boardId: string, listId: string, itemId: string, complete: boolean) => {
    const data = GetAllBoardData()

    const itemToUpdate = GetListItem(data, boardId, listId, itemId)
    itemToUpdate.complete = complete;

    localStorage.setItem('savedBoards', JSON.stringify(data))
}
