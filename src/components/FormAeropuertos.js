import React, {useRef} from 'react'

import { fetchSinToken } from '../helpers/fetch';
import {useForm} from '../hooks/useForm'

import stylesModal from "../components/modal/modal.module.css";

export const FormAeropuertos = ({selectRow,setPreloader,modoEdicion,setModoEdicion, setModalVisible,dataComplete,setRecargarTabla,setToastVisible,setMensajeToast,eliminar,setEliminar}) => {


    const btn_eliminar = useRef(null);

    var datosForm = dataComplete.filter(item => item._id === (selectRow) );
    var data_inicial ={}
    if(modoEdicion){
            data_inicial ={
                _id: datosForm[0]._id,
                airport: datosForm[0].airport,
                city: datosForm[0].city,
                state: datosForm[0].state,
                country: datosForm[0].country,
                lat: datosForm[0].lat,
                long: datosForm[0].long,
              }
    }else
    data_inicial ={
        iata: "",
        airport: "",
        city: "",
        state: "",
        country: "",
        lat: "",
        long: "",
    }
    // if (eliminar) {
    //     console.log(btn_eliminar)
    //     btn_eliminar.current.click();
    //     setEliminar(false)

    // }
    const [ formAeropuertoValues, handleAeropuertoInputChange ] = useForm(data_inicial);
    
    const {iata, airport,city,state,country,lat,long} = formAeropuertoValues;
    

    const post_Aeropuerto = async(e) => {
        e.preventDefault();
            try {
                setPreloader(true);
                const res = await fetchSinToken('',formAeropuertoValues,"POST");
                const body = await res.json();
                console.log(res);
                if (body['aeropuerto'] != null) {
                    setMensajeToast({
                        tipo:'exito',
                        mensaje: 'Aeropuerto registrado!'
                    });
                    setPreloader(false);
                    setToastVisible(true);
                    setRecargarTabla(true);
                    cambiarModoEdicion(false);
                }else{
                    setMensajeToast({
                        tipo:'error',
                        mensaje:body.msg
                    });
                    setPreloader(false);
                    setToastVisible(true);
                }
            } catch (error) {
                setPreloader(false);
                setMensajeToast({
                    tipo:'error',
                    mensaje:error
                });
                setToastVisible(true);
            }
    }

    const put_Aeropuerto = async(e) => {
        e.preventDefault();
            try {
                setPreloader(true);
                const res = await fetchSinToken(`${selectRow}`,formAeropuertoValues,"PUT");
                const body = await res.json();
                if (body['aeropuerto'] != null) {
                    setMensajeToast({
                        tipo:'exito',
                        mensaje: 'Aeropuerto actualizado!'
                    });
                    setPreloader(false);
                    setToastVisible(true);
                    setRecargarTabla(true);
                    cambiarModoEdicion(false);
    
                }else{
                    setMensajeToast({
                        tipo:'error',
                        mensaje:body.msg
                    });
                    setPreloader(false);
                    setToastVisible(true);
                }
            } catch (error) {
                setPreloader(false);
                setMensajeToast({
                    tipo:'error',
                    mensaje:error
                });
                setToastVisible(true);
            }
    }

    const delete_Aeropuerto = async(e) => {
        e.preventDefault();
            try {
                setPreloader(true);
                const res = await fetchSinToken(`${selectRow}`,{},"DELETE");
                const body = await res.json();
                if (body['aeropuerto'].deletedCount > 0) {
                    setMensajeToast({
                        tipo:'exito',
                        mensaje: 'Aeropuerto eliminado!'
                    });
                    setPreloader(false);
                    setToastVisible(true);
                    setRecargarTabla(true);
                    cambiarModoEdicion(false);
    
                }else{
                    setMensajeToast({
                        tipo:'error',
                        mensaje:body.msg
                    });
                    setPreloader(false);
                    setToastVisible(true);
                }
            } catch (error) {
                setPreloader(false);
                setMensajeToast({
                    tipo:'error',
                    mensaje:error
                });
                setToastVisible(true);
            }
    }
    
    const handleMantenimiento = async(e) => {
        e.preventDefault();
        modoEdicion ? put_Aeropuerto(e) : post_Aeropuerto(e);
    }

    const cambiarModoEdicion = () => {
        setModoEdicion(false);
        setModalVisible(false);
    }
    return (
        <>
        {
            <div className={stylesModal.modal__content}>
            {
                modoEdicion ? 
                <>
                    <h3>Editar Aeropuerto</h3>
                </>
                :
                <>
                    <h3>Nuevo Aeropuerto</h3>
                </>
            }
            <form onSubmit={handleMantenimiento} noValidate={true}>
                <div className={stylesModal.contenedor_inputs}>
                    <div className={stylesModal.contenedor_input_fila}> 
                        {/* <div className={stylesModal.contenedor_input}>
                            <input 
                                className={stylesModal.input}
                                type="text" 
                                required
    
                                name="iata"
                                value={iata} 
                                onChange={handleAeropuertoInputChange}
                                disabled
                            />
                            <label className={stylesModal.input_label}>
                                <span className={stylesModal.input_span}>
                                    Código:
                                </span>
                            </label>
                        </div> */}
                        <div className={stylesModal.contenedor_input}>
                            <input 
                                className={stylesModal.input}
                                type="text" 
                                required

                                name="airport"
                                value={airport} 
                                onChange={handleAeropuertoInputChange}
                            />
                            <label className={stylesModal.input_label}>
                                <span className={stylesModal.input_span}>
                                    Airport:
                                </span>
                            </label>

                        </div>
                        <div className={stylesModal.contenedor_input}>
                            <input 
                                className={stylesModal.input}
                                type="text" 
                                required
                                name="city"
                                value={city} 
                                onChange={handleAeropuertoInputChange}
                            />
                            <label className={stylesModal.input_label}>
                                <span className={stylesModal.input_span}>
                                    City:
                                </span>
                            </label>
                        </div>

                    </div>
                    <div className={stylesModal.contenedor_input_fila}>
                        <div className={stylesModal.contenedor_input}>
                            <input 
                                className={stylesModal.input}
                                type="text" 
                                required
                                name="state"
                                value={state} 
                                onChange={handleAeropuertoInputChange}
                            />
                            <label className={stylesModal.input_label}>
                                <span className={stylesModal.input_span}>
                                    State:
                                </span>
                            </label>
                        </div>
                        <div className={stylesModal.contenedor_input}>
                            <input 
                                className={stylesModal.input}
                                type="text" 
                                required

                                name="country"
                                value={country} 
                                onChange={handleAeropuertoInputChange}
                            />
                            <label className={stylesModal.input_label}>
                                <span className={stylesModal.input_span}>
                                    Country:
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className={stylesModal.contenedor_input_fila}>
                        <div className={stylesModal.contenedor_input}>
                            <input 
                                className={stylesModal.input}
                                type="number" 
                                required

                                name="lat"
                                value={lat} 
                                onChange={handleAeropuertoInputChange}
                            />
                            <label className={stylesModal.input_label}>
                                <span className={stylesModal.input_span}>
                                    Latitud:
                                </span>
                            </label>
                        </div>
                        <div className={stylesModal.contenedor_input}>
                            <input 
                                className={stylesModal.input}
                                type="number" 
                                required

                                name="long"
                                value={long} 
                                onChange={handleAeropuertoInputChange}
                            />
                            <label className={stylesModal.input_label}>
                                <span className={stylesModal.input_span}>
                                    Longitud:
                                </span>
                            </label>
                        </div>
                    </div>                    
                </div>
                <p></p>
                <div className={stylesModal.contenedor_botones}>
                {
                    modoEdicion ?
                    <>
                        <button className={stylesModal.boton_principal} /* onClick={habilitarCampos(true)} */>Guardar</button>
                        <button type="submit" id="btn_eliminar" className={stylesModal.boton_principal_eliminar} onClick={(e) =>delete_Aeropuerto(e)}>Eliminar</button>
                        <button type="button" className={stylesModal.boton_secundario} onClick={cambiarModoEdicion}>Salir</button>
                    </>
                    :
                    <>
                        <button type="submit" className={stylesModal.boton_principal}>Guardar</button>
                        <button type="button" className={stylesModal.boton_secundario} onClick={cambiarModoEdicion}>Salir</button>
                    </>

                }
                </div>
            </form>

        </div>
    
        }
        </>
    
    )
}
