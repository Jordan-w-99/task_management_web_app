import { BoardSelectorContext } from '../../context/BoardSelector.context'
import { BoardSelectorBoardContainer } from './BoardSelectorBoardContainer'
import styles from './BoardSelectorRoot.module.css'
import { BoardDetails } from '../../models/boardDetails'
import { GetBoards } from '../../api/getBoardData'
import { generateNewId } from '../../utils/generateNewId'
import { BoardSelectorNewBoardInput } from './BoardSelectorNewBoardInput'
import { uploadNewBoard } from '../../api/saveBoardData'
import { useState } from 'react'

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
        <BoardSelectorContext.Provider
            value={{
                createNewBoard
            }}
        >
            <div className={styles.container}>
                <BoardSelectorBoardContainer
                    boards={boards}
                />
                <BoardSelectorNewBoardInput />
            </div>
        </BoardSelectorContext.Provider>
    )
}