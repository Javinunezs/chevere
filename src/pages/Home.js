import React, { useState, useEffect } from "react";
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import  {auth, db} from "../firebase-config";

//import { useContext } from "react";
//import {context} from "../context/authContext";
import{useAuth} from "../context/authContext";  //Esto sirve para traer la info del user logeado
import { Link } from "react-router-dom";

function Home( {isAuth} ) {
  const [evtLists, setEvtList] = useState([]);
  const evtsCollectionRef = collection(db, "evts");
  const [randstate, setRandstate] = useState(0);
  // Nuevo

  // Para traer info del usuario logeado
  const {user, logout, loading} = useAuth()  //ejemplo uso: <h1> Hola {user.email}</h1>
  const authContext = useAuth(); // con esta funcion importamos todo el context directamente y el useContext
  //const authContext = useContext(context);
  console.log(authContext);

  const deleteEvt = async (id) => {
    setRandstate(randstate + 1);
    const evtDoc = doc(db, "evts", id );
    await deleteDoc(evtDoc);
  };


  useEffect(() => {
    const getEvts = async() => {
      const data = await getDocs(evtsCollectionRef);
      console.log("hi", data);
      setEvtList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

    getEvts();
  }, [randstate, evtsCollectionRef] );
  

  const handleLogout =async () => {
    try{
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  
  if (loading) return <h1> Loading </h1>



  return (
    
    <div className='homePage'> 
    <nav>
          <Link to="/"> Home </Link>
          <Link to="/createevent"> Add Event </Link>
          <button onClick={handleLogout} className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black">logout</button>
    
    </nav>
    { evtLists.map((evt) => {
      return (
        <div className="w-full max-w-xs m-auto text-black"> --
          <h1> hola {user.displayName || user.email}</h1>--
          
          <div className='evt'> 
            <div className='evtHeader'> 
              <div className='title'>
                <h1> {evt.title} </h1>
              </div>
              <div className='deleteEvt'> 
                {isAuth && evt.author.id === auth.currentUser.uid && (<button onClick={() => {deleteEvt(evt.id);}}> &#128465; </button> 
                )}
              </div> 
            </div>
            <div className='evtTextContainer'> {evt.evtText} </div>
            <h3>@{evt.author.name}</h3>
          </div>
          
        </div>
      );
      })}
      <button onClick={handleLogout} className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black">logout</button>
    </div>
  );

/*  return(
    <div>
      <h1> hola {user.displayName || user.email}</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );*/

  // Fin Nuevo

/*
  const deleteEvt = async (id) => {
    setRandstate(randstate + 1);
    const evtDoc = doc(db, "evts", id );
    await deleteDoc(evtDoc);
  };


  useEffect(() => {
    const getEvts = async() => {
      const data = await getDocs(evtsCollectionRef);
      console.log("hi", data);
      setEvtList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

    getEvts();
  }, [randstate, evtsCollectionRef] );




  return (
    <div className='homePage'> 
    { evtLists.map((evt) => {
      return (
        <div className='evt'> 
          <div className='evtHeader'> 
            <div className='title'>
              <h1> {evt.title} </h1>
            </div>
            <div className='deleteEvt'> 
              {isAuth && evt.author.id === auth.currentUser.uid && (<button onClick={() => {deleteEvt(evt.id);}}> &#128465; </button> 
              )}
            </div> 
          </div>
          <div className='evtTextContainer'> {evt.evtText} </div>
          <h3>@{evt.author.name}</h3>
        </div>
      );
      })}
    </div>
  ); */
}

export default Home;