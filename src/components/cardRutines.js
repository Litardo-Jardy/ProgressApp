import '../styles/globalStyles.css'
import '../styles/Rutines.css'
import CardExrcesiRoutines from './cardExerciseRoutines';
import useFetch from '../Services/useFetch';
import useFetchPost from '../Services/useFetchPos';

import { useForm } from '../Services/useForm';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { FaRegEdit } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaSave } from "react-icons/fa";

const CardRutines = (props) => {

   const [exercise, setExercise] = useState([]);
   const [deletes, setDeletes] = useState(false);
   const [edits, setEdits] = useState([false,"","","",""]);
   const [nombre, setNombre] = useState("");
   const [descripcion, setDescripcion] = useState("");
   const [rango, setRango] = useState("");
   const [select, setSelect] = useState(0);
   const [options, setOptions] = useState([]);

   const {  post_data } = useFetchPost(`view_category`);
    useEffect(() => {
        if(post_data){
          setOptions(post_data.Categorys)}
    }, [post_data]);

    const handleChangeNombre = (e) =>{
       setNombre(e.target.value)}
    const handleChangeDescripcion = (e) =>{
       setDescripcion(e.target.value)}
    const handleChangeRango = (e) =>{
       setRango(e.target.value)}
    const handleChangeSelect = (e) =>{
       setSelect(e.target.value)}

   const rediret = (id, name) =>{
      window.location.href = `/Routines/${id}/${name}`}   

   const deleteRoutines = (id_routines) => {
      const resultado = window.confirm("¿Estás seguro de eliminar esta rutina?");
      if(resultado){
         const {} = postMethod(`delete_rutina&id=${id_routines}`);
         setError(["block", "green", "La rutina se elimino con exito."])
        setDeletes(!deletes)
      }}

   const editInfoRoutines = () => {
      const resultado = window.confirm("¿Estás seguro de editar esta rutina?");
      if(resultado){
         if (nombre !== "" && descripcion !== "" && rango !== ""){
            if (descripcion.length < 500){
            if (select != 0){
               const {} = postMethod(`edit_rutina&id=${id}&name=${nombre}&descripcion=${descripcion}&categoria=${parseInt(select)}&rango=${rango}&public=0`);
               setError(["block", "green", "La rutina se edito con exito."]);
               setEdits([true, nombre, descripcion, select, rango]);
               setShow(!show);
            }else{
                setError(["block", "red", "Debe escoger una categoria."])}
            }else{
                setError(["block", "red", "Exceso de caracteres."])}
            }else{
                setError(["block", "red", "No puede haber campos vacíos."])}
      }}

   const {show, id, 
         setShow, setId, setError,
          MessageErros} = useForm(editInfoRoutines);

   const showEdit = ( id_routines, Titulo, Descripcion, Rango, Categoria ) =>{
      setNombre(Titulo);
      setRango(Rango);
      setDescripcion(Descripcion);
      setSelect(Categoria);
      setId(id_routines);
      setShow(!show)}

      const { data, loading, errors, postMethod } = useFetch(`view_rutina_ejercicio&id=${props.id}`);
      useEffect(() => {
         if(data){
            if (data.Routines[0].id > 0){
               setExercise(data.Routines)}}
     }, [data]);

    return(
      <>
      <MessageErros />
      <div className='create_card'>
          <div className='container_title_card'>
            {deletes ?
            <h3 style={  { textDecoration: "line-through", textDecorationColor:" red" } } className='title_card'>{edits[0] == false ? props.title : edits[1]}<br />---------------------------------------</h3> 
             :<h3 className='title_card'>{edits[0] == false ? props.title : edits[1]}<br />---------------------------------------</h3>}
             <span className='icon_card_container_rutines'>
               {deletes == false ?<Link to="/Exercises"><FaPlusCircle className="icon_card_rutines" size="23px" color="green" /></Link> : null}
               {deletes == false ? <FaRegEdit onClick={() => showEdit(props.id, props.title, props.descripcion, props.rango, props.id_categoria)} className="icon_card_rutines" size="25px" color="#749BC2" /> : null} 
               {deletes == false ? <RiDeleteBin6Line onClick={() => deleteRoutines(props.id)} className="icon_card_rutines" size="25px" color="red" /> :null}
             </span>
          </div>
          <Link style={{ textDecoration: 'none', color: '#000' }} to={`/Routines/${props.id}/${props.title}`}>
          <div  className='container_info_rutine'>
             <p key={1} style={{ width: '45%'}} className='text_caracteristicas'><span className='text_title_caracteristicas'>Categoria:</span><br /> {props.categoria} </p>
             <p key={2} style={{ width: '45%'}} className='text_caracteristicas'><span className='text_title_caracteristicas'>Rando de reps:</span><br /> ({edits[0] == false ? props.rango: edits[4]})</p>
          </div>
          <div className='container_exercise_rutine'>
             { errors && <p className="text_errores" style={{ textAlign: "start"}} >Hubo errores al cargar los datos. Intentalo mas tarde.</p> }
             { loading && <p className="text_errores" >Cargando...</p> }
             {exercise.length > 0 ? exercise.map(element =>
                <CardExrcesiRoutines 
                key={element.id_ejercicio}
                name={element.nombre_ejercicio} 
                series={element.serie} 
                reps={element.reps} 
                peso={` ${element.peso}kg`}/>
             ): <p style={{ textDecoration: 'none'}}>- No hay ejercicios disponibles.</p>}
          </div>
          </Link>
          <div className='container_descripcion_routine'>
              <p className='text_caracteristicas'>{edits[0] == false ? props.descripcion : edits[2]}</p>
          </div>
      </div>
      <div style={{ display: show ? "flex": "none", width: "300px" }} className="container_create_exercise_one">
            <div className="create_card">
                 <div className='container_title_card'>
                    <h3 className='title_card'>Editar rutina<br />---------------------------------------</h3>
                    <span className='icon_card'><FaSave onClick={editInfoRoutines} className="icon_card_click" size="28px" color="#749BC2" /></span>
                 </div>
                    <div className="container_form_exercise">
                      <input 
                        type='text' 
                        placeholder="Ingresar nombre..." 
                        value={nombre}
                        onChange={handleChangeNombre}
                        className="exercise_input exercise_nombre" />   
                      <input 
                        type='text' 
                        placeholder="Ingresar rango de reps: (8 - 15)" 
                        id="rango_routines_Card" 
                        value={rango}
                        onChange={handleChangeRango}
                        className="exercise_input exercise_nombre" /> 
                      <select id="select_routines_Card" value={select} onChange={handleChangeSelect}  className="exercise_input exercise_nombre" >
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
                        value={descripcion}
                        onChange={handleChangeDescripcion}
                        className="exercise_input exercise_descripcion" />
                    </div>
            </div>
            </div>
      </>
    )}

export default CardRutines;