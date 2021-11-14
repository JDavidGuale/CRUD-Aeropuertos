import React, { useEffect, useState } from 'react'

import { Mantenimiento } from './components/mantenimiento/Mantenimiento'
import { TablaAeropuerto } from './components/TablaAeropuerto'
import { FormAeropuertos } from './components/FormAeropuertos'

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSinToken } from './helpers/fetch';

export const MntAeropuerto = () => {
    
    const endpoint_get = '';

    const [modalVisible, setModalVisible] = useState(false);
    const [dataComplete, setDataComplete] = useState([]);
    const [selectRow, setSelectRow] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);

    const [recargarTabla, setRecargarTabla] = useState(false);

    const [preloader,setPreloader] = useState(false);
    
    const [toastVisible, setToastVisible] = useState(false);
    const [mensajeToast, setMensajeToast] = useState({});


    const [eliminar, setEliminar] = useState(false);

    const getDatos = async() => {
        try {
          setPreloader(true);
          const res = await fetchSinToken(`${endpoint_get}`); //
          const body = await res.json();
          setDataComplete(body['aeropuertos']);
          setPreloader(false);
        } catch (error) {
          setPreloader(false)
          console.log(error)
        }
    }
    
    useEffect(()=>{
        getDatos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    
    if (recargarTabla) {
      getDatos();
      setRecargarTabla(false);
    }

    const mostrarToast = () => {
      switch (mensajeToast.tipo) {
        case 'exito':
          toast.success(mensajeToast.mensaje, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'idcausa'
            });
          
          break;
        case 'error':
          toast.error(mensajeToast.mensaje, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'idcausa2'
            });
          break;
        default:
          break;
      }
    }

    if (toastVisible) {
      mostrarToast();
      setToastVisible(false);
    }
    return (
      
        <div>
            <Mantenimiento
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setSelectRow={setSelectRow}

                preloader={preloader}
                setPreloader={setPreloader}
                
            >
                <h3>Aeropuertos</h3>

                <TablaAeropuerto
                  dataComplete={dataComplete}
                  setModalVisible={setModalVisible}
                  setSelectRow={setSelectRow}
                  setModoEdicion = {setModoEdicion}
                  setEliminar= {setEliminar}

                />

                <FormAeropuertos
                  setPreloader={setPreloader}
                  selectRow={selectRow}
                  modoEdicion={modoEdicion}
                  setModoEdicion={setModoEdicion}
                  setModalVisible={setModalVisible}
                  dataComplete={dataComplete}

                  setRecargarTabla={setRecargarTabla}

                  setToastVisible= {setToastVisible}
                  setMensajeToast ={setMensajeToast}

                  eliminar={eliminar}
                  setEliminar= {setEliminar}
                />
            </Mantenimiento>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
        </div>
    )
}
