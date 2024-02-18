import { CSSProperties, useRef, useState } from "react"
import styles from "./newItemInput.module.css"
import { FaCheck, FaPlus } from "react-icons/fa"

export interface NewItemInputProps {
    inputPlaceholder: string
    action: (textInput: string) => void
}

export const NewItemInput = ({ inputPlaceholder, action }: NewItemInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const [showInput, setShowInput] = useState(false)

    const createButtonClicked = (): void => {
        const inputVal = inputRef.current?.value

        if (inputVal == null || inputVal.trim() === '') {
            return
        }

        action(inputVal)
    }

    const shownInputStyle: CSSProperties = {
        width: 'inherit',
        transition: 'width 200ms'
    }

    const hiddenInputStyle: CSSProperties = {
        width: 0,
        transition: 'width 100ms'
    }

    const add = () => {
        console.log('add')

        setShowInput(true)

        if (inputRef.current != null) {
            inputRef.current.focus()
        }
    }

    const confirm = () => {
        if (inputRef.current?.value == "") {
            return;
        }

        createButtonClicked();
        // setShowInput(false);
        if (inputRef.current != null) {
            inputRef.current.focus()
            inputRef.current.value = ''
        }
    }

    return (
        <form
            className={styles.container}
            onSubmit={(e) => {
                e.preventDefault()
                confirm()
            }}
        >
            <input
                style={showInput ? shownInputStyle : hiddenInputStyle}
                type="text"
                placeholder={inputPlaceholder}
                ref={inputRef}
                onBlur={() => {
                    if (inputRef.current && inputRef.current.value == "") {
                        setShowInput(false)
                    }
                }}
            />
            {showInput
                ? (
                    <button
                        key={'submit-btn'}
                        className={styles.confirmButton}
                        type="submit"
                    >
                        <FaCheck />
                    </button>
                )
                : (
                    <button
                        className={styles.addButton}
                        onClick={() => { add() }}
                    >
                        <FaPlus />
                    </button>
                )

            }
        </form>
    )
}