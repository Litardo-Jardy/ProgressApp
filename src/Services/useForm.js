import '../styles/Rutines.css'
import '../styles/globalStyles.css'
import useFetch from '../Services/useFetch';

import { useEffect, useState } from 'react';
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

export const useForm = (saveInfo) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [rango, setRango] = useState("");
    const [select, setSelect] = useState(0);
    const [options, setOptions] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(["none", "", ""]);
    const [id, setId] = useState(0);

    const deleteError = () => {
        setError(["none", "", ""])}

    const { data, postMethod } = useFetch(`view_category`);
    useEffect(() => {
        if(data){
          setOptions(data.Categorys)}
    }, [data]);

    const FormRoutines = () =>{
        return(
            <div style={{ display: show ? "flex": "none", width: "300px" }} className="container_create_exercise_one">
            <div className="create_card">
                 <div className='container_title_card'>
                    <h3 className='title_card'>Crear nueva rutina<br />---------------------------------------</h3>
                    <span className='icon_card'><FaSave onClick={saveInfo} className="icon_card_click" size="28px" color="#749BC2" /></span>
                 </div>
                    <div className="container_form_exercise">
                      <input 
                        type='text' 
                        placeholder="Ingresar nombre..." 
                        id="nombre_routines"
                        className="exercise_input exercise_nombre" />   
                      <input 
                        type='text' 
                        placeholder="Ingresar rango de reps: (8 - 15)" 
                        id="rango_routines" 
                        className="exercise_input exercise_nombre" /> 
                      <select id="select_routines" defaultValue={select}  className="exercise_input exercise_nombre" >
                        <option >Categorias:</option>
                         {options.length > 0 ? options.map(element => 
                            <option key={element.id} value={element.id}>
                                {element.titulo}
                            </option>
                            ): null}
                      </select>  
                      <textarea
                        placeholder="Ingresar descripcion..." 
                        id="descripcion_routines" 
                        rows={4}
                        className="exercise_input exercise_descripcion" />
                    </div>
            </div>
            </div>)}

    const FormCardRoutines = () =>{
        return(
            <div style={{ display: show ? "flex": "none", width: "300px" }} className="container_create_exercise_one">
            <div className="create_card">
                 <div className='container_title_card'>
                    <h3 className='title_card'>Crear nueva rutina<br />---------------------------------------</h3>
                    <span className='icon_card'><FaSave onClick={saveInfo} className="icon_card_click" size="28px" color="#749BC2" /></span>
                 </div>
                    <div className="container_form_exercise">
                      <input 
                        type='text' 
                        placeholder="Ingresar nombre..." 
                        id="nombre_routines_Card"
                        defaultValue={nombre}
                        className="exercise_input exercise_nombre e_" />   
                      <input 
                        type='text' 
                        placeholder="Ingresar rango de reps: (8 - 15)" 
                        id="rango_routines_Card" 
                        defaultValue={rango}
                        className="exercise_input exercise_nombre e_r" /> 
                      <select id="select_routines_Card e_s" defaultValue={select}  className="exercise_input exercise_nombre" >
                        <option >Categorias:</option>
                         {options.length > 0 ? options.map(element => 
                            <option key={element.id} value={element.id}>
                                {element.titulo}
                            </option>
                            ): null}
                      </select>  
                      <textarea
                        placeholder="Ingresar descripcion..." 
                        id="descripcion_routines_Card" 
                        rows={4}
                        defaultValue={descripcion}
                        className="exercise_input exercise_descripcion e_d" />
                    </div>
            </div>
            </div>)}

    const FormExercises = () =>{
        return(
            <div style={{ display: show ? "flex": "none", width: "300px"}} className="container_create_exercise_one">
               <div className="create_card">
                    <div className='container_title_card'>
                       <h3 className='title_card'>Proponer nuevo ejercicio<br />---------------------------------------</h3>
                       <span className='icon_card'><FaSave onClick={saveInfo} className="icon_card_click" size="28px" color="#749BC2" /></span>
                    </div>
                    <div className="container_form_exercise">
                      <input 
                        type='text' 
                        placeholder="Ingresar nombre..." 
                        id="nombre_exercise"  
                        className="exercise_input exercise_nombre" />
   
                      <textarea
                        placeholder="Ingresar descripcion..." 
                        id="descripcion_exercise" 
                        rows={4}
                        className="exercise_input exercise_descripcion" />
                    </div>
               </div>
            </div>)}

    const MessageErros = () =>{
        return(
            <div onClick={deleteError}  style={{ display: error[0], color: error[1] }} className="message_exercise">
                <p className="message_exercise_text"> {error[1] == "red" ? <IoCloseSharp className="message_exercises_icon" size="22px" /> : <FaCheck className="message_exercises_icon" size="22px" />} {error[2]} <br /><span className="message_exercises_text_close">(Toca para eliminar)</span></p>
            </div>)}

    return {
        show,
        error,
        nombre,
        descripcion,
        rango,
        select,
        options,
        id,
        setId,
        setShow,
        setError,
        setNombre,
        setDescripcion,
        setRango,
        setSelect,
        setOptions,
        MessageErros,
        FormRoutines,
        FormExercises,
        postMethod,
        FormCardRoutines}
}