import React, {useState} from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { storage, db, auth } from "../firebase-config";
import {toast} from "react-toastify";
import{useAuth} from "../context/authContext"; 
import { Alert } from "./Alert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {Posts} from "./Posts";
import TableDatePicker from "./CalendarDatePicker/TableDatePicker";



export function AddPost() {
    let navigate = useNavigate();

    const selectDate =TableDatePicker();
    const [user] = useAuthState(auth);
    const [date, setDate]=useState(new Date());
    // Declaracion de objeto formulario
    const[formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        createdAt: Timestamp.now().toDate(),
        selectedDate: "",

    });

    const [progress,setProgress] = useState(0);

    // Manejador de cambios
    const handleChange=(e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    //Manejador de cambio de imagenes
    const handleImageChange=(e) =>{
        setFormData({...formData, image: e.target.files[0]});
    };

    const handleDate=() =>{

    };

    // Manejador para publicar
    const handlePublish= () => {
        if(!formData.title || !formData.description || !formData.image){
            alert('Rellena todos los campos');
            return;
        }
        const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
        const uploadImage = uploadBytesResumable(storageRef, formData.image);

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
                image: "",
            });
            getDownloadURL(uploadImage.snapshot.ref)
            .then((url) => {

                const postRef = collection(db, "Posts");
                addDoc(postRef,{
                    title: formData.title,
                    description: formData.description,
                    imageUrl: url,
                    createdAt: Timestamp.now().toDate(),
                    createdBy: user.displayName || user.email,
                    selectedDate: Timestamp.fromMillis(selectDate),
                    userId:user.uid,
                    likes:[],
                    comments:[]
                })
                .then(() => {
                    toast("Evento añadido", {type: "success"});
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

    // Mirar si borro estas constantes
    const { logout, loading} = useAuth()  //ejemplo uso: <h1> Hola {user.email}</h1>


    /*// Manejador para salir de la cuenta de usuario actual
    const handleLogout =async () => {
        try{
          await logout();
        } catch (error) {
          console.error(error.message);
        }
      };*/
      
      if (loading) return <h1> Loading </h1>

      const handleClose =async () => {
        try{
            navigate('/');
        }catch (error) {
            console.error(error.message);
        }
      };


      /* <div className='w-full h-screen'>
            
        
            
            <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
            <div className='fixed w-full px-4 py-24 z-50'>

            <div className='fixed w-full px-4 py-24 z-50'>
             <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'> */


        
    // Formulario para rellenar datos de evento

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

            <Posts  className='hidden sm:block absolute w-full h-full object-cover'> </Posts>
          
        </div>


       
    );


}

export default AddPost


/* <div className=" bg-gray-200">

       


              
            <div className="py-8"> </div>
        
            <div className="px-10 grid grid-cols-1 rounded-lg fixed border-10 mx-5 mt-3 p-3 bg-green-200 text-black" >

                        <h2 className="text-lg font-bold">Crear Evento</h2>
                        <label className="" htmlFor="">Titulo</label>
                        <input type="text" name="title" className="form-input" value={formData.title} onChange={(e) => handleChange(e)}/>

                       

                        <label htmlFor="">Descripcion</label>
                        <textarea name="description" className="form-textarea" value={formData.description} onChange={(e) => handleChange(e)}/>

                       
                        <label htmlFor="">Foto</label>
                        <input type="file" name="image" accept="image/*" className="form-input" onChange={(e) => handleImageChange(e)}/>

                        {progress === 0 ? null :(
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped mt-2" style={{width: `$(progress)%`}}>
                                    {`subiendo imagen ${progress}%`}
                                </div>
                            </div>

                        )}

                    
                        <button  onClick={handlePublish} className=" mt-4 bg-slate-50 hover:bg-slate-200 text-black shadow rounded border-2 border-gray-300 py-2 px-4 w-full">Publicar</button>
                    


            </div>
        </div> */