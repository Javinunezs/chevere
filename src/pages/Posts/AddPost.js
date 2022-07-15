import React, {useState,  Component, useCallback, useEffect } from 'react';
import Select from 'react-select';


import { addDoc, collection, orderBy, getDocs, query, serverTimestamp, Timestamp, setDoc, DocumentData, QuerySnapshot, DocumentSnapshot } from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { storage, db, auth } from "../../firebase-config";
import {toast} from "react-toastify";
import {useAuth} from "../../context/authContext"; 
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {Posts} from "./Posts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {  StandaloneSearchBox, Marker, LoadScript } from '@react-google-maps/api';

const libraries = ["places"]; 
const apiKey = "AIzaSyCEYVwzxkIaAPgqgyYYeHSuVepc9g5Qg30";


const options = [
    { value: 'trekking', label: 'Trekking' },
    { value: 'senderismo', label: 'Senderismo' },
    { value: 'escalada', label: 'Escalada' }
  ];


export function AddPost() {

    // Declaracion de constantes usadas  mas adelante
    let navigate = useNavigate();
    const { loading} = useAuth()  //ejemplo uso: <h1> Hola {user.email}</h1>
   // variable que quiero usar para guardar las fechas que el usuario elija para realizar el evento
    const [user] = useAuthState(auth);
    const [date, setDate]=useState(new Date()); // variable que quiero usar para guardar las fechas que el usuario elija para realizar el evento
    const [progress,setProgress] = useState(0);
    const [selectedSport, setSelectedSport] = useState();
    const [startDate, setStartDate] = useState(null);




    const [searchBox, setSearchBox] = useState();
    const [map, setMap] = useState();
    const [point, setPoint] = useState();
    const [pointName, setPointName] = useState();
  
    const onPlacesChanged = () => {
      const places = searchBox.getPlaces();
      const place = places[0];
      const locationName ={
        cityname: place.formatted_address
      }
      const location ={
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      setPoint(location);
      setPointName(locationName);
      console.log(locationName);
      console.log(place);
      console.log(location);
      map.panTo(location);
    }


    const handleSelectChange= ({label})=>{

      console.log(label);
      setSelectedSport(label);

    }






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
                    comments:[],
                    assists: [],
                    sport: selectedSport,
                    date: date,
                    location: point,
                    locationName: pointName,
                   
                    
                  
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
        <div></div>
            <div className='fixed w-full px-4 py-24 z-50'>
            
                <div className='max-w-[450px] h-[800px] mx-auto  bg-black/75 text-white'>
        
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

                            <div>
                                <div className="text-black" style={{display: "flex"}}>
                                    <DatePicker 
                                    
                                    
                                    selected={date}
                                   
                                    onChange={(date) => setDate(date)}
                                    />
                                    




                                </div>
                                
                               

                            </div>
                            
                                
                                    <div className='pt-5 text-black'>
                                    <StandaloneSearchBox
                                        onLoad={(ref) => setSearchBox(ref)}
                                        onPlacesChanged={onPlacesChanged}>
                                        <input className='addressField' placeholder="Inserte Ubicación"/>
                                    </StandaloneSearchBox>
                                    {point && <Marker position={point}/>}
                                    </div>

                            
                          
                            <Select 
                                defaultValue={{label: 'Seleccione un deporte', value: 'empty'}}
                                className="text-black"  
                                onChange={handleSelectChange}  
                                options={options} 
                            />
                            
                            
                        
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

