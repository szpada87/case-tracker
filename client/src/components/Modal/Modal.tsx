import React from "react";
import classes from "./Modal.module.css";
import { ModalConf } from "./useModal";
import { FaPlusCircle } from 'react-icons/fa';

type ModalProps = {
    modalConf: ModalConf,
    isOpen: boolean,
    hasCloseBtn?: boolean,
    onClose?: () => void,
    title?: string,
    children: React.ReactNode,
    footer?: React.ReactNode,
    header?: React.ReactNode,
};

const Modal = ({
    modalConf,
    hasCloseBtn = true,
    title,
    children,
    footer,
    header
}: ModalProps) => {
    return (
        <dialog ref={modalConf.ref} onKeyDown={modalConf.handleKeyDown} className={classes.modal}>
            <div className={classes.header}>
                {title && <h1 className={classes.title}>{title}</h1>}
                {header}
                {hasCloseBtn && (
                    <button className={classes.close_btn} onClick={modalConf.handleCloseModal}>
                        <FaPlusCircle />
                        <span className="sr-only">Close modal</span>
                    </button>
                )}
            </div>
            <div className={classes.body}>
                {children}
            </div>
            {footer && <div className={classes.footer}>
                {footer}
            </div>}
        </dialog>
    );
};

export default Modal;