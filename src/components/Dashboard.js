import '../styles/Dashboard.css'
import '../styles/globalStyles.css'
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { IoNotificationsOutline } from "react-icons/io5";
import CardNotis from './cardNotis';
import useFetch from '../Services/useFetch';

const Dashboard = () =>{

    const [count, setCount] = useState(0);
    const [noti, setNoti] = useState([]);
    const [search, setSearch] = useState();
    const [show, setShow] = useState(false);

    const datosStorage = localStorage.getItem('user');

    const handleChangeSearch = (e) =>{
        setSearch(e.target.value)}

    const clickShowNotis = () =>{
       setShow(!show);}

    //Mostrado notificaciones.
    const { data } = useFetch('view_notificaciones');
    useEffect(() => {
      if (data  && datosStorage){
          const dataUser = JSON.parse(datosStorage);
          const filterData = data.Notis.filter(element => element.user == dataUser.id);
              setCount(filterData.length);
              setNoti(filterData)}
    }, [data])

    return (
        <div className='container'>
          <Navbar />
          <div className='container_dashboard'>
            <div className='container_search'>
               <input 
               className='input_search'
               type = 'text'
               value = {search}
               name = 'search'
               placeholder='Buscar por rutina o ejercicio...'
               onChange={handleChangeSearch}/><span className='icon_search'><span className='number_dashboard'><b>{count > 0 ? count : null}</b></span><IoNotificationsOutline onClick={clickShowNotis} style={{ cursor: 'pointer' }} size="29px" /></span>
            </div>
            <div style={{ display: show ? "flex" : "none", 
                          width: "80%", 
                          margin: "10px auto 10px auto" }} className='create_card'>
              <h2 className='title_noti_card'>Notificaciones</h2>
               {noti.length > 0 ? noti.map(item => 
                  <CardNotis message={item.mensaje} />
                ):<span className="text_errores" >No hay notificaciones.</span>  }
            </div>
          </div>
        </div>
    )}
export default Dashboard;