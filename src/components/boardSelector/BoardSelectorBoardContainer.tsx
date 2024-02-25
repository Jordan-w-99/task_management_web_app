import { BoardSelectorBoard } from "./BoardSelectorBoard"
import styles from './BoardSelectorBoardContainer.module.css'
import { BoardDetails } from "../../models/boardDetails"
import { useState } from "react"
import { GetBoards } from "../../api/getBoardData"
import { generateNewId } from "../../utils/generateNewId"
import { removeSavedBoard, uploadNewBoard } from "../../api/saveBoardData"
import { NewItemInput } from "../common/newItemInput"

export const BoardSelectorBoardContainer = () => {
    const [boards, setBoards] = useState(GetBoards())

    const createNewBoard = (title: string): void => {
        const newBoard: BoardDetails = {
            title,
            id: generateNewId()
        }

        uploadNewBoard(newBoard)

        setBoards(GetBoards())
    }

    const removeBoard = (id: string): void => {
        const updatedBoards = [...boards.filter(b => b.id !== id)]
        setBoards(updatedBoards)
        removeSavedBoard(id)
    }

    return (
        <div className={styles.container}>
            {
                boards.map(board =>
                    <BoardSelectorBoard details={board} removeBoard={removeBoard} />
                )
            }
            <div className={styles.newItem}>
                <NewItemInput
                    inputPlaceholder='Board name...'
                    action={createNewBoard}
                />
            </div>
        </div>
    )
}