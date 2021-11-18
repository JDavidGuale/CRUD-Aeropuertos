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
            // <div className={styles.contenedor}>
            //     <div className={styles.icwater}>
            //         <div className={styles.icwater2}></div>
            //     </div>
            // </div>
            <div className={styles.contenedor}>
            <div className={styles.wrapper}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
                <span>Loading</span>
            </div>

            </div>
        }
        </>
    )
}
