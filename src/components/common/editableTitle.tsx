import { useEffect, useRef, useState } from "react"

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
            <div>
                <input defaultValue={listTitle} ref={inputRef} />
                <button onClick={saveNewTitle}>Save</button>
            </div>
        )
    }

    return (
        <div onDoubleClick={startEditing}>
            {listTitle}
        </div>
    )
}