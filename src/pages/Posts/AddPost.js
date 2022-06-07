import React, {useState} from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { storage, db, auth } from "../../firebase-config";
import {toast} from "react-toastify";
import {useAuth} from "../../context/authContext"; 
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {Posts} from "./Posts";
import TableDatePicker from "../CalendarDatePicker/TableDatePicker";



export function AddPost() {

    // Declaracion de constantes usadas  mas adelante
    let navigate = useNavigate();
    const { loading} = useAuth()  //ejemplo uso: <h1> Hola {user.email}</h1>
    const selectDate =TableDatePicker(); // variable que quiero usar para guardar las fechas que el usuario elija para realizar el evento
    const [user] = useAuthState(auth);
    const [date, setDate]=useState(new Date()); // variable que quiero usar para guardar las fechas que el usuario elija para realizar el evento
    const [progress,setProgress] = useState(0);



    // Declaracion de objeto formulario
    const[formData, setFormData] = useState({
        title: "",
        description: "",
        details: "",
        image: "",
        createdAt: Timestamp.now().toDate(),
        selectedDate: "", // variable que quiero usar para guardar las fechas que el usuario elija para realizar el evento

    });

    

    // Manejador de cambios
    const handleChange=(e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    //Manejador de cambio de imagenes
    const handleImageChange=(e) =>{
        setFormData({...formData, image: e.target.files[0]});
    };


    // Manejador para la asignacion de fecha a un evento
    const handleDate=() =>{

    };

    // Manejador para publicar
    const handlePublish= () => {
        if(!formData.title || !formData.description || !formData.image){
            alert('Rellena todos los campos');
            return;
        }


        // Variables que nos ayudan a guardar el contenido de imagenes en el evento
        const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
        const uploadImage = uploadBytesResumable(storageRef, formData.image);


        // Mi intención con estas lineas de código es crear una barra que marque el estado de lo que falta para que se guarde el evento
        uploadImage.on("state_changed",(snapshot)=>{
            const progressPercent = Math.round( (snapshot.bytesTransferred /snapshot.totalBytes) * 100);
            setProgress(progressPercent);
        },
        (err) => {
            console.log(err);
        },
        () => {
            setFormData({
                title:"",
                description: "",
                details: "",
                image: "",
            });
            getDownloadURL(uploadImage.snapshot.ref)
            .then((url) => {

                const postRef = collection(db, "Posts");
                addDoc(postRef,{
                    title: formData.title,
                    description: formData.description,
                    details: formData.details,
                    imageUrl: url,
                    createdAt: Timestamp.now().toDate(),
                    createdBy: user.displayName || user.email,
                    userId:user.uid,
                    likes:[],
                    comments:[]
                })
                .then(() => {
                    toast("Evento añadido", {type: "success"}); // Terminar de hacer esto con todas las alertas que he dispuesto en el resto de documentos
                    setProgress(0);
                    navigate("/");
                })
                .catch((err)=>{
                    toast("Error al añadir evento", {type: "error"});
                });
            });
        }
         );


    };



      //Estado de carga de la pagina
      if (loading) return <h1> Loading </h1>


      // Manejador que controla el final de la acción de subir un evento
      const handleClose =async () => {
        try{
            navigate('/');
        }catch (error) {
            console.error(error.message);
        }
      };



        
    // Formulario para rellenar datos de evento
    // Aun falta por Poder seleccionar lugar y fecha junto al deporte que se va a practicar

    return(
        
        <div className='w-full h-screen'>
            
            <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
        
            <div className='fixed w-full px-4 py-24 z-50'>
            
                <div className='max-w-[450px] h-[600px] mx-auto  bg-black/75 text-white'>
        
                <i className=" fa fa-times mx-6 my-6 right-full " onClick={handleClose} style={{cursor:"pointer"}} ></i>
        
                    <div className='max-w-[320px] mx-auto py-4'>
        
                        <h2 className="text-3xl font-bold">Crear Evento</h2>
                        
                        <div className=" w-full flex flex-col py-4">
                            <input type="text" name="title" placeholder='Titulo'
                            className="form-input p-3 my-2 bg-gray-700 rounded" value={formData.title} onChange={(e) => handleChange(e)}/>

                            {/* description */}

                            <textarea name="description" placeholder='Descripcion del evento...' className="form-textarea p-3 my-2 bg-gray-700 rounded" value={formData.description} onChange={(e) => handleChange(e)}/>
                            <textarea name="details" placeholder='Detalles Técnicos' className="form-textarea p-3 my-2 bg-gray-700 rounded" value={formData.details} onChange={(e) => handleChange(e)}/>
                            {/* image */}
                            <label className="p-3  text-white-700 ">Foto del Evento</label>
                            <input type="file" name="image" placeholder='Foto' accept="image/*" className="form-input p-3 my-2 bg-gray-700 rounded" onChange={(e) => handleImageChange(e)}/>

                            {progress === 0 ? null :(
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped mt-2" style={{width: `$(progress)%`}}>
                                        {`subiendo imagen ${progress}%`}
                                    </div>
                                </div>

                            )}

                            <TableDatePicker/>
                            
                        
                            <button  onClick={handlePublish} className="  py-3 my-6 rounded font-bold mt-4 bg-slate-50 hover:bg-green-600 text-black shadow rounded border-green  py-2 px-4 w-full">Publicar</button>
                        
                        </div>

                    </div>
                </div>
            
            </div>


            {/* Asi consigo que se muestre de fondo el feed principal*/}

            <Posts  className='hidden sm:block absolute w-full h-full object-cover'> </Posts>
          
        </div>


       
    );


}

export default AddPost

