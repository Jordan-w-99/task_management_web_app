import React, { useContext, useRef } from "react"
import { BoardSelectorContext } from "../../context/BoardSelector.context"

export const BoardSelectorNewBoardInput = (): React.JSX.Element => {
    const boardNameInputRef = useRef<HTMLInputElement>(null)

    const { createNewBoard } = useContext(BoardSelectorContext)

    const createNewBoardClicked = (): void => {
        const nameInput = boardNameInputRef.current?.value

        if (nameInput == null || nameInput.trim() === '') {
            return
        }

        createNewBoard(nameInput)
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Board Name..."
                ref={boardNameInputRef}
            />
            <button
                onClick={createNewBoardClicked}
            >
                New Board
            </button>
        </div>
    )
}