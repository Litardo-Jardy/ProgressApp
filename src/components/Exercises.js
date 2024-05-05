import '../styles/Exercises.css'
import '../styles/globalStyles.css'
import CardExercise from "./cardExcersite";
import Navbar from "./Navbar";
import useFetch from '../Services/useFetch';

import { useEffect, useState } from "react";

import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useForm } from '../Services/useForm';
import { FaPlusCircle } from "react-icons/fa";

const Exercises = () =>{

   const [array, setArray] = useState([]);
   const [arrayTwo, setArrayTwo] = useState([]);
   const [search, setSearch] = useState('');
   const [error, setError] = useState(["none", "", ""]);
   const [user, setUser] = useState([]);

   //Validacion para ver si el usuario esta logeado.
   const datosStorage = localStorage.getItem('user');
    useEffect(() =>{
      if(datosStorage){
        setUser(JSON.parse(datosStorage))
      }else{
         const resultado = window.confirm("Necesitas iniciar sesión para realizar esta acción");
         if(resultado){
            window.location.href = "/"
          }else{
            window.location.href = "/Dashboard"
          }}
    }, []);

   //Mostrando ejercicios. GET
   const { data, loading, errors, postMethod } = useFetch('view_ejercicio');
   useEffect(() => {
      if(data){
         setArray(data.Exercises);
         setArrayTwo(data.Exercises)}
   }, [data]);

   //Filtro de busqueda. 
   useEffect(() => {
      const filterData = array.filter(element => element.titulo.toLowerCase().includes(search.toLowerCase()));
      setArrayTwo(filterData);
   }, [search])

   //Agregando ejercicios. POST
   const saveInfoExercise = () =>{
      const datosStorage = localStorage.getItem('user');
      const nombre = document.getElementById('nombre_exercise').value;
      const descripcion = document.getElementById('descripcion_exercise').value;
      if(nombre != "" || descripcion != ""){
      if(descripcion.length < 600){
      if(datosStorage){
         const user = JSON.parse(datosStorage)
         const {} = postMethod(`create_ejercicio&name=${nombre}&descripcion=${descripcion}&public=${0}&user=${user.id}`);
         setError(["block", "green", "El ejercicio fue enviado a revisión."]);
      }else{
         window.location.href = '/'}
      }else{
         setError(["block", "red", "Exceso de caracteres."])}
      }else{
         setError(["block", "red", "No puede haber campos vacíos."])}}
   
   const { FormExercises, setShow, show } = useForm(saveInfoExercise);

   //Contol de los inputs.
   const handleChangeSearch = (e) =>{
        setSearch(e.target.value)}

   const handleChangeIcon = () =>{
    setShow(!show)}
   
   //Eliminar notificacion.
   const deleteError = () => {
       setError(["none", "", ""])}

    return(
      <div className="container">
         <Navbar />
         <div className='container_exercites'>
            <div onClick={deleteError}  style={{ display: error[0], color: error[1] }} className="message_exercise">
                <p className="message_exercise_text"> {error[1] == "red" ? <IoCloseSharp className="message_exercises_icon" size="22px" /> : <FaCheck className="message_exercises_icon" size="22px" />} {error[2]} <br /><span className="message_exercises_text_close">(Toca para eliminar)</span></p>
            </div>
            <div className='container_search'>
               <input 
               className='input_search'
               type = 'text'
               value = {search}
               name = 'search'
               placeholder='Buscar ejercicio...'
               onChange={handleChangeSearch}/><span className='icon_search'><CiSearch size="29px" /></span>
            </div>
            <div className='container_create_rutines'>
               <div className='create_card' style={{ display: "flex", flexDirection: "row"}}>
                 <h3 className='title_card'>Proponer nuevo ejercico<br />---------------------------------------</h3>
                 <span className='icon_card'><FaPlusCircle onClick={handleChangeIcon} className="icon_card_click" size="28px" color="#749BC2" /></span>
               </div>
            </div>
            <div className="container_cards">
               { errors && <p className="text_errores" >Hubo errores al cargar los datos. Intentalo mas tarde.</p> }
               { loading && <p className="text_errores" >Cargando...</p> }
               <FormExercises />
               { arrayTwo.length > 0 ? arrayTwo.map(item => 
                 item.public == 1 ? <CardExercise 
                      key={item.id} 
                      id={item.id}
                      title={item.titulo} 
                      descripcion={item.descripcion}
                      url={item.images} />: null
               ): !loading && <span className="text_errores">No hay elementos selecionados.</span> }
            </div>
         </div>
      </div>
    )}
export default Exercises;