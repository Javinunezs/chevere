import React, {useState, useEffect} from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import DeletePost from "./DeletePost";
import { auth, db } from "../../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import{useAuth} from "../../context/authContext"; 
import LikesPosts from "./LikesPosts";
import SavePost from "./SavePost";
import { useAuthState } from "react-firebase-hooks/auth";


// Estos import van a ser para insertar el mapa en esta pagina principal, en la columna 3

import {MapView} from "../Maps/MapView";
import { useMap} from "react-leaflet";

// Esta pagina funciona como Home por ahora actuando como un feed

export function Posts(){
    const [posts, setPosts] = useState([]);
    const { loading } = useAuth()  //ejemplo uso: <h1> Hola {user.email}</h1>
    const [user] = useAuthState(auth);
    const navigate =   useNavigate();

    // Con este hook vamos a conseguir mostrar todos los eventos guardados en la BD y ordenador por fecha de creacion
    // y de manera descendente
    useEffect(()=>{
        const evtsRef = collection(db,"Posts");
        const q = query(evtsRef,orderBy("createdAt", "desc"));
        onSnapshot(q,(snapshot)=>{
            const posts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(posts);
            console.log(posts);
        });
    },[]);

    // Manejador que nos ayuda a llamar a addpost para crear un evento desde esta pantalla
    const handleAddEvent = async () => {
        try{
            navigate('/addpost');
        }catch (error) {
            console.error(error.message);
        }

    };
      
      if (loading) return <h1> Loading </h1>


    // Vista de lo que seria el feed ahora mismo
    return(
        <div className="grid grid-cols-3  bg-gray-200">
                         
            <div className="col-span-3 pt-20">             

            {/* Aqui para solucionar el problema de esconderse debajo de navbar usaba <div className="py-10"></div>, ahora uso arriba pt-20 y volver a poner en col-span-2 cuando añada lo que quiero a la derecha, mientras ocupar toda la pantalla*/}

            {posts.length === 0 ? (
                    <p>No hay eventos!</p>
                ) : (  
                    

                   posts.map(({id,title,description,imageUrl, createdAt,createdBy,userId,likes,comments,savePost}) => (

                    <div className=" col-span-6   mx-5">
                       <div className="  border-y-zinc-50 rounded-md  px-4 py-4 z-50  mb-6 p-6 bg-gray-300 m-auto w-full text-black " key={id}>
                           
                           <div className="grid grid-cols-3 ">
                           <Link to={`/post/${id}`}>
                               <div className="rounded">
                                   
                                    <img className="w-full h-full object-cover" src= {imageUrl} alt = 'title' style={{height:150, width:300}}/>
                                   
                               </div>
                               </Link>
                               <div className="grid ">
                                    <div className="grid">
                                        <div className="col-span-6">
                                            {
                                                <Link to={'profile'}>
                                                {createdBy && (
                                                    <span className="inline-flex items-center justify-center px-2 py-3 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">{ createdBy }</span>
                                                )}
                                                </Link>
                                            }
                                        </div>
                                        <div className=" col-span-6 flex flex-row-reverse">
                                            {
                                                user && user.uid === userId && (
                                                    <DeletePost id={id} imageUrl={imageUrl}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">{title}</h3>
                                        <h5 className="text-sm font-light">{description}</h5>
                                    </div>
                                    
                                    <p className="text-xs font-light pt-6">{createdAt.toDate().toDateString()}</p> 

                                </div>
                                <div className="flex flex-row-reverse">
                                        {user && <LikesPosts id={id} likes={likes} />}
                                        <div className="p-2">
                                            <p>{likes?.length} likes</p>
                                        </div>
                                        {user && <SavePost id={id} savePost={savePost} />}
                                        <div className="p-2">
                                            <p>{savePost?.length} Evento Guardado</p>
                                        </div>
                                        {comments && comments.length > 0 && (
                                        <div className="p-2">
                                            <p>{comments?.length} comments</p>
                                        </div>
                                        )}
                                    </div>
                                <p className="ml-5 pl-5 px-5 text-xs font-light place-items-end">{createdAt.toDate().toDateString()}</p> 
                                
                            </div>
                
                       </div>

                       </div>
                       
                   ))

                )
            }

            </div> 
            {/*gracias a este div de abajo puedo poner el boton abajo a la derecha y he dejado el hueco para el perfil */}
            <div> <useMap /></div>           
            <button onClick={handleAddEvent} className="sticky bottom-5 left-full mr-6  p-0 w-10 h-10 bg-green-600 rounded-full hover:bg-green-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                    <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" className=" w-6 h-6 inline-block">
                        <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                                C15.952,9,16,9.447,16,10z" />
                     </svg>
            </button>

        </div>
    );
}

export default Posts;