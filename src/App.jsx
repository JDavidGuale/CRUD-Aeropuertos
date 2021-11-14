
import React from 'react';

import { MntAeropuerto } from './MntAeropuerto';
// import shortid from 'shortid';

function App() {

 /*  const getDatos = async() => {
    try {
      // setPreloader(true);
      const res = await fetchSinToken(`${endpoint_get}`); 
      const body = await res.json();
      setAeropuertos(body['aeropuertos']);
      // if (body.ok) {
      //     for (var key in body) {
      //       if (key !== 'ok') {
      //       }
      //     }
      //   }else{
      //    console.log(body.msg)
      // }
      console.log(body)
      // setPreloader(false);
  
    } catch (error) {
      // setPreloader(false)
      console.log(error)
    }
}

  useEffect(()=>{
    getDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const limpiarInputs = () => {
    setCodigo('')
    setAirport('')          
    setCountry('')
    setState('')
    setCity('')
    setLat('')
    setLong('')
  }

  const agregarAeropuertos = async(e) => {
    e.preventDefault()    
    if (!_id.trim()) {   
      setError('Escriba algo por favor')
      return              
    }
    const data= { 
      iata: _id,
      airport: airport,
      city: city,
      state: state,
      country: country,
      lat: lat,
      long: long,
    } 

    try {
      // setPreloader(true);
      const res = await fetchSinToken(`${endpoint_post}`,data,"POST");
      const body = await res.json();
      console.log(body);
    } catch (error) {
      console.log(error)
    }
    setAeropuertos([           
      ...aeropuertos,        
      { 
        _id: _id,
        airport: airport,
        city: city,
        state: state,
        country: country,
        lat: lat,
        long: long,
      }  
    ])

    limpiarInputs()          
    setError(null)
  }

  const eliminarAeropuerto = async(_id) => {
    try {
      // setPreloader(true);
      const res = await fetchSinToken(`${endpoint_post}/${_id}`,{},"DELETE");
      const body = await res.json();
      console.log(body);
    } catch (error) {
      console.log(error)
    }
    const arrayFiltrado = aeropuertos.filter(item => item._id !== _id)   //recorre todos los items y los agrega si el id es diferente al que se recibe
    setAeropuertos(arrayFiltrado)
  }

  const editar = item => {
    setModoEdicion(true)
    setCodigo(item._id)
    setAirport(item.airport)
    setCity(item.city)
    setCountry(item.country)
    setState(item.state)
    setLat(item.lat)
    setLong(item.long)
    setId(item.id)
  }

  const editarAeropuerto = async(e) => {
    e.preventDefault()
    if (!_id.trim()) {
      setError('Escriba algo por favor')
      return
    }
    const data= { 
      iata: _id,
      airport: airport,
      city: city,
      state: state,
      country: country,
      lat: lat,
      long: long,
    } 

    try {
      // setPreloader(true);
      const res = await fetchSinToken(`${endpoint_put}/${_id}`,data,"PUT");
      const body = await res.json();
      console.log(body);
      // if (body.ok) {
      //     // setMensajeToast({
      //     //     tipo:'exito',
      //     //     mensaje: 'Aeropuerto actualizado!'
      //     // });
      //     // setPreloader(false);
      //     // setToastVisible(true);
      //     // setRecargarTabla(true);
      //     // cambiarModoEdicion(false);
      // }else{
      // console.log("error put")
      //     // setMensajeToast({
      //     //     tipo:'error',
      //     //     mensaje:body.msg
      //     // });
      //     // setPreloader(false);
      //     // setToastVisible(true);
      // }
  } catch (error) {
      // // setPreloader(false);
      // setMensajeToast({
      //     tipo:'error',
      //     mensaje:error
      // });
      // setToastVisible(true);
      console.log(error)
  }
    const arrayEditado = aeropuertos.map(
      item => item._id === _id 
      ? 
      { 
        _id: _id,
        airport: airport,
        city: city,
        state: state,
        country: country,
        lat: lat,
        long: long,
      } : item
    )

    setAeropuertos(arrayEditado)
    setModoEdicion(false)
    limpiarInputs()
    setError(null)
  } */


  return (
    <>
        <MntAeropuerto/>
    </>
    // <div className="container mt-5">
    //   <h1 className="text-center">Aeropuertos</h1>
    //   <hr />
    //   <div className="row">
    //   <div className="col-9">
    //     <div className="overflow-auto">
    //       <h4 className="text-center">Listado de aeropuertos</h4>
    //       <table className="table table-striped">
    //         <thead className="thead-dark">
    //           <tr>
    //           {
    //               header.map(item => (
    //                 <th key={item}>{item}</th>
    //               ))
    //           }
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {
    //             aeropuertos.map((item) => (
    //               <tr key={item._id} id={item._id}>
    //                 <td >{item._id}</td>
    //                 <td >{item.airport}</td>
    //                 <td >{item.city}</td>
    //                 <td >{item.state}</td>
    //                 <td >{item.country}</td>
    //                 <td >{item.lat}</td>
    //                 <td >{item.long}</td>
    //                 <td >
    //                   <button
    //                     className="btn btn-danger btn-sm float-right mx-2"
    //                     onClick={() => eliminarAeropuerto(item._id)}
    //                   >
    //                     Eliminar
    //                   </button>
    //                 </td>
    //                 <td >
    //                   <button
    //                     className="btn btn-warning btn-sm float-right"
    //                     onClick={() => editar(item)}
    //                   >
    //                     Editar
    //                   </button>
    //                 </td>
    //               </tr>
    //             ))
    //           }
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>

    //     <div className="col-3">
    //       <h4 className="text-center">
    //         {modoEdicion ? 'Editar aeropuerto' : 'Agregar aeropuerto'}
    //       </h4>
    //       <form onSubmit={modoEdicion ? editarAeropuerto : agregarAeropuertos}>
            
    //         {
    //           error ? <span className="text-danger">{error}</span> : null
    //         }
            
    //         <input
    //           type="text"
    //           className="form-control mb-2"
    //           placeholder="Código"
    //           onChange={e => setCodigo(e.target.value)}
    //           value={_id}
    //         />
    //         <input
    //           type="text"
    //           className="form-control mb-2"
    //           placeholder="Aeropuerto"
    //           onChange={e => setAirport(e.target.value)}
    //           value={airport}
    //         />
    //         <input
    //           type="text"
    //           className="form-control mb-2"
    //           placeholder="Ciudad"
    //           onChange={e => setCity(e.target.value)}
    //           value={city}
    //         />
    //         <input
    //           type="text"
    //           className="form-control mb-2"
    //           placeholder="Estado"
    //           onChange={e => setState(e.target.value)}
    //           value={state}
    //         />
    //         <input
    //           type="text"
    //           className="form-control mb-2"
    //           placeholder="Country"
    //           onChange={e => setCountry(e.target.value)}
    //           value={country}
    //         />
    //         <input
    //           type="text"
    //           className="form-control mb-2"
    //           placeholder="Latitud"
    //           onChange={e => setLat(e.target.value)}
    //           value={lat}
    //         />
    //         <input
    //           type="text"
    //           className="form-control mb-2"
    //           placeholder="Longitud"
    //           onChange={e => setLong(e.target.value)}
    //           value={long}
    //         />

    //         {
    //           modoEdicion ? (
    //             <button className="btn btn-warning btn-block" type="submit">Editar</button>
    //           ) : (
    //             <button className="btn btn-dark btn-block" type="submit">Agregar</button>
    //           )
    //         }
    //       </form>
    //     </div>
    //   </div>

    // </div>
  );
}

export default App;
