import '../styles/Navbar.css'
import { IoRocketOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { GiProgression } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaList } from "react-icons/fa";
import { GiMuscleUp } from "react-icons/gi";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuLayoutPanelLeft } from "react-icons/lu";

const Navbar = () =>{

  const [count, setCount] = useState(0)
  const [dataUser, setDataUser] = useState(0)
  const datosStorage = localStorage.getItem('user');
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (datosStorage){
      const data = JSON.parse(datosStorage);
      setDataUser(data.tipo)}

      fetch(`${apiKey}?action=view_ejercicio`)
        .then(response => response.json())
        .then(data => {
          const filterData = data.Exercises.filter(element => element.public == 0);
          setCount(filterData.length)})
        .catch(error => {
          console.error('Error al obtener datos:', error)});
  }, []);

    const [show, setShow] = useState(false)
    const handleShow = () => {
      setShow(!show)}

    const clearRecordId = () =>{
      localStorage.clear()}
    
    return (
     
        <div className='container_navbar' style={{ width: show ? '203px': '60px'}}>
          <span style={{ left: show ? '160px': '19px' }} onClick={handleShow} className='arrow'>{show ? <FaArrowLeft size="23px" color="#000" />: <FaArrowRight size="23px" color="#000" /> }</span>
          <Link className='link' to="/Default" ><span className='element'><IoRocketOutline className='icon_navbar' size="25px" color="#000" /><span className='text_element'>{show ? "Progress App" : "" }</span></span></ Link>
          <Link className='link' to="/Default" ><span className='element'><FaHome className='icon_navbar' size="25px"  /><span className='text_element'>{show ? "Inicio" : "" }</span></span></Link>
          <Link className='link' to="/Routines" ><span className='element'><FaList className='icon_navbar' size="21px" /><span className='text_element'>{show ? "Rutinas" : "" }</span></span></Link>
          <Link className='link' to="/Exercises" ><span className='element'><GiMuscleUp className='icon_navbar' size="25px" /><span className='text_element'>{show ? "Ejercicios" : "" }</span></span></Link>
          <Link className='link' to="/Default" ><span className='element'><GiProgression className='icon_navbar' size="23px" /><span className='text_element'>{show ? "Progresos" : "" }</span></span></Link>
          <Link className='link' to="/Default" ><span className='element'><CgProfile className='icon_navbar' size="25px" /><span className='text_element'>{show ? "Perfil" : "" }</span></span></Link>
          {dataUser == 1 ? <Link className='link' to="/Admin"> <span className='element'><span className='number_card_exercise_dashboard'><b>{count > 0 ? count : null}</b></span><LuLayoutPanelLeft className='icon_navbar' size="25px" /><span className='text_element'>{show ? "Panel de control" : "" }</span></span></Link> : null}
          <Link onClick={clearRecordId} className='link' to="/"> <span className='element'><CiLogout className='icon_navbar' size="25px" /><span className='text_element'>{show ? "Cerrar sesion" : "" }</span></span></Link>
         
        </div>
    )}
export default Navbar;