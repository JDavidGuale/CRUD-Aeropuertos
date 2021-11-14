import React, { useRef, useState } from 'react'
import { fetchConTokenFile } from '../../helpers/fetch';

import styles from "./fileUpload.module.css";
import {AiOutlineCloudUpload} from "react-icons/ai";
import { BsDownload,BsUpload } from "react-icons/bs";
// import { Preloader } from '../preloader/Preloader';

export const FileUpload = ({endpoint_post,endpoint_get,nombre,setToastVisible,setMensajeToast,setPreloader}) => {

    const fileInputField = useRef(null);
    const botonMigrar = useRef(null);
    const drop_zone_thumb = useRef(null);
    const drag_content = useRef(null);
    const drag_area = useRef(null);
    const cover = useRef(null);
    const [dragAreaText, setDragAreaText] = useState('Arrastre y suelte un archivo');
    const [file, setFile] = useState({});


    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("file", file);
            try {
                setPreloader(true);
                // console.log('subiendo..');
                const res = await fetchConTokenFile(endpoint_post,formdata,"POST");
                const body = await res.json();
                if (body.ok) {
                    setMensajeToast({
                        tipo:'exito',
                        mensaje: body.msg,
                    });
                    setToastVisible(true);
                }else{
                    setMensajeToast({
                        tipo:'error',
                        mensaje:body.msg
                    });
                    setToastVisible(true);
                }
                botonMigrar.current.disabled=true;
                drop_zone_thumb.current.style.display = 'none';
                drag_content.current.style.display = 'flex';
                setDragAreaText('Arrastre y suelte un archivo');
                setPreloader(false);
            } catch (error) {
                setPreloader(false);
                setMensajeToast({
                    tipo:'error',
                    mensaje:error
                });
                setToastVisible(true);
            }
    }

    const handleChange = (e) => {
        setFile(e.target.files[0]);
        // setDragAreaText(e.target.files[0].name);
        // botonMigrar.current.disabled=false;
        // drop_zone_thumb.current.style.display = 'flex';
        // drag_content.current.style.display = 'none';
        processFile(e.target.files[0]);

    }
    const handleDragOver = (e) => {
        e.preventDefault();
        drag_area.current.classList.add(`${styles.active}`);
        cover.current.classList.add(`${styles.cover}`);
        setDragAreaText('Soltar Aqui');

    }
    const handleDragLeave = (e) => {
        e.preventDefault();
        drag_area.current.classList.remove(`${styles.active}`);
        setDragAreaText('Arrastre y suelte un archivo');

    }

    const processFile = (file) =>{
        const docType = file.type;
        const validExtensions=['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
        if (validExtensions.includes(docType)) {
            setFile(file);
            setDragAreaText(file.name);
            botonMigrar.current.disabled=false;
            drop_zone_thumb.current.style.display = 'flex';
            drag_content.current.style.display = 'none';
        }else{
            setDragAreaText('Archivo no válido');
            botonMigrar.current.disabled=true;
            drop_zone_thumb.current.style.display = 'none';
            drag_content.current.style.display = 'flex';

        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        processFile(e.dataTransfer.files['0']);
        drag_area.current.classList.remove(`${styles.active}`);
        cover.current.classList.remove(`${styles.cover}`);
    }

    const descargarArchivo = async(e) => {
        e.preventDefault();
            try {
                setPreloader(true);
                const res = await fetchConTokenFile(endpoint_get);
                const archivo = res.blob();
                archivo.then( blob => {
                    saveFile(blob,`Ejemplo ${nombre}`);
                    // var file = window.URL.createObjectURL(blob);
                    // window.location.assign(file);
                });
                const body = await res.json();
                if (body.ok) {
                    setMensajeToast({
                        tipo:'exito',
                        mensaje: body.msg,
                    });
                    setToastVisible(true);
                }else{
                    setMensajeToast({
                        tipo:'error',
                        mensaje:body.msg
                    });
                    setToastVisible(true);
                }
                setPreloader(false);
            } catch (error) {
                setPreloader(false);
                setMensajeToast({
                    tipo:'error',
                    mensaje:error
                });
                setToastVisible(true);
            }
    }
    function saveFile (blob, filename) {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        }, 0)
    }
    return (
        <> 
        <form  encType="multipart/form-data" onSubmit={handleSubmit}>

                <div 
                    className={styles.drag_area} 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    ref={drag_area}
                >
                    <div 
                        // className={styles.cover} 
                        ref={cover}
                    ></div>
                    <div 
                    className={styles.drag_content}
                    ref={drag_content} 
                    
                    >
                        <div className={styles.icon}>
                            <AiOutlineCloudUpload/>
                        </div>
                        <h3>{dragAreaText}</h3>
                        <span>O</span>

                    </div>
                    <div 
                        className={styles.drop_zone_thumb} 
                        ref={drop_zone_thumb} 
                    >
                        {/* <img alt="" src={excel}/> */}
                        <label>{dragAreaText}</label>
                    </div>
                    <input 
                        className={styles.input__file} 
                        type="file" 
                        ref={fileInputField} 
                        id="input-file" 
                        onChange={handleChange}
                        hidden
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                        />
                    <button type="button" onClick={handleUploadBtnClick}>Seleccione un archivo</button>
                </div>
                <span className={styles.span}>Formato permitido: xlsx, xls.</span>
                <div className={styles.contenedor_botones}>
                    <button 
                        type="submit" 
                        className={styles.boton} 
                        disabled={true}
                        ref={botonMigrar}
                    >
                        <span className={styles.icon_button}>
                            <BsUpload/>
                        </span>
                        Migrar
                    </button>
                    <button 
                        type="button" 
                        className={styles.boton}
                        onClick={descargarArchivo}
                    >
                    <span className={styles.icon_button}>
                        <BsDownload/>
                    </span>
                        Ejemplo de {nombre}
                    </button>
                </div>
        </form>
        
        </>
    )
}
