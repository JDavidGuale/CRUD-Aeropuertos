import React, { useEffect } from 'react'
import styles from './preloader.module.css';


export const Preloader = ({preloader}) => {

    useEffect(() => {
        let tiempo;
        if (preloader === true) {
            tiempo = setTimeout(()=>{
            },10000)
        }

        return (() => clearTimeout(tiempo))
    }, [preloader])

    return (
        <>
        {
            preloader && 
            <div className={styles.contenedor}>
                <div className={styles.icwater}>
                    <div className={styles.icwater2}></div>
                </div>
            </div>
        }
        </>
    )
}
