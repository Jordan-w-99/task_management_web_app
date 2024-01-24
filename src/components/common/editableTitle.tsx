import { useEffect, useRef, useState } from "react"
import styles from './editableTitle.module.css'
import { MdCheck } from "react-icons/md"
import { SquareButton } from "./squareButton"

export interface EditableTitleProps {
    defaultTitle: string
    saveTitle: (newTitle: string) => void
}

export const EditableTitle = ({
    defaultTitle,
    saveTitle
}: EditableTitleProps) => {
    const [listTitle, setListTitle] = useState(defaultTitle)

    const [editing, setEditing] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (editing) {
            inputRef.current?.select()
        }
    }, [editing, inputRef])


    const startEditing = () => {
        setEditing(true)
    }

    const saveNewTitle = () => {
        const updatedTitle = inputRef.current?.value ?? ''

        setListTitle(updatedTitle)
        setEditing(false)
        saveTitle(updatedTitle)
    }

    if (editing) {
        return (
            <div className={styles.container}>
                <input defaultValue={listTitle} ref={inputRef} />
                <SquareButton
                    icon={<MdCheck />}
                    onClick={saveNewTitle}
                />
            </div>
        )
    }

    return (
        <div onDoubleClick={startEditing} className={styles.container}>
            {listTitle}
        </div>
    )
}