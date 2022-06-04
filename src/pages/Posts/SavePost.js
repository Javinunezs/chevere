import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase-config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function LikesPosts({ id, savePost }) {

  const [user] = useAuthState(auth);
  const postSaveRef = doc(db, "Posts", id);

  // Manejador que controla los eventos que le gusta a un usuario
  // Actualizarlo para que el usuario pueda ver que eventos ha seleccionado como favoritos
  const handleSave = () => {
    if (savePost?.includes(user.uid)) {
      updateDoc(postSaveRef, {
        savePost: arrayRemove(user.uid),
      }).then(() => {
          console.log("no guardado");
      }).catch((e) => {
            console.log(e);
      });
    }
    else{
        updateDoc(postSaveRef,{
            savePost:arrayUnion(user.uid)
        }).then(() => {
            console.log("guardado");
        }).catch((e) => {
              console.log(e);
        });
    }
  };


  // Recuento de likes y simbolo
  return (
    <div>
      <i
        className={`fa fa-bookmark${!savePost?.includes(user.uid) ? "-o" : ""} fa-lg`}
        style={{
          cursor: "pointer",
          color: savePost?.includes(user.uid) ? "black" : null,
        }}
        onClick={handleSave}
      />
    </div>
  );
}