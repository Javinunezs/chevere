import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase-config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function LikesPosts({ id, likes }) {

  const [user] = useAuthState(auth);
  const likesRef = doc(db, "Posts", id);

  // Manejador que controla los eventos que le gusta a un usuario
  // Actualizarlo para que el usuario pueda ver que eventos ha seleccionado como favoritos
  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      }).then(() => {
          console.log("unliked");
      }).catch((e) => {
            console.log(e);
      });
    }
    else{
        updateDoc(likesRef,{
            likes:arrayUnion(user.uid),
        }).then(() => {
            console.log("liked");
            console.log(user.uid,user.displayName || user.email);
        }).catch((e) => {
              console.log(e);
        });
    }
  };


  // Recuento de likes y simbolo
  return (
    <div className="xs:col-start-10 xs:col-end-11 md:col-start-9 md:col-end-9">
      <i
        className={`fa fa-heart${!likes?.includes(user.uid) ? "-o" : ""} md:fa-lg xs:fa-xs `}
        style={{
          cursor: "pointer",
          color: likes?.includes(user.uid) ? "red" : null,
        }}
        onClick={handleLike}
      />
    </div>
  );
}