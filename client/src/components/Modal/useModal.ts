import { MutableRefObject, useRef } from "react";

export type ModalConf = {
    ref: MutableRefObject<HTMLDialogElement | null>,
    handleKeyDown: (event: React.KeyboardEvent<HTMLDialogElement>) => void
    handleCloseModal: () => void
}

export const useModal = (onClose?: () => void, onShow?: () => void): {
    modalConf: ModalConf,
    showModal: () => void,
    closeModal: () => void
} => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const closeModal = () => {
        if (onClose) {
            onClose();
        }

        const modalElement = modalRef.current;

        if (modalElement) {
            modalElement.close();
        }
    };

    const showModal = () => {
        if (onShow) {
            onShow();
        }

        const modalElement = modalRef.current;

        if (modalElement) {
            modalElement.showModal();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            closeModal();
        }
    };

    return {
        modalConf: {
            ref: modalRef,
            handleKeyDown,
            handleCloseModal: closeModal
        },
        showModal,
        closeModal
    }
}