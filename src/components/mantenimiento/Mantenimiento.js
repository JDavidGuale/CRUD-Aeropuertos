import React from 'react'
import styles from "./mantenimiento.module.css";
import { Preloader } from '../preloader/Preloader';
import { Modal } from '../modal/Modal';

export const Mantenimiento = ({modalVisible, setModalVisible, setSelectRow, preloader, setPreloader,children,opcionCrear=true}) => {
  
  const mostrarModal = () => {
    setModalVisible(true);
    /* setPreloader(true) */
  }

    return (
        <div className={styles.contenedor}>
          {children[0]}
          <div className={styles.cabecera}>
            {
              opcionCrear &&
              <button 
                onClick={mostrarModal}
                className={styles.boton}
              >
                Crear
              </button>

            }
          </div>
          <div>
            <p></p>
          </div>
          <div className={styles.contenido}>
          {children[1]}
          </div>

          <Modal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setSelectRow={setSelectRow}
          >
            {children[2]}
          </Modal> 

          <Preloader 
            preloader={preloader}
            setPreloader={setPreloader}
          />
          

        </div>
          
    );
}
