import '../styles/Login.css'
import useFetch from '../Services/useFetch';

import { Link } from 'react-router-dom';
import { useState } from "react";

import { IoCloseSharp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";

const Register = () =>{

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [correo, setCorreo] = useState("");
    const [passTwo, setPassTwo] = useState("");
    const [error, setError] = useState(["none", ""]);
    const [datos, setdatos] = useState(["", ""]);
    const apiKey = process.env.REACT_APP_API_KEY;

    //Control de inputs.
    const handleChangeUser = (e) =>{
        setUser(e.target.value);}

    const handleChangeCorreo = (e) =>{
        setCorreo(e.target.value);}

    const handleChangePass = (e) =>{
        setPass(e.target.value);}

    const handleChangePassTwo = (e) =>{
        setPassTwo(e.target.value);}

    //Validaciones para el registro.
    const { datas, loading, e, postMethod } = useFetch('view_ejercicio');
    const handleChangeSubmit = (e) =>{
        e.preventDefault();
        fetch(`${apiKey}?action=login_user&name=${user}&password=${correo}&email=${pass}`)
        .then(response => response.json())
        .then(data => {
            if(data.Users[0].id != 0){
                setdatos([data.Users[0].nombre, data.Users[0].correo])
            }})
        .catch(error => {
          console.error('Error al obtener datos:', error)});

        if(user != "" || pass != "" || correo != ""){
        if(pass === passTwo){
        if(correo.includes("@gmail.com")){
        if(user != datos[0]){
        if(correo != datos[1]){
            const {} = postMethod(`register_user&name=${user}&email=${correo}&password=${pass}&tipo=${0}`);
            window.location.href = '/';
        }else{
            setError(["block", "La direccion de correo ya esta registrada."])}
        }else{
            setError(["block", "El nombre de usuario ya esta registado."])}
        }else{
            setError(["block", "La direccion de correo no es válida."])}
        }else{
            setError(["block", "Las contraseñas nos coinciden."])}
        }else{
            setError(["block", "No pueden haber campos vacios."])}}

    return(
        <>
        <div className='container_logo'>
            <div className='logo'>
                 <span><IoRocketOutline size="65px" /></span><h1 className='name'> AstroChats</h1>
            </div>
        </div>
        <div className="container_user_two">
            <div className="container_error" style={{ display: error[0] }}>
                <span className="icon_error"><IoCloseSharp /></span><span className="text_error"> {error[1]}</span>
            </div>

            <div className="container_title">
                <h2 className="title">Crear usuario</h2>
                <p className="descripcion">¡Bienvenido a la comunidad!</p>
            </div>
            <div className="container_form">
                <form className="form" >
                <label className='label'><b>Nombre</b></label>
                    <input 
                      type="text" 
                      className="input" 
                      value = {user}
                      placeholder="Ingresar nombre..." 
                      onChange={handleChangeUser}/>

                <label className='label'><b>Correo electronico</b></label>
                    <input 
                      type="email"
                      className="input"
                      value = {correo} 
                      placeholder="Ingresar correo electronico..."
                      onChange={handleChangeCorreo} />

                <label className='label'><b>Contraseña</b></label>
                    <input 
                      type="password" 
                      className="input"
                      value = {pass} 
                      placeholder="Ingresar contraseña..."
                      onChange={handleChangePass} />

                <label className='label'><b>Confirmacion</b></label>
                    <input 
                      type="password" 
                      className="input"
                      value = {passTwo} 
                      placeholder="Confirme su contraseña..."
                      onChange={handleChangePassTwo} />

                    <button 
                      onClick={handleChangeSubmit} 
                      onTouchStart={handleChangeSubmit}
                      className="button"><b>Registrarse</b></button>
                </form>
                <div className="container_register">
                     <Link to="/Login"  className="register"> <span className="text_register">¿Ya tienes una cuenta? Inicia sesion aqui</span></Link>
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
export default Register;