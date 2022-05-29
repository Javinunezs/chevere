import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { useAuth } from "../../context/authContext";
import { storage } from '../../firebase-config';


  //Storage
  

// Pagina de perfil en consturcción


function Profile() {
    // Funcion sacada de autContext.js
    // Con esta funcion creamos un objeto que nos aporta info desde firebase acerca del usuario logeado, pudiendo crear desde aqui un perfil
    /*const login = async (email, password) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email,password);
        console.log(userCredentials);
     }
    */

     

     async function upload(file, currentUser, setLoading){
        const fileRef = ref(storage, currentUser.uid + '.png');
            setLoading(true);
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        updateProfile(currentUser, {photoURL});
        setLoading(false);
        alert("Nueva foto!");
  
    };


    const currentUser = useAuth();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);  
    const [photoURL, setPhotoURL] = useState();


     function handleChange(e){
       if (e.target.files[0]){
         setPhoto(e.target.files[0])
       }

     }

     function handleProfilePhoto(){
        upload(photo, currentUser, setLoading);
     }

     useEffect(() => {
       if(currentUser?.photoURL){ // && currentUser.photoURL esto tambien serviria quitando desde la interrogacion
        
        setPhotoURL(currentUser.photoURL);
       }
       
     },[currentUser])
     

  return (
    <div className='pt-20'>
      <input type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleProfilePhoto}>Editar Foto  </button>
      <img src={photoURL} alt='Avatar' className='avatar' />
      
      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
      </div>
    </div>
  );
}

export default Profile