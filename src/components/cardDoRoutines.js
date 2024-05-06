import '../styles/globalStyles.css'
import '../styles/doRoutines.css'

import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from 'react';
import { useForm } from '../Services/useForm';
import { FaSave } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const CardDoRoutines = (props) =>{

    const [id, setId] = useState("");
    const [intensidad, setIntensidad] = useState("");
    const [series, setSeries] = useState("");
    const [peso, setPeso] = useState("");
    const [reps, setReps] = useState("");
    const [tiempo, setTiempo] = useState("");
    const [edits, setEdits] = useState([false,"","","","",""]);
    const [show, setShow] = useState(false);
    const [deletes, setDeletes] = useState(false);
    const {setError, MessageErros, postMethod } = useForm(null);

    const handleChangeReps = (e) =>{
        setReps(e.target.value)}
      const handleChangePeso = (e) =>{
        setPeso(e.target.value)}
      const handleChangeIntensidad = (e) =>{
        setIntensidad(e.target.value)}
      const handleChangeTiempo = (e) =>{
        setTiempo(e.target.value)}
      const handleChangeSeries = (e) =>{
          setSeries(e.target.value)}

    const editInfoExercise = () => {
        const resultado = window.confirm("¿Estás seguro de editar este ejercicio?");
        if(resultado){
           if (intensidad !== "" && series !== "" && peso !== "" && reps !== ""&& tiempo !== ""){
            if(tiempo.length < 9 ){
                const {} = postMethod(`edit_rutina_ejercicio&id=${id}&series=${series}&reps=${reps}&peso=${peso}&tiempo=${tiempo}&intensidad=${intensidad}`);
                setError(["block", "green", "El ejercicio se edito con éxito."]);
                setEdits([true, intensidad, series, peso, reps, tiempo]);
                setShow(!show);
            }else{
                setError(["block", "red", "El tiempo no tiene el formato correcto."])}
            }else{
                setError(["block", "red", "No puede haber campos vacíos."])}
        }}

    const showEdit = ( id, intensidad, series, peso, reps, tiempo ) =>{
        setId(id);
        setIntensidad(intensidad);
        setSeries(series);
        setPeso(peso);
        setReps(reps);
        setTiempo(tiempo);
        setShow(!show)}

    const deleteExercise = (id) => {
        const resultado = window.confirm("¿Estás seguro de eliminar este ejercicio?");
        if(resultado){
           const {} = postMethod(`delete_rutina_ejercicio&id=${id}`);
           setError(["block", "green", "El ejercicio se elimino con exito."])
          setDeletes(!deletes)}}

     return(
       <>
         <div className='create_card'>
             <MessageErros />
             <div className='container_title_card'>
                 {deletes ?
              <h3 style={  { textDecoration: "line-through", textDecorationColor:" red" } } className='title_card'>{props.ejercicio}<br />-----------------------------</h3> 
               :<h3 className='title_card'>{props.ejercicio}<br />-----------------------------</h3>}
                 <span className='icon_card_container_rutines'>
                 {deletes == false ? <FaRegEdit onClick={() => showEdit(props.id, props.intensidad, props.series, props.peso, props.reps, props.tiempo)} className="icon_card_rutines" size="25px" color="#749BC2" /> : null} 
                 {deletes == false ? <RiDeleteBin6Line onClick={() => deleteExercise(props.id)} className="icon_card_rutines" size="25px" color="red" /> :null}
               </span>
              </div>
              <div className='container_info_rutine'>
                 <p className='text_caracteristicas'><span className='text_title_caracteristicas'>Tiempo:</span><br />{edits[0] == false ? props.tiempo: edits[5]}</p>
                 <p className='text_caracteristicas'><span className='text_title_caracteristicas'>Intensidad:</span><br /> {edits[0] == false ? props.intensidad: edits[1]}</p>
                 <p className='text_caracteristicas'><span className='text_title_caracteristicas'>Series:</span><br /> {edits[0] == false ? props.series: edits[2]}</p>
                 <p className='text_caracteristicas'><span className='text_title_caracteristicas'>Peso:</span><br /> {edits[0] == false ? props.peso: edits[3]}kg</p>
                 <p className='text_caracteristicas'><span className='text_title_caracteristicas'>tecnica:</span><br /> {props.tecnica}%</p>
                 <p className='text_caracteristicas'><span className='text_title_caracteristicas'>Reps:</span><br /> {edits[0] == false ? props.reps: edits[4]}</p>
              </div>
              <div className="container_image">
                  <div className='image_exercise'>
                      <img style={{ objectFit: "fill" }} width="270px" height="300px" src={props.url} />
                  </div>
              </div>
              <p style={{ width: '100%' }} className='text_caracteristicas'><span className='text_title_caracteristicas'>Descripcion:</span><br />{props.descripcion}</p>
         </div>
         <div style={{ display: show ? "flex": "none", width: "300px"}} className="container_create_exercise_one">
             <div className="create_card">
                  <div className='container_title_card'>
                     <h3 className='title_card'>Editar ejercicio<br />---------------------------------------</h3>
                     <span className='icon_card'><FaSave onClick={editInfoExercise} className="icon_card_click" size="28px" color="#749BC2" /></span>
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

                    <input 
                      type='text' 
                      placeholder="Ingresar tiempo: 00:30" 
                      value ={tiempo} 
                      onChange={handleChangeTiempo}
                      className="exercise_input exercise_nombre" />
                  </div>
             </div>
          </div>
       </>)}

export default CardDoRoutines;