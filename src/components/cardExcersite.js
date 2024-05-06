
import '../styles/Exercises.css'
import useFetch from '../Services/useFetch';

import { useState, useEffect } from 'react';

import { FaPlusCircle } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const CardExercise = (props) =>{

    const [routines, setRoutines] = useState([]);
    const [reps, setReps] = useState("");
    const [series, setSeries] = useState("");
    const [peso, setPeso] = useState("");
    const [tiempo, setTiempo] = useState("");
    const [intensidad, setIntensidad] = useState("");
    const [rutinas, setrutinas] = useState(0);
      const datosStorage = localStorage.getItem('user');
      const user = JSON.parse(datosStorage);

    const [error, setError] = useState(["none", "", ""]);
    const [show, setShow] = useState(false);

    const handleChangeReps = (e) =>{
      setReps(e.target.value)}
    const handleChangePeso = (e) =>{
      setPeso(e.target.value)}
    const handleChangeIntensidad = (e) =>{
      setIntensidad(e.target.value)}
    const handleChangeTiempo = (e) =>{
      setTiempo(e.target.value)}
    const handleChangeRutinas = (e) =>{
        setrutinas(e.target.value)}
    const handleChangeSeries = (e) =>{
        setSeries(e.target.value)}

    const { data,  postMethod } = useFetch(`view_rutina&user=${user.id}`);
    useEffect(() => {
        if(data){
          setRoutines(data.Routines)}
          console.log(user.id);
    }, [data]);

    const showCreateEspe = () => {
        setShow(!show);}

    const createEspecificacion = (id) => {
        if(peso !== 0 && reps !== 0 && tiempo !== "" && series ){
        if(tiempo.length < 6 ){
        if(rutinas !== 0){
        if(intensidad !== ""){
            const {} = postMethod(`create_rutina_ejercicio&rutina=${rutinas}&series=${series}&reps=${reps}&peso=${peso}&tecnica=${100}&tiempo=${tiempo}&intensidad=${intensidad}&ejercicio=${id}`);
            setError(["block", "green", "Se agrego con éxito el a la rutina."]);
            setShow(!show);
        }else{
            setError(["block", "red", "Debe seleccionar la intensidad."])}
        }else{
            setError(["block", "red", "Debe seleccionar una rutina."])}
        }else{
            setError(["block", "red", "El tiempo no tiene el formato correcto."])}
        }else{
            setError(["block", "red", "No puede haber campos vacíos."])}}

    const deleteError = () => {
        setError(["none", "", ""])}

    return(
        <>
        <div className='create_card'>
            <div onClick={deleteError}  style={{ display: error[0], color: error[1] }} className="message_exercise">
                <p className="message_exercise_text"> {error[1] == "red" ? <IoCloseSharp className="message_exercises_icon" size="22px" /> : <FaCheck className="message_exercises_icon" size="22px" />} {error[2]} <br /><span className="message_exercises_text_close">(Toca para eliminar)</span></p>
            </div>
            <div className='container_title_card'>
               <h3 className='title_card'>{props.title}<br />---------------------------------------</h3>
               <span className='icon_card'><FaPlusCircle onClick={showCreateEspe} className="icon_card_click" size="28px" color="#749BC2" /></span>
            </div>
            <div className="container_image">
              <div className='image_exercise'>
                 <img style={{ objectFit: "fill" }} width="270px" height="300px" src={props.url} />
              </div>
            </div>
            <p style={{ margin: "10px"}} className='descripcion_card'>{props.descripcion}</p>
        </div>
        <div style={{ display: show ? "flex": "none", width: "300px"}} className="container_create_exercise_one">
             <div className="create_card">
                  <div className='container_title_card'>
                     <h3 className='title_card'>Agregar ejercicio<br />---------------------------------------</h3>
                     <span className='icon_card'><FaSave onClick={() => createEspecificacion(props.id)} className="icon_card_click" size="28px" color="#749BC2" /></span>
                  </div>
                  <div className="container_form_exercise">
                    <input 
                      type='number' 
                      placeholder="Ingresar cant de series..." 
                      value ={series}  
                      onChange={handleChangeSeries}
                      className="exercise_input exercise_nombre" />

                    <input 
                      type='number' 
                      placeholder="Ingresar cant reps..." 
                      value ={reps}  
                      onChange={handleChangeReps}
                      className="exercise_input exercise_nombre" />

                    <input 
                      type='number' 
                      placeholder="Ingresar cant peso..." 
                      value ={peso} 
                      onChange={handleChangePeso}
                      className="exercise_input exercise_nombre" />
 
                    <select value={intensidad} onChange={handleChangeIntensidad}  className="exercise_input exercise_nombre" >
                        <option value="">Intensidad:</option>
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select> 

                    <select value={rutinas} onChange={handleChangeRutinas}  className="exercise_input exercise_nombre" >
                    <option >Rutinas:</option>
                         {routines.length > 0 ? routines.map(element => 
                            <option key={element.id} value={element.id}>
                                {element.titulo}
                            </option>
                            ): null}
                    </select>

                    <input 
                      type='text' 
                      placeholder="Ingresar tiempo: 00:30" 
                      value ={tiempo} 
                      onChange={handleChangeTiempo}
                      className="exercise_input exercise_nombre" />
                  </div>
             </div>
          </div>
        </>
    )}
export default CardExercise;