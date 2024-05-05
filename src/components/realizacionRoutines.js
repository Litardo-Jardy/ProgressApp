import CardRealizacion from './cardRealizacionRoutines';
import sound_finish from '../resources/sound_finish.mp3';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgressbar,  buildStyles  } from 'react-circular-progressbar';
import { addSerie } from '../FEATURES/validation/ExerciseSlice';
import useFetch from '../Services/useFetch';
import { useParams } from 'react-router-dom';

import { IoCloseSharp } from "react-icons/io5";

const RealizarRoutines = () => {

    //States ----------------------------------------------------------------;
    const { id, name } = useParams();//URL params;
    const [reps, setReps] = useState("");//Form data;
    const [peso, setPeso] = useState("");//Form data;
    const [tecnica, setTecnica] = useState("");//Form data;
    const [tiempo, setTiempo] = useState(0);//Form data;
    const [nota, setNota] = useState("");//Form data;
    const [exercises, setExercises] = useState([]);//Pending exercise;
    const [exercise, setExercise] = useState([]);//Exercise in process;
    const [count, setCount] = useState(0); //Counter of sets;
    const [time, setTime] = useState(0);//Time counter for the routines; 
    const [timeExercise, setTimeExercise] = useState(0);//Time counter for the individual exercises;
    const [start, setStart] = useState(false);//Exercise state indicador in process;
    const [show, setShow] = useState(false);//Show window;
    const [showButton, setShowButton] = useState(true);
    const state = useSelector(state => state.exercise);//Call to the general state;
    const { data, loading, errors, postMethod } = useFetch(`view_rutina_ejercicio&id=${id}`);//Calling the record_progress API;
    const dispatch = useDispatch();
    const playSound = () => {//Creating the action "Play the sound";
      new Audio(sound_finish).play()}

    //Handles ----------------------------------------------------------------;
    const hadleChangeReps = (e) => {
      setReps(e.target.value)}

    const hadleChangePeso = (e) => {
        setPeso(e.target.value)}

    const hadleChangeTecnica = (e) => {
        setTecnica(e.target.value)}

    const hadleChangeNota = (e) => {
        setNota(e.target.value)}

    //Time expressions ----------------------------------------------------------------;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const minutesExercise = Math.floor((timeExercise % 3600) / 60);
    const secondsExercise = timeExercise % 60;

    const formatTime = (value) => {//Change the format number to "00:00:00";
      return value.toString().padStart(2, '0')};

    function tiempoASegundos(tiempo) {//Change the format "00:00:00" to number;
      let result;
      if(tiempo.length === 8 ){
          const partes = tiempo.split(':');
          const horas = parseInt(partes[0]) || 0;
          const minutos = parseInt(partes[1]) || 0;
          const segundos = parseInt(partes[2]) || 0;
          result = horas * 3600 + minutos * 60 + segundos
      }else if (tiempo.length ===  6) {
          const partes = tiempo.split(':');
          const minutos = parseInt(partes[0]) || 0;
          const segundos = parseInt(partes[1]) || 0;
          result =  minutos * 60 + segundos}
      return result}

    const reStart = () => {//Action to end the counter;
      setStart(true);}

    const decrementSerie = () =>{//Button to start the counter;
      if(count <= 1){
         if(exercises.length > 0){
            setExercise(exercises[0]);
            setCount(exercises[0].serie);
            setTecnica(exercises[0].tecnica);
            setReps(exercises[0].reps);
            setPeso(exercises[0].peso);
            exercises.shift();
         }else{
           setShow(true);
           setShowButton(false);
           state.map(element => {
              const {} = postMethod(`create_registro_ejercicio_serie&peso=${element.peso}&reps=${element.reps}&tecnica=${element.tecnica}&tiempo=${element.tiempo}&rutina=${element.ejercicio}`)}
            )}
      }else{  
          dispatch(addSerie( { 'peso': peso, 'reps': reps, 'tecnica': tecnica, 'tiempo': `${formatTime(minutesExercise)}:${formatTime(secondsExercise)}`, 'ejercicio': exercise.id } ));
          setCount(count - 1)}
      setStart(false);
      setTimeExercise(0)}
 
    //Actions dependeting ----------------------------------------------------------------;
    useEffect(() => {
      const handleBeforeUnload = (event) => {
        const confirmationMessage = '¿Seguro que quieres recargar la página? La informacion recopilada se perdera en caso de que no hayas terminado el entrenamiento.';
        event.returnValue = confirmationMessage; 
        return confirmationMessage}
  
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)}
    }, []);

    useEffect(() => {
      if(data){
        if(data.Routines[0].id > 0){
          if(data.Routines[0].nombre_rutina == name){
              setExercise(data.Routines[0]);
              setCount(data.Routines[0].serie);
              setReps(data.Routines[0].reps);
              setPeso(data.Routines[0].peso);
              setTecnica(data.Routines[0].tecnica);
              setTiempo(tiempoASegundos(data.Routines[0].tiempo));
              data.Routines.shift();
              setExercises(data.Routines)}}}
    }, [data]);

    useEffect(() => {//Increment the exercise counter;
     const intervalID = setInterval(() => {
         if(start){
          setTimeExercise(prevTime => prevTime + 1);}
     }, 1000);
     return () => clearInterval(intervalID);
    }, [start]);

    useEffect(() =>{//Play sound;
        if(timeExercise === tiempo && tiempo !== 0 ){
            playSound();
            decrementSerie()}
    }, [timeExercise]);

    useEffect(() => {//Increment the routine counter;
        const intervalID = setInterval(() => {
          setTime(prevTime => prevTime + 1);
        }, 1000);
        return () => clearInterval(intervalID);
      }, []);

    const finshExercise = (option) => {
      const datosStorage = localStorage.getItem('user');
      const user = JSON.parse(datosStorage);
      const {} = postMethod(`create_registro_rutina&notas=${nota}&rutina=${id}&user=${user.id}`);
      if(option === 1){
         window.location.href = '/dashboard';
      }else{
         window.location.href = '/dashboard';
      }}

    const finishRoutine = () => {
       const resultado = window.confirm("¿Estás seguro de terminar esta rutina?");
       if(resultado){
        setShow(true);
        setShowButton(false)
        state.map(element => {
          const {} = postMethod(`create_registro_ejercicio_serie&peso=${element.peso}&reps=${element.reps}&tecnica=${element.tecnica}&tiempo=${element.tiempo}&rutina=${element.ejercicio}`)}
        )}}

    return (
        <div className='container_realizacion_routines'>
            <div style={{ width: "100%", position: "absolute", zIndex: 2, display: show ? "flex": "none", justifyContent: "center"}}>
               <div style={{ width: "360px"}}  className='create_card'>
                  <span className='title_window_card'>¡Terminado con exíto!</span>
                  <textarea
                      style={{ fontSize: "17px", padding: "10px"}}
                      placeholder="Agrega alguna nota para la rutina..."
                      rows={6}
                      className='exercise_input exercise_descripcion'
                      value={nota}
                      onChange={hadleChangeNota}/>
                   <div className='container_button_routine_one'>
                       <button onClick={() => finshExercise(1)} className='button_window'>Guardar && Salir</button>
                       <button onClick={() => finshExercise(2)} className='button_window'>Ver progreso</button>
                   </div>
               </div>
            </div>

            <div className='title_realizacion_routines'>
               <span className='time_routine'>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</span>
               <span className='icon_realizacion_rotuine'><IoCloseSharp onClick={finishRoutine} style={{ cursor: 'pointer'}} color="red" size="35px" /></span>
            </div>
            
            <div className='container_time_exercise'>
              {timeExercise > 0 ? <div className='container_time_exercise_two' style={{ width: 250, height: 250 }}>
                    <CircularProgressbar
                    className='circle_progress'
                    value={timeExercise}
                    minValue={0}
                    maxValue={tiempo}
                    text={<span>{formatTime(minutesExercise)}:{formatTime(secondsExercise)}</span> }
                    styles={buildStyles({
                        textSize: '14px',
                        textAlign: 'center',
                        pathColor: '#749BC2',
                        textColor: '#000'
                      })} />
                      <span style={{ position: 'relative', top: '-155px', fontSize: '40px' }}>{formatTime(minutesExercise)}:{formatTime(secondsExercise)}</span>
                </div>: <div className='image_exercise'>
                      <img style={{ objectFit: "fill" }} width="270px" height="300px" src={exercise.images} />
                  </div> }
                

                <div style={{ position: 'relative', top: '10px'}}  className='container_card'>
                <div className='create_card'>
                    <div className="container_card_realizar_exercise">
                        <span className="name_excercise_one">{exercise.nombre_ejercicio}</span>
                        <span className="name_excercise_one">{count} / {exercise.serie}</span>
                    </div>
                </div>
                   <label className='label_realizacio_routines'>R:</label>
                   <input
                     className='input_realizacion_rourines'
                     value={reps}
                     onChange={hadleChangeReps}/>
                   <label className='label_realizacio_routines'>kg:</label>
                   <input
                     className='input_realizacion_rourines'
                     value={peso}
                     onChange={hadleChangePeso}/>
                   <label className='label_realizacio_routines'>T:</label>
                   <input
                     className='input_realizacion_rourines'
                     value={tecnica}
                     onChange={hadleChangeTecnica}/>
                </div>
            </div>

            {showButton && 
              <div className='container_button_routine'> 
                 <button style={{ display: start ? 'block': 'none', borderRadius: "8px" }} onClick={decrementSerie} className='button_doroutine'>Siguiente</button>
                 <button style={{ display: start ? 'none': 'block', borderRadius: "8px" }} onClick={reStart} className='button_doroutine'>Empezar</button> 
              </div>}

            <div className='container_title_medium' >
               <span>Ejercicios pendientes: {exercises.length}</span>
            </div>

            <div className='container_exercise_routine_card'>
            { errors && <p className="text_errores" >Hubo errores al cargar los datos. Intentalo mas tarde.</p> }
            { loading && <p className="text_errores" >Cargando...</p> }
             {exercises.length > 0 ? exercises.map(element => 
               <CardRealizacion
                 key={element.id}
                 ejercicio={element.nombre_ejercicio} 
                 series={element.serie}
                 reps={element.reps}
                 img={element.images}
               />
               ): !loading && <span className="text_errores">No hay elementos para mostrar.</span>}
            </div>
        </div>
    )}

export default RealizarRoutines;