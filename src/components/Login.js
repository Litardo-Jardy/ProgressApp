import '../styles/Login.css'

import { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";

const Login = () =>{

    useEffect(() => {
        const datosStorage = localStorage.getItem('user');
        if (datosStorage) {
            window.location.href = '/dashboard'}
    },[])

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(["none", ""]);
    const apiKey = process.env.REACT_APP_API_KEY;

    //Control de inputs.
    const handleChangeUser = (e) =>{
        setUser(e.target.value);}

    const handleChangePass = (e) =>{
        setPass(e.target.value);}

    //Validaciones para el login.
    const handleChangeSubmit = (e) =>{
        e.preventDefault();
        
        if (user != "" || pass != ""){
            fetch(`${apiKey}?action=user_validate&name=${user}&password=${pass}`)
            .then(response => response.json())
            .then(data => {
              
              if (data.Users[0].id > 0) {
                  const datos = { id: data.Users[0].id, tipo: data.Users[0].tipo }
                  localStorage.setItem('user', JSON.stringify(datos));
                  window.location.href = '/dashboard';
              }else{
                setError(["block", "Credenciales incorrectas."])}
            })
            .catch(error => {
                 console.error('Error al obtener datos:', error)});
        }else{
            setError(["block", "No pueden haber campos vacíos."])}}

    return(
        <>
        <div className='container_logo'>
            <div className='logo'>
                 <span><IoRocketOutline size="65px" /></span><h1 className='name'> AstroChats</h1>
            </div>
        </div>

        <div className="container_user">

            <div className="container_error" style={{ display: error[0] }}>
                <span className="icon_error"><IoCloseSharp /></span><span className="text_error"> {error[1]}</span>
            </div>
            <div className="container_title">
                <h2 className="title">Progress App</h2>
                <p className="descripcion">Ingrese con usuario o cree uno por primera vez.</p>
            </div>
            <div className="container_form">
                <form className="form" >
                    <label className='label'><b>Usuario</b></label>
                    <input 
                      type="text" 
                      className="input" 
                      value = {user}
                      name = "user"
                      placeholder="Ingresar usuario..." 
                      onChange={handleChangeUser}/>
                    
                    <label className='label'><b>Contraseña</b></label>
                    <input 
                      type="password" 
                      className="input"
                      value = {pass} 
                      name = "pass"
                      placeholder="Ingresar contraseña..."
                      onChange={handleChangePass} />

                    <button 
                      onClick={handleChangeSubmit} 
                      onTouchStart={handleChangeSubmit}
                      className="button">Ingresar</button>
                </form>
                <div className="container_register">
                     <Link to="/Register"  className="register"> <span className="text_register">¿No tienes una cuenta? Registrate aqui</span></Link>
                </div>
            </div>
        </div>
        <div className='container_footer'>
            <div className='container_links'>
               <span> <a href='https://www.instagram.com/jardy_litardo?igsh=YzNidTJ0ZHp6b3dj'><FaInstagram color="#9724c5" size="35px" /></a></span>
               <span> <a href='https://portafolio-web-roan.vercel.app/'><FaFolder color="#e5e905" size="35px" /></a></span>
               <span><a href='https://www.linkedin.com/in/jardy-litardo-vera-209a36219/'><FaLinkedin color="#749BC2" size="35px" /></ a></span>
            </div>
        </div>
        </>
    )}
export default Login