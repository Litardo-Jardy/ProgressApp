import { IoCloseSharp } from "react-icons/io5";
import '../styles/Dashboard.css'

const CardNotis = (props) =>{
    return(
      <div className="container_card_notis">
          <span className="title_noti">{props.message}</span><span className="icon_notis"><IoCloseSharp style={{ cursor: 'pointer'}} size="30px" color="red" /></span>
      </div>
    )}
export default CardNotis;