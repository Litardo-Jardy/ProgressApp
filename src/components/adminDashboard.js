import '../styles/globalStyles.css'
import '../styles/AdminDashboard.css'
import Navbar from "./Navbar";
import CardAdminDashboard from './cardAdminDashboard';

import { useEffect, useState } from 'react';

const AdminDashboard = () =>{

    const [array, setArray] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        fetch(`${apiKey}?action=view_ejercicio`)
        .then(response => response.json())
        .then(data => {
            setArray(data.Exercises)})
        .catch(error => {
          console.error('Error al obtener datos:', error)});
     }, []);

    return(
        <div className='container'>
           <Navbar />
           <div className='container_admin_dashboard'>
              <div className='container_title_admin_dashboard'>
                <h1 className='title_admin_dashboard'>Peticiones</h1>
              </div>
    
              <div className='container_cards_admin_dashboard'>
                  { array.length > 0 ? array.map(item =>
                    item.public == 0 ? <CardAdminDashboard
                      key={item.id} 
                      id={item.id}
                      user={item.user}
                      title={item.titulo} 
                      descripcion={item.descripcion}
                    />: null):<span className="text_errores">No hay peticiones activas.</span> }
              </div>
           </div>
        </div>
    )}
export default AdminDashboard;