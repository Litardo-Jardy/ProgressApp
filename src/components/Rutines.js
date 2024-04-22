import '../styles/globalStyles.css'
import '../styles/Rutines.css'
import Navbar from './Navbar';
import CardRutines from './cardRutines';
import useFetch from '../Services/useFetch';

import { useEffect, useState } from 'react';

import { FaPlusCircle } from "react-icons/fa";
import { useForm } from '../Services/useForm';
import { CiSearch } from "react-icons/ci";

const Rutines = () =>{

  const datosStorage = localStorage.getItem('user');
  const [array, setArray] = useState([]);
  const [search, setSearch] = useState('');
  const user = JSON.parse(datosStorage);

  const handleChangeSearch = (e) =>{
    setSearch(e.target.value)}

  const saveInfoRutines = () => {
    const nombre = document.getElementById("nombre_routines").value;
    const rango = document.getElementById("rango_routines").value
    const select = document.getElementById("select_routines").value;
    const descripcion = document.getElementById("descripcion_routines").value;
    if (nombre !== "" && descripcion !== "" && rango !== ""){
    if (descripcion.length < 500){
    if (select != 0){
    if (datosStorage){
        const {} = postMethod(`create_rutina&name=${nombre}&descripcion=${descripcion}&categoria=${parseInt(select)}&rango=${rango}&public=0&user=${user.id}`);
        setError(["block", "green", "La rutina se creo con éxito."]);
        setNombre("");
        setDescripcion("");
        setRango("");
        window.location.reload();
    }else{
      const resultado = window.confirm("Necesitas iniciar sesión para realizar esta acción");
        if(resultado){
          window.location.href = '/'
        }}
    }else{
        setError(["block", "red", "Debe escoger una categoria."])}
    }else{
        setError(["block", "red", "Exceso de caracteres."])}
    }else{
        setError(["block", "red", "No puede haber campos vacíos."])}}

    const {show,
           setShow, setNombre, setDescripcion, setRango, setError,
           FormRoutines, MessageErros} = useForm(saveInfoRutines);
    
    const [rutines, setRutines] = useState([]);
    const { data, loading, errors, postMethod } = useFetch(`view_rutina&user=${user.id}`);

    useEffect(() => {
        if(data){
          if(data.Routines[0].id > 0){
            setArray(data.Routines);
            setRutines(data.Routines)}}
    }, [data]);

    useEffect(() => {
      const filterData = array.filter(element => 
        element.titulo.toLowerCase().includes(search.toLowerCase())
        ||
        element.categoria.toLowerCase().includes(search.toLowerCase()));
      setRutines(filterData);
   }, [search])

    const handleChangeIcon = () =>{
      setShow(!show)}

    return (
        <div className='container'>
          <Navbar />
          <div className='container_rutines'>
            <MessageErros />
            <div className='container_search'>
               <input 
               className='input_search'
               type = 'text'
               value = {search}
               name = 'search'
               placeholder='Buscar por rutina o categoria...'
               onChange={handleChangeSearch}/><span className='icon_search'><CiSearch size="29px" /></span>
            </div>
            <div className='container_create_rutines'>
               <div className='create_card' style={{ display: "flex", flexDirection: "row"}}>
                 <h3 className='title_card'>Crear rutina<br />---------------------------------------</h3>
                 <span className='icon_card'><FaPlusCircle onClick={handleChangeIcon} className="icon_card_click" size="28px" color="#749BC2" /></span>
               </div>
            </div>
            <div className="container_cards">
               { errors && <p className="text_errores" >Hubo errores al cargar los datos. Intentalo mas tarde.</p> }
               { loading && <p className="text_errores" >Cargando...</p> }
               <FormRoutines />
               {rutines.length > 0 ? rutines.map(element => 
                <CardRutines
                  key={element.id}
                  id={element.id}
                  title={element.titulo}
                  id_categoria={element.id_categoria} 
                  categoria={element.categoria}   
                  rango={element.rango}
                  descripcion={element.descripcion}            
                />
                ): !loading && <span className="text_errores">No hay elementos selecionados.</span>}
             </div>
          </div>
        </div>
    )}

export default Rutines;