import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase-config';
import {v4 as uuidv4} from 'uuid';


function Comment({id}) {

  const [comment, setComment] = useState("");
  const [comments,setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const commentRef=doc(db,"Posts", id);


  // useEffect usado para fijar los comentarios
  useEffect(() => {
    const docRef = doc(db, "Posts",id);
    orderBy("createdAt", "desc");
    onSnapshot(docRef,(snapShot) => {
      setComments(snapShot.data().comments);
      orderBy("createdAt", "desc");
    });
  },
  []);

  // Manejador que controla la entrada de datos y la actualizacion de los valores de la base de datos
  const handleChangeComment = (e) => {
    if(e.key === "Enter"){
      updateDoc(commentRef,{
        comments: arrayUnion({
          user: currentlyLoggedinUser.uid,
          userEmail: currentlyLoggedinUser.email,
          userName: currentlyLoggedinUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4()
      })
      }).then(
        ()=>{
          setComment("");
        }
      )
    }
  }

  // Manejador para ayudarnos a eliminar el comentario, y actualiza la BD
  const handleDeleteComment=(comment)=>{
    console.log(comment);
    updateDoc(commentRef,{
      comments: arrayRemove(comment),
    })
    .then((e) => {
      console.log(e);
    })
    .catch((error) => {
      console.log(error);
    })
  };


  // Cambiar el estilo visual de esta pagina por completo
  return (
    <div className=' col-start-1 col-end-6 ml-20'>
    <div className="my-10 leading-tight text-3xl font-bold  text-black ">
      Comentarios
    </div>
    {
          currentlyLoggedinUser && (
            <input type="text" className="w-full form-control mt-4 mb-5" value={comment} onChange={(e)=>{ setComment(e.target.value);
            }}
            placeholder="Añade comentarios"
            onKeyUp={(e) => {handleChangeComment(e,)}}/>
          )
        }
      <div className='w-full h-80 flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch container'>
        


        {
          comments !== null && comments.map(({commentId, user, comment, userName, userEmail, createdAt})=>(
            <div key={commentId}>
              <div className='grid grid-cols-10 border p-2 mt-2 row-span'>
                <div className='col-start-1 text-xs inline-flex items-center justify-center px-2 py-3 font-light leading-none text-red-100 bg-green-600 rounded-full'>
                  <span className={`badge ${
                    user === currentlyLoggedinUser.uid? "bg-succes" : "bg-primary"
                    }`}>{userName || userEmail}
                  </span>
                </div>
                  
                  <div className='ml-10 col-start-2 col-end6 text-xl'>
                    {comment}
                  </div>
                  
                
                <div className='col-start-11'>
                  {
                    user === currentlyLoggedinUser.uid && (
                      <i className='fa fa-times' style={{cursor:"pointer"}}
                          onClick={() => handleDeleteComment({commentId, user, comment, userName, userEmail, createdAt})}
                      ></i>
                    )
                  }
                </div>
              </div>
            </div>
          ))

        }

       


      </div>

      </div>
  
  );
}

export default Comment