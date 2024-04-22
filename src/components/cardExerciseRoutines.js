

const CardExrcesiRoutines = (props) => {
    return(
        <div className="container_card_exercise_rourines">
          <p className="text_card_exercise_routines">- {props.name} <span>({props.series} x {props.reps}) {props.peso}</span></p>
        </div>
    )}
export default CardExrcesiRoutines;