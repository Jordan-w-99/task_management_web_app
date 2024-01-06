import { BoardSelectorBoardContainer } from './BoardSelectorBoardContainer'
import styles from './BoardSelectorRoot.module.css'
import { BoardDetails } from '../../models/boardDetails'
import { GetBoards } from '../../api/getBoardData'
import { generateNewId } from '../../utils/generateNewId'
import { uploadNewBoard } from '../../api/saveBoardData'
import { useState } from 'react'
import { NewItemInput } from '../common/newItemInput'

export const BoardSelectorRoot = () => {
    const [boards, setBoards] = useState(GetBoards())

    const createNewBoard = (title: string): void => {
        const newBoard: BoardDetails = {
            title,
            id: generateNewId()
        }

        uploadNewBoard(newBoard)

        setBoards(GetBoards())
    }

    return (
        <div className={styles.container}>
            <BoardSelectorBoardContainer
                boards={boards}
            />
            <NewItemInput
                inputPlaceholder='Board name...'
                buttonText='Create Board'
                action={createNewBoard}
            />
        </div>
    )
}