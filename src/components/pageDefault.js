import { FaMedkit } from "react-icons/fa";
import Navbar from "./Navbar";

 const PageDefault = () =>{
    return(
        <div className="container">
            <Navbar />
            <div className='container_exercitess'>
                <div className="text_default_container">
                    <FaMedkit color="#749BC2" size={60} style={{ width: "100%"}} />
                    <h2 style={{ width: "100%", textAlign: "center" }}>Modulo en mantenimiento</h2>
                </div>
            </div>
        </div>
    )}
export default PageDefault;