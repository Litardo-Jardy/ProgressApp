

const CardRealizacion = (props) =>{
   return(
       <div className='create_card_realizacion'>
            <div className="container_image_realizar">
               <img className="image_realizacion" src={props.img} />
            </div>

            <div className="container_caracteristicas_realizacion" > 
              <span className="name_excercise_two">{props.reps} x {props.series}</span>
              <span className="name_excercise_two">{props.ejercicio}</span>
            </div>
       </div>
   )}
export default CardRealizacion;