import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase-config';
import {v4 as uuidv4} from 'uuid';

function UnAssist({id,showUnAssist,active}) {


    const [assists,setAssists] = useState([]);

    const [currentlyLoggedinUser] = useAuthState(auth);
    const assistRef=doc(db,"Posts", id);


    // useEffect usado para fijar los asistentes
    useEffect(() => {
        const docRef = doc(db, "Posts",id);
        //orderBy("createdAt", "desc");
        onSnapshot(docRef,(snapShot) => {
            setAssists(snapShot.data().assists);
          orderBy("createdAt", "desc");
        });
      },
      []);

const handleDeleteAssist=(assist)=>{
    console.log(assist);
    updateDoc(assistRef,{
      assists: arrayRemove(assist),
    })
    .then((e) => {
        console.log("unsaved");
      console.log(e);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
<div className={active ? ' col-start-1 col-end-6 ml-20' : 'hidden'}>

        {
          assists !== null && assists.map(({assistId, user, userName, userEmail})=>(
            <div key={assistId}>


                <div className=''>
                  {
                    
                      
                    user === currentlyLoggedinUser.uid && (
                        <button className={"col-start-6 col-end-8 ml-20 py-3 my-6 rounded-lg font-bold mt-4 bg-green-600 hover:bg-slate-500 text-white text-xl shadow rounded border-green  py-2 px-4 h-3/4 w-full"}
                                style={{
                                    cursor: "pointer",
                                }} 
                                onClick={() => handleDeleteAssist({assistId, user, userName, userEmail}) }
                         >
                            
                            Dejar de Asistir
                        </button>
                    )
                  }
                </div>
              </div>

          ))

        }

       


      </div>


  );
}

  export default UnAssist




  {/*<i className='fa fa-times' style={{cursor:"pointer"}}
                          onClick={() => handleDeleteAssist({assistId, user, userName, userEmail})}
                      ></i>*/}