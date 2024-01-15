import { BoardData, BoardList, BoardListItem } from "../models/boardData";
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

    const data: BoardData[] = JSON.parse(savedBoardsJSONString)
    localStorage.setItem('savedBoards', JSON.stringify([...data, newBoardData]))
}

export const saveBoard = (boardId: string, updatedLists: BoardList[]) => {
    const savedBoardsJSONString = localStorage.getItem('savedBoards')

    // No data.
    if (savedBoardsJSONString == null || savedBoardsJSONString.trim() === '') {
        alert('Error: No Board Data Found!')
        return;
    }

    const data: BoardData[] = JSON.parse(savedBoardsJSONString)

    const boardToUpdate = data.find(board => board.id === boardId)

    if (boardToUpdate == null) {
        alert('Error: No Board Data Found!')
        return;
    }

    boardToUpdate.lists = updatedLists

    localStorage.setItem('savedBoards', JSON.stringify(data))
}

export const saveBoardList = (boardId: string, listId: string, updatedListItems: BoardListItem[]) => {
    const savedBoardsJSONString = localStorage.getItem('savedBoards')

    // No data.
    if (savedBoardsJSONString == null || savedBoardsJSONString.trim() === '') {
        alert('Error: No Board Data Found!')
        return;
    }

    const data: BoardData[] = JSON.parse(savedBoardsJSONString)

    const boardToUpdate = data.find(board => board.id === boardId)

    if (boardToUpdate == null) {
        alert('Error: No Board Data Found!')
        return;
    }

    const listToUpdate = boardToUpdate.lists.find(list => list.id === listId)

    if (listToUpdate == null) {
        alert(`Error: List With ID ${listId} Not Found!`)
        return;
    }

    listToUpdate.items = updatedListItems

    localStorage.setItem('savedBoards', JSON.stringify(data))
}
