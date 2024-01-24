import { useRef } from "react"

export interface NewItemInputProps {
    inputPlaceholder: string
    buttonText: string
    action: (textInput: string) => void
}

export const NewItemInput = ({ inputPlaceholder, buttonText, action }: NewItemInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const createButtonClicked = (): void => {
        const inputVal = inputRef.current?.value

        if (inputVal == null || inputVal.trim() === '') {
            return
        }

        action(inputVal)
    }

    return (
        <div>
            <input
                type="text"
                placeholder={inputPlaceholder}
                ref={inputRef}
            />
            <button
                onClick={createButtonClicked}
            >
                {buttonText}
            </button>
        </div>
    )
}