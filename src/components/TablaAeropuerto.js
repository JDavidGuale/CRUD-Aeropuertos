import React, { useState } from 'react';

import styles from '../global.module.css';
import { BiSkipPrevious,BiSkipNext } from "react-icons/bi";

export const TablaAeropuerto = ({ dataComplete,setModalVisible,setSelectRow,setModoEdicion}) => {
    
  const header=['Codigo','Aeropuerto','Ciudad','Estado','Pais','Latitud','Longitud','opciones'];

  const obtenerValores = (e) => {
    var row=[];
    var id= e.target.parentNode.parentNode;
      row=id.id;
      setSelectRow(row);
      setModalVisible(true);
      setModoEdicion(true);
  }

  const [currentPage, setCurrentPage] = useState(0);
  const num_filas=10;
  const num_paginas=Math.round(dataComplete.length /num_filas);
  
  // const [num_paginas, setNumPaginas] = useState(Math.round(dataComplete.length /num_filas));
  const [search, setSearch] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  
  const filtrarAeropuertos = () => {
    if (search.length === 0) {
      return dataComplete.slice(currentPage, currentPage+num_filas);
    }
    const filtered = dataComplete.filter(fila => 
                                                  // fila.iata.toLowerCase().includes(search) ||
                                                  fila.airport.toLowerCase().includes(search) ||
                                                  fila.city.toLowerCase().includes(search) ||
                                                  fila.country.toLowerCase().includes(search) ||
                                                  fila.lat.toLowerCase().includes(search) ||
                                                  fila.long.toLowerCase().includes(search) ||
                                                  fila.state.toLowerCase().includes(search)
                                                  );
    return filtered.slice(currentPage,currentPage+num_filas);
  }

  const nextPage = () => {
    if (dataComplete.filter(fila =>  
    // fila.iata.toLowerCase().includes(search) ||
    fila.airport.toLowerCase().includes(search) ||
    fila.city.toLowerCase().includes(search) ||
    fila.country.toLowerCase().includes(search) ||
    fila.lat.toLowerCase().includes(search) ||
    fila.long.toLowerCase().includes(search) ||
    fila.state.toLowerCase().includes(search)
    ).length > currentPage + num_filas) {
      setCurrentPage(currentPage + num_filas);
      setPaginaActual(paginaActual+1);
    }
  }

  const prevPage = () => {
      if(currentPage>0){
        setCurrentPage(currentPage - num_filas);
        if (paginaActual!==1) {
          setPaginaActual(paginaActual-1);
          
        }
      }

  }

  const onSearchChange = ({target}) => {
    setCurrentPage(0);
    // setNum_paginas(Math.round(filtrarAeropuertos().length/num_filas));
    setPaginaActual(1);
    setSearch(target.value.toLowerCase());
  }


    return (
        <>
          <div className={styles.contenedor_paginacion}>
            <div className={styles.contenedor_inputSearch}>
              <input
                  type="search"
                  className={styles.inputSearch}
                  placeholder="Buscar"
                  value={search}
                  onChange={onSearchChange}
                />
            </div>  
            <div className={styles.contenedor_botones}>
              <button className={styles.boton_paginacion} onClick={prevPage}><BiSkipPrevious/></button>
              &nbsp;
              <span className={styles.num_paginas}>
                {paginaActual} de {num_paginas}
              </span>
              &nbsp;
              <button className={styles.boton_paginacion} onClick={nextPage}><BiSkipNext/></button>
            </div>
          </div >
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
              {
                  header.map(item => (
                    <th key={item}>{item}</th>
                  ))
              }
              </tr>
            </thead>
            <tbody >
              {
              filtrarAeropuertos().map((item) => (
                <tr key={item._id} id={item._id}>
                  <td >{item.iata}</td>
                    <td >{item.airport}</td>
                    <td >{item.city}</td>
                    <td >{item.state}</td>
                    <td >{item.country}</td>
                    <td >{item.lat}</td>
                    <td >{item.long}</td>
                    <td onClick={obtenerValores}>
                      <button
                        className="btn btn-warning btn-sm float-right"
                        // onClick={() => obtenerValores}
                      >
                        Editar
                      </button>
                    </td>
                </tr>
                ))
              }
            </tbody>
          </table>
        </>
        
    )
}
