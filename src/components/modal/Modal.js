import React from 'react'
import styles from './modal.module.css';


export const Modal = ({modalVisible,children}) => {

    // const closeModal = () => {
    //     // setModoEdicion(false);
    //     setModalVisible(false);
    // }
    
    // const handleModalDialogClick = (e) => {
    // e.stopPropagation();
    // }

    return (
        <>
        {
        modalVisible && 
        <div className={styles.contenedor} /* onClick={closeModal} */>
            <div className={styles.modal} /* onClick={handleModalDialogClick} */>
                <label className={styles.close}></label>
                {children}
            </div>
        </div>
            
        }
        </>
    
    )
}
