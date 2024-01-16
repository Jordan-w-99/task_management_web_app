import { useState } from "react"
import styles from './boardViewerListItemModal.module.css'
import { MdOutlineOpenInNew } from "react-icons/md";
import { SquareButton } from "../common/squareButton";

export const BoardViewerListItemModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            {isModalOpen &&
                <div className={styles.modalBackdrop} onClick={closeModal} />
            }
            <dialog open={isModalOpen}>
                Hi!
                <button onClick={closeModal}>Close</button>
            </dialog >
            <SquareButton
                icon={<MdOutlineOpenInNew />}
                onClick={openModal}
            />
        </>
    )
}