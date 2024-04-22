
import '../styles/Exercises.css'
import useFetch from '../Services/useFetch';

import { useState } from 'react';

import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { uploadImg } from '../Services/Firebase/firebaseConfig';

const CardAdminDashboard = (props) =>{

    const [array, setArray] = useState([false, "",""]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [edit, setEdit] = useState("none");
    const [image, setImage] = useState(null);

    //Control de inputs.
    const handleChangeNombre = (e) =>{
        setNombre(e.target.value)}

    const handleChangeDescripcion = (e) =>{
        setDescripcion(e.target.value)}

    const hadleChangeImage = (e) =>{
        setImage(e.target.files[0])}

    //Fubciones para permitir, rechazar y editar peticiones.
    const { postMethod } = useFetch('view_ejercicio');
    const requestsAccept = (info, color, state) =>{
       const {} = postMethod(info);
       setArray([true, color, state])
       setEdit("none");}

    const allowExercise = (ejercicio, titulo, descripcion, user) =>{
        requestsAccept(`edit_ejercicio&id=${ejercicio}&name=${titulo}&descripcion=${descripcion}&public=${1}`,"green","Aceptado");
        requestsAccept(`create_notificaciones&user=${user}&message=¡Felícidades tu peticion a sido aceptada! ${titulo} ya esta disponible como ejercicio.`,"green","Aceptado")}

    const deleteExercise = (ejercicio, titulo, user) =>{
        requestsAccept(`delete_ejercicio&id=${ejercicio}`,"red","Rechazado");
        requestsAccept(`create_notificaciones&user=${user}&message=¡Tu peticion a sido rechazada! ${titulo} no estara disponible como ejercicio.`,"red","Rechazado")}
    
    const preEditExercise = () =>{
        setEdit("flex");
        setNombre(props.title);
        setDescripcion(props.descripcion)}

    const editExercise = async (ejercicio, titulo, descripcion, user) =>{
        const url = await uploadImg(image);
        requestsAccept(`edit_ejercicio&id=${ejercicio}&name=${titulo}&descripcion=${descripcion}&public=${1}&image=${url}`,"#749BC2","Editado");
        requestsAccept(`create_notificaciones&user=${user}&message=¡Felícidades tu peticion a sido aceptada (con algunos cambios aparentes)! ${titulo} ya esta disponible como ejercicio.`,"#749BC2","Editado")}

    return(
        <>
        <div style={{ display: edit}} className="create_card">
                    <div className='container_title_card'>
                       <h3 className='title_card'>Crear nuevo ejercicio<br />---------------------------------------</h3>
                       <span className='icon_card'><FaSave onClick={() => editExercise(props.id, nombre, descripcion, props.user)} className="icon_card_click" size="28px" color="#749BC2" /></span>
                    </div>
                    <div className="container_form_exercise">
                      <input 
                        type='text' 
                        placeholder="Ingresar nombre..." 
                        value={nombre} 
                        onChange={handleChangeNombre} 
                        className="exercise_input exercise_nombre" />

                      <input 
                        type='file' 
                        placeholder="Subir imagen..." 
                        onChange={hadleChangeImage} 
                        className="exercise_input exercise_nombre" />
   
                      <textarea
                        placeholder="Ingresar descripcion..." 
                        value={descripcion} 
                        onChange={handleChangeDescripcion} 
                        rows={4}
                        className="exercise_input exercise_descripcion" />
                    </div>
            </div>
            <div className='create_card'>
                <div className='container_title_card'>
                   <h3 className='title_card'>{props.title}<br />------------------------------------</h3>
                   {array[0] ? <p className='text_peticion_card_dashboard' style={{ color: array[1]}} >{array[2]}</p>: 
                       <span className='icon_card_dashboard'>
                           <FaCheck onClick={() => allowExercise(props.id, props.title, props.descripcion, props.user)} className="icon_card_click_dashboard" size="25px" color="green" />
                           <IoCloseSharp onClick={() => deleteExercise(props.id, props.title, props.user)} className="icon_card_click_dashboard" size="25px" color="red" />
                           <FaRegEdit onClick={preEditExercise} className="icon_card_click_dashboard" size="25px" color="#749BC2" />
                       </span>}
                </div>
                <p className='descripcion_card'>{props.descripcion}</p>
            </div>
               
        </>
    )}
export default CardAdminDashboard;