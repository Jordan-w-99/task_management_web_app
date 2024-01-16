import { useState } from "react"
import styles from './boardViewerListItemModal.module.css'

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
            <button onClick={openModal}>
                Open
            </button>
        </>
    )
}