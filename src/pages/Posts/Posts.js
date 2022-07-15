import React, {useState, useEffect} from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import DeletePost from "./DeletePost";
import { auth, db } from "../../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import{useAuth} from "../../context/authContext"; 
import LikesPosts from "./LikesPosts";
import SavePost from "./SavePost";
import { useAuthState } from "react-firebase-hooks/auth";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { useModal } from 'react-hooks-use-modal';


// Estos import van a ser para insertar el mapa en esta pagina principal, en la columna 3



// Esta pagina funciona como Home por ahora actuando como un feed

export function Posts(){
    const [posts, setPosts] = useState([]);
    const { loading } = useAuth()  //ejemplo uso: <h1> Hola {user.email}</h1>
    const [user] = useAuthState(auth);
    const navigate =   useNavigate();



    const [Modal, open, close] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
      });

    // Con este hook vamos a conseguir mostrar todos los eventos guardados en la BD y ordenador por fecha de creacion
    // y de manera descendente
    useEffect(()=>{
        const evtsRef = collection(db,"Posts");
        const dt = new Date();
        dt.setDate(dt.getDate() -1 ); // day before
        const q = query(evtsRef, where("date", ">", dt),orderBy("date", "asc"));
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
        <div className=" grid grid-cols-3  bg-gray-200">
                         
            <div className="col-span-6 pt-20">             

            {/* Aqui para solucionar el problema de esconderse debajo de navbar usaba <div className="py-10"></div>, ahora uso arriba pt-20 y volver a poner en col-span-2 cuando añada lo que quiero a la derecha, mientras ocupar toda la pantalla*/}

            {posts.length === 0 ? (
                    <p>No hay eventos!</p>
                ) : (  
                    

                   posts.map(({id,title,description,imageUrl, createdAt,createdBy,userId,likes,comments,assists,savePost, sport, date, locationName}) => (

                    <div className="">
                        {/*arriba grid grid-cols-10 pero da fallo ya que no se puede añadir evento */}
                       <div className="sm:px-20 xs:pl-3 sm:col-start-5 sm:col-end-10 border-y-zinc-50 rounded-md   py-4 z-50  bg-gray-200 m-auto w-full text-black " key={id}>
                       
                       <Link to={`/post/${id}`}>
                           <div className="grid grid-cols-10  border-t pt-5  border-slate-300 ">
                           <div className='md:hidden sm:col-start-1 sm:col-end-7 sm:text-lg sm:font-semibold xs:col-start-1 xs:col-end-5 xs:text-xs'> {
                                                user && user.uid === userId && (
                                                    <div className="">
                                                    <DeletePost id={id} imageUrl={imageUrl}/>
                                                    </div>
                                                )
                                            } {sport}</div>
                                
                               <div className="hidden md:grid col-start-1 col-end-3 ">
                                   
                                    <img className="w-full h-full rounded-lg object-cover" src= {imageUrl} alt = 'title' style={{height:150, width:300}}/>
                                   
                               </div>

                               

                               <div className="md:col-start-3 md:col-end-8 md:ml-4 sm:col-start-1 sm:col-end-7 xs:col-start-1 xs:col-end-6 ">
                                <p className=" text-green-800  md:text-lg xs:text-sm font-semibold sm:pb-3">{(date.toDate().toDateString())}  {(date.toDate().toLocaleTimeString())}</p> 
                                    <h3 className="md:text-lg xs:text-md font-semibold">{title} </h3>
                                    
                                    {
                                        <Link to={'profile'}>
                                            {createdBy && (
                                                <span className="inline-flex md:text-md xs:text-sm  items-center justify-center  py-3 font-light leading-none text-slate-500 bg-slate-350 rounded-full">{ createdBy }</span>
                                            )}
                                        </Link>
                                    }
                                    <div className="">
                                        {assists && (
                                            <span className="inline-flex md:text-md xs:text-xs items-center justify-center  py-3 font-light leading-none text-slate-500 bg-slate-350 rounded-full">{ assists.length} asistentes</span>
                                        )}
                                     </div>   
                                </div>
                                        
                                    
                                    <div className='hidden md:grid ml-10 pl-10 col-start-9 col-end-11 text-lg font-semibold'> {
                                                user && user.uid === userId && (
                                                    <div className="ml-20">
                                                    <DeletePost id={id} imageUrl={imageUrl}/>
                                                    </div>
                                                )
                                            } {sport}</div>

                                    
                                
                                <div className="md:hidden sm:col-start-7 sm:col-end-11 xs:col-start-6 xs:col-end-11">
                                   
                                   <img className="w-full h-full md:rounded-lg object-cover" src= {imageUrl} alt = 'title' style={{height:150, width:300}}/>
                                  
                              </div>
                              
                            </div>
                            
                            
                            </Link>
                            
                            
                       </div>
                       
                            <div className="md:col-start-9 md:col-end-9 xs:col-start-10 xs:col-end-11  mb-4">
                                            {user && <LikesPosts id={id} likes={likes} />}
                                        {/* <div className="p-2">
                                                <p>{likes?.length} likes</p>
                                            </div>*/}
                                            
                                            
                                        
                            </div>
                                                           
                            <div className='md:col-start-9 md:col-end-9 xs:col-start-10 xs:col-end-11  mb-4'> 
                            <div className="fa fa-share md:fa-lg xs:fa-xs md:px-20 " onClick={open}></div>
                                
                                <Modal>
                                <div className='bg-slate-400 text-Black w-[350px] h-[250px] mx-auto'>
                                <h1 className='text-3xl font-bold'>Compartir Evento</h1>
                                    <p>
                                        <FacebookShareButton
                                            url={"https://peing.net/en/"}
                                            
                                            hashtag={"#hashtag"}
                                            description={"aiueo"}
                                            className="Demo__some-network__share-button"
                                        >
                                            <FacebookIcon size={32} round /> Facebook
                                        </FacebookShareButton>
                                        <br />
                                        <TwitterShareButton
                                            title={"test"}
                                            url={"https://peing.net/en/"}
                                            hashtags={["hashtag1", "hashtag2"]}
                                        >
                                            <TwitterIcon size={32} round />
                                            Twitter
                                        </TwitterShareButton>
                                        <br />
                                        <WhatsappShareButton
                                            title={"test"}
                                            url={"https://peing.net/en/"}
                                            hashtags={["hashtag1", "hashtag2"]}
                                        >
                                            <WhatsappIcon size={32} round />
                                            Whatsapp
                                        </WhatsappShareButton>
                                    </p>
                                    <button className='pt-10 text-white' onClick={close}>CLOSE</button>
                                </div>
                                </Modal>
                            </div>

                       

                       </div>
                       
                   ))

                )
            }

            </div> 
            {/*gracias a este div de abajo puedo poner el boton abajo a la derecha y he dejado el hueco para el perfil */}
            <div></div>           
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