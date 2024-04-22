import '../styles/globalStyles.css';
import '../styles/doRoutines.css';
import useFetch from '../Services/useFetch';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CardDoRoutines from './cardDoRoutines';
import { FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const DoRoutines = () =>{

    const { id, name } = useParams();
    const [routines, setRoutines] = useState([]);
    const { data, loading, errors, postMethod } = useFetch(`view_rutina_ejercicio&id=${id}`);

    useEffect(() => {
        if(data){
          if(data.Routines[0].id > 0){
            if(data.Routines[0].nombre_rutina == name){
                setRoutines(data.Routines)}}}
    }, [data]);

    return(
      <div className='container'>
          <Navbar />
          <div className='container_doroutine'>
          {routines.length > 0 ? 
               <div  className='title_doroutines_card'>
                <div>
                    <h2 className='title_unique_doroutine'>{data.Routines[0].nombre_rutina}</h2>
                </div>
                <div className='button_dorouties_one'>
                    <Link style={{ textDecoration: 'none', color: '#000'}} to={`/Routines/${id}/${name}/realizar`}>
                    Iniciar rutina
                    </Link>
                </div>
               </div>
          
          : null}
            <div className='container_cards'>
             { errors && <p className="text_errores" >Hubo errores al cargar los datos. Intentalo mas tarde.</p> }
             { loading && <p className="text_errores" >Cargando...</p> }  
             {routines.length > 0 ? routines.map(element => 
               <CardDoRoutines 
                 key={element.id}
                 ejercicio={element.nombre_ejercicio} 
                 series={element.serie} 
                 intensidad={element.intensidad}
                 reps={element.reps}
                 peso={element.peso}
                 tiempo={element.tiempo} 
                 id={element.id}
                 tecnica={element.tecnica}
                 descripcion={element.descripcion_ejercicio}
                 url={element.images}
               />
               ): !loading && <span className="text_errores">No hay elementos para mostrar.</span>}
            </div>
          </div>
      </div>
    )}
export default DoRoutines;