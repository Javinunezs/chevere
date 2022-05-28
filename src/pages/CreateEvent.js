import React, { useState, useEffect } from "react";
import {addDoc, collection} from 'firebase/firestore'
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';


// InputFirst Y InputSecond hacen referencia a un titulo y descripcion del evento unicamente
function CreateEvent({ isAuth }) {

  const [title, setTitle] = useState("");
  const [evtText, setEvtText] = useState("");

  const evtsCollectionRef = collection(db, "evts");
  let navigate = useNavigate();
  const createEvt = async () => {
    await addDoc(evtsCollectionRef, {title, evtText, author: { name: auth.currentUser.displayName , id: auth.currentUser.uid },});
    navigate("/");

  };

// con este efecto conseguimos que si el usuario no está registrado lo redireccione a la pagina d elogin

useEffect(() => {
  if (!isAuth) {
    navigate("/login");
  }
},/*[]*/);


  return (
    <div className='createEvtPage'>
      <div className='evtContainer'>
        <h1> Create an Event Post</h1>
        <div className='inputFirst'>
          <label> Title:</label>
          <input placeholder = "Title..." onChange={(event) => {
            setTitle(event.target.value);
          }}
          />
        </div>
        <div className='inputFirst'>
          <label> Event:</label>
          <textarea placeholder="Evt..." onChange={(event) => {
            setEvtText(event.target.value);
          }}/>
        </div>
        <button onClick={createEvt}> Submit Event</button>
      </div>
    </div>
  );
}

export default CreateEvent;