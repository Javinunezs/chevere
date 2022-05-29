import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
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
    onSnapshot(docRef,(snapShot) => {
      setComments(snapShot.data().comments);
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
    <div>Comment
      <div className='container'>
        {
          comments !== null && comments.map(({commentId, user, comment, userName, userEmail, createdAt})=>(
            <div key={commentId}>
              <div className='border p-2 mt-2 row-span'>
                <div className='col-11'>
                  <span className={`badge ${
                    user === currentlyLoggedinUser.uid? "bg-succes" : "bg-primary"
                    }`}>{userName || userEmail}
                  </span>
                  {comment}
                </div>
                <div className='col-1'>
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

        {
          currentlyLoggedinUser && (
            <input type="text" className="form-control mt-4 mb-5" value={comment} onChange={(e)=>{ setComment(e.target.value);
            }}
            placeholder="Añade comentarios"
            onKeyUp={(e) => {handleChangeComment(e,)}}/>
          )
        }


      </div>


    </div>
  );
}

export default Comment