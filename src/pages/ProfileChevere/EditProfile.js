import React, {useState} from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { storage, db, auth } from "../../firebase-config";
import {toast} from "react-toastify";
import {useAuth} from "../../context/authContext"; 
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./Profile";



// Profile llamar a los datos aqui guardados como en posts//aunque no deberia ya que para proteger las fotos deboguardar cada foto en la carpeta correspondiente al usuario



function EditProfile() {
    const [user] = useAuthState(auth);
    const { loading} = useAuth()  //ejemplo uso: <h1> Hola {user.email}</h1>
    let navigate = useNavigate();

    const [date, setDate]=useState(new Date()); // variable que quiero usar para guardar las fechas que el usuario elija para realizar el evento
    const [progress,setProgress] = useState(0);

    //Declaracion de objeto formulario
    const [formProfile, setFormProfile] = useState({
          nickname: "",
          biography: "",
          image: "",
  
  
    });
    // Manejador de cambios
    const handleChange=(e) =>{
        setFormProfile({...formProfile, [e.target.name]: e.target.value});
  };
  
  //Manejador de cambio de imagenes
  const handleImageChange=(e) =>{
    setFormProfile({...formProfile, image: e.target.files[0]});
  };

   // Manejador para publicar
   const handlePublish= () => {
            if(formProfile.nickname && formProfile.biography && formProfile.image){
                alert('Rellena  los campos');
                return;
            }


            // Variables que nos ayudan a guardar el contenido de imagenes en el evento
            const storageRef = ref(storage, `/profile/${Date.now()}${formProfile.image.name}`);
            const uploadImage = uploadBytesResumable(storageRef, formProfile.image);


            // Mi intención con estas lineas de código es crear una barra que marque el estado de lo que falta para que se guarde el evento
            uploadImage.on("state_changed",(snapshot)=>{
                const progressPercent = Math.round( (snapshot.bytesTransferred /snapshot.totalBytes) * 100);
                setProgress(progressPercent);
            },
            (err) => {
                console.log(err);
            },
            () => {
                setFormProfile({
                    nickname: "",
                    biography: "",
                    image: "",
                });
                getDownloadURL(uploadImage.snapshot.ref)
                .then((url) => {

                    const profRef = collection(db, "accounts");
                    addDoc(profRef,{
                        nickname: formProfile.nickname,
                        biography: formProfile.biography,
                        imageUrl: url,
                        createdBy: user.displayName || user.email,
                        userId:user.uid,
                    })
                    .then(() => {
                        toast("Evento añadido", {type: "success"}); // Terminar de hacer esto con todas las alertas que he dispuesto en el resto de documentos
                        setProgress(0);
                        navigate("/profile");
                    })
                    .catch((err)=>{
                        toast("Error al añadir evento", {type: "error"});
                    });
                });
            }
     );


    };
    // Manejador que controla el final de la acción de subir un evento
    const handleClose =async () => {
        try{
            navigate('/profile');
        }catch (error) {
            console.error(error.message);
        }
      };
return(
        
    <div className='w-full h-screen'>
        
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
    
        <div className='fixed w-full px-4 py-24 z-50'>
        
            <div className='max-w-[450px] h-[600px] mx-auto  bg-black/75 text-white'>
    
            <i className=" fa fa-times mx-6 my-6 right-full " onClick={handleClose} style={{cursor:"pointer"}} ></i>
    
                <div className='max-w-[320px] mx-auto py-4'>
    
                    <h2 className="text-3xl font-bold">Editar Perfil</h2>
                    
                    <div className=" w-full flex flex-col py-4">
                        <input type="text" name="nickname" placeholder='Nombre Usuario'
                        className="form-input p-3 my-2 bg-gray-700 rounded" value={formProfile.nickname} onChange={(e) => handleChange(e)}/>

                        {/* biography */}

                        <textarea name="biography" placeholder='Cuenta algo sobre ti....' className="form-textarea p-3 my-2 bg-gray-700 rounded" value={formProfile.biography} onChange={(e) => handleChange(e)}/>

                        {/* image */}
                        <label className="p-3  text-white-700 ">Foto de perfil</label>
                        <input type="file" name="image" placeholder='Foto' accept="image/*" className="form-input p-3 my-2 bg-gray-700 rounded" onChange={(e) => handleImageChange(e)}/>

                        {progress === 0 ? null :(
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped mt-2" style={{width: `$(progress)%`}}>
                                    {`subiendo imagen ${progress}%`}
                                </div>
                            </div>

                        )}

              
                        
                    
                        <button  onClick={handlePublish} className="  py-3 my-6 rounded font-bold mt-4 bg-slate-50 hover:bg-green-600 text-black shadow rounded border-green  py-2 px-4 w-full">Guardar Cambios</button>
                    
                    </div>

                </div>
            </div>
        
        </div>


        {/* Asi consigo que se muestre de fondo el feed principal*/}

        <Profile  className='hidden sm:block absolute w-full h-full object-cover'> </Profile>
      
    </div>


   
);


}

  export default EditProfile