import React, {useEffect, useState,useContext} from 'react';
import { arrayRemove, arrayUnion, doc, updateDoc, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase-config';
import {v4 as uuidv4} from 'uuid';


export default function AssistEv({id}) {
    
    const [assists,setAssists] = useState([]);
   // const [showButton, setShowButton] = useContext(true);
   const [active,setActive] = useState(false); //burguer escondido de primeras

            



  const [currentlyLoggedinUser] = useAuthState(auth);
  const [user] = useAuthState(auth);
  const assistRef=doc(db,"Posts", id);

  useEffect(() => {
    const docRef = doc(db, "Posts",id);
    //orderBy("createdAt", "desc");
    onSnapshot(docRef,(snapShot) => {
        setAssists(snapShot.data().assists);
      orderBy("createdAt", "desc");
    });
  },
  []);

  

  // Manejador que controla la entrada de datos y la actualizacion de los valores de la base de datos
  const handleAssist = () => { 
    if(!assists?.includes(currentlyLoggedinUser.uid)){
        
            updateDoc(assistRef,{
                assists: arrayUnion({
                user: currentlyLoggedinUser.uid,
                userEmail: currentlyLoggedinUser.email,
                userName: currentlyLoggedinUser.displayName,
                assistId: uuidv4()
            }),
            }).then(
                ()=>{
                  setActive(!active);
                    //setShowButton(false);
                    console.log("saved");
                    console.log(user.uid,user.displayName || user.email);

                }
            ).catch((e) => {
                console.log(e);
            });
        }
        else{
            console.log("nada");
        }

    };

    const handleDeleteAssist=(assist)=>{
        console.log(assist);
        updateDoc(assistRef,{
          assists: arrayRemove(assist),
        })
        .then((e) => {
          //setShowButton(true)
            console.log("unsaved");
          console.log(e);
        })
        .catch((error) => {
          console.log(error);
        })
      };


  


 


  // Cambiar el estilo visual de esta pagina por completo
  return (
    <div className='md:col-start-7 md:col-end-8 sm:col-start-7 sm:col-end-9 sm:pr-2 '>

    {
          assists && (
            <button 
                className={"  ml-20 py-3 my-6 rounded-lg font-semibold mt-4 bg-green-600 hover:bg-slate-500 text-white text-xl shadow rounded border-green  py-2 px-4 h-3/4 w-full"}
                style={{
                    cursor: "pointer",
                }} 
                onClick={{handleAssist}}>
                    
                Asistir
            </button>
          )
                
      
    }

    
    </div>



  );
}





{/*<i
        className={`fa fa-heart${!assists?.includes(user.uid) ? "-o" : ""} fa-lg`}
        style={{
          cursor: "pointer",
          color: assists?.includes(user.uid) ? "red" : null,
        }}
        onClick={handleAssist}
    >Asistir</i>*/}
        

{/*const handleAssist = () => { 
    if(assists?.includes(user.uid)){
        updateDoc(assistRef, {
            assists: arrayRemove(user.uid),
          }).then(() => {
              console.log("unsaved");
          }).catch((e) => {
                console.log(e);
          });
        }
        else{
            updateDoc(assistRef,{
                assists: arrayUnion(user.uid,{
                user: currentlyLoggedinUser.uid,
                userEmail: currentlyLoggedinUser.email,
                userName: currentlyLoggedinUser.displayName,
                assistId: uuidv4()
            }),
            }).then(
                ()=>{
                    console.log("saved");
                    console.log(user.uid,user.displayName || user.email);

                }
            ).catch((e) => {
                console.log(e);
            });
        }

    }; */}