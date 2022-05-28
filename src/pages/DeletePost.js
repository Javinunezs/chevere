import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage} from "../firebase-config";
import React from "react";
import {toast} from "react-toastify";

export default function DeletePost({id, imageUrl}){

    const handleDelete = async() => {
            if(window.confirm("Quieres borrarlo?")){

        try {
            await deleteDoc(doc( db, "Posts", id));
            toast("Evento borrado", {type: "success"});
            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);


        } catch (error) {
            toast("Error borrando evento", {type: "error"})
            console.log(error)
        }
        
    }
    };


    return(
        <div>
            <i className="fa fa-times" onClick={handleDelete} style={{cursor:"pointer"}} ></i>
        </div>
    );
}

//<button onClick={handleDelete} className="bg-slate-50 hover:bg-slate-200 text-black shadow rounded border-2 border-gray-300 py-2 px-4 w-full">Borrar</button>