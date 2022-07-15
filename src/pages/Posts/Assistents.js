import React, { useEffect, useState } from 'react';
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc, orderBy } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase-config';
import {v4 as uuidv4} from 'uuid';


export default function Assistents({id}) {

    const [assists,setAssists] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const [user] = useAuthState(auth);
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


 


  // Cambiar el estilo visual de esta pagina por completo
  return (
    <div className=' col-start-1 col-end-6 ml-20'>
                                {
                                assists !== null && assists.map(({ user, assistId, userName, userEmail})=>(
                                    <div key={assistId}>
                                        <div className='ml-10 col-start-2 col-end6 text-xl'>
                                            <span className={`badge ${
                                            user === currentlyLoggedinUser.uid? "bg-succes" : "bg-primary"
                                            }`}>{userName || userEmail}
                                            </span>
                                            
                                        </div>
                                    </div>

                                ))
                                }                    
        </div>




  
  );
}




{/*
<i
            className={`fa fa-heart${!assists?.includes(user.uid) ? "-o" : ""} fa-lg`}
            style={{
            cursor: "pointer",
            color: assists?.includes(user.uid) ? "red" : null,
            }}
            onClick={handleChangeAssistEv}
        />
        </div>


        */}