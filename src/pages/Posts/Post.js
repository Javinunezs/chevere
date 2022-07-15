import {  doc,  onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams, Link } from 'react-router-dom'
import { auth, db } from '../../firebase-config';
import LikesPosts from './LikesPosts';

import Comment from './Comment';
import Avatar from "@mui/material/Avatar";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { useModal } from 'react-hooks-use-modal';

import AssistEv from './AssistEv';
import UnAssist from './UnAssist';


function Post() {


    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [user] = useAuthState(auth);







    const [Modal, open, close] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
      });
    



    // Este hook nos permite que se guarde la referencia del documento y guardar el post, para asi poder ver un post
    useEffect(
        ()=>{
            const docRef = doc(db,"Posts",id);
            onSnapshot(docRef,(snapshot)=>{
                setPost({...snapshot.data(),id: snapshot.id});
            })
        }, []
    );

    


    




  // Diseño de como se ve un evento por dentro, ahora mismo funcional pero el estilo hay que cambiarlo
  return (
    <div>
        {
            post && (
               
                    <div className=''>
                         <header className=' absolute  border-b border-slate-400    bg-white col-start-1 col-end-11 sticky md:top-0'>
                            <div className='text-slate-900 md:text-xl  font-light col-start-1 col-end-6 ml-20'> 
                                {post.createdAt.toDate().toDateString()}
                            </div>

                            <h1 className='font-bold leading-tight md:text-5xl xs:text-xl mt-5 mb-5 text-black col-start-1 col-end-6 xs:ml-5 sm:ml-20 pt-5'>
                                {post.title}
                            </h1>

                            <h5 className="md:hidden text-xs sm:text-md sm:col-start-2 sm:col-end-3 sm:ml-20 pl-5 mr-10 pr-5 pt-4 pb-4">
                                
                            <Link to={'../profile'}> Anfitrion </Link>
                               
                            </h5>
                            

                            <h5 className='md:hidden sm:col-start-2 sm:col-end-3  pl-4 mr-14 pr-5 leading-tight text-l font-semibold mt-0 mb-10 ml-20 text-black'> 
                                <Avatar src={user.photoURL} className=" ml-3 " />
                                <Link to={'../profile'}> {post.createdBy} </Link>
                            </h5>
                            
                        </header>
                        
                        <div className="  grid grid-cols-10  bg-gray-100">
                        
                         
                        
                        <div className='col-start-2 col-end-10 pb-6'></div>
                        

                            
                            
                            <div className='pb-5 md:hidden border-t bg-white border-slate-100 pt-5  col-start-1 col-end-11'>
                            
                            <div className='text-xl font-bold text-center'>Evento de {post.sport} </div>
                            <div className='text-center p-2'>
                                    <p>{post.likes.length} usuarios interesados   </p>
                                    Evento Publico
                            </div>
                            

                                

                                <div className='mx-5 font-bold pt-5'>
                                    {(post.date.toDate().toDateString())}
                               
                                </div>
                                <div className='mx-5 text-blue-400'>
                                Añadir al calendario
                                </div>
                                <div className='mx-5 font-bold pt-5'>
                                    {post.locationName.cityname.toString()}
                                </div>

                            </div>
                        
                            <div className=' md:col-start-2 md:col-end-7 sm:col-start-1 sm:col-end-11 md:ml-10 md:pl-5 md:mr-10 md:pr-5 '>
                            
                                <img className="sm:w-full sm:h-full object-cover" src={post.imageUrl} alt={post.title} style={{height:450}} />
                                
                            </div>

                            <div className='hidden md:grid md:grid-cols-3 rounded-3xl border-t border-b border-r border-l border-slate-200 absolute top-2/4 mt-20 transform  -translate-y-1/2  sticky col-start-7 col-end-10  ml-20 mr-20 bg-white '>
                            
                                <div className='col-start-1 col-end-4 text-center p-2'>
                                    <p>{post.likes.length} usuarios interesados   </p>
                                     en el
                                     <div className='col-start-1 col-end-4 text-xl font-bold text-center'>Evento de {post.sport} </div>
                                     Evento Publico
                                </div>
                                

                                <div className='col-start-1 col-end-4 mx-5 font-bold pt-5 '>
                                {(post.date.toDate().toString())} 
                                </div>
                                <div className='col-start-1 col-end-4 mx-5 text-blue-400'>
                                Añadir al calendario
                                </div>
                                <div className={` col-start-1 col-end-4 mx-5 font-bold pt-5`}>
                                                            {post.locationName.cityname.toString()}
                                </div>
                                
                                <div className='col-start-1 col-end-4 mx-5 text-blue-400 ' >
                                Denuncia este evento
                                </div>
                           
                            </div>

                            {/*-translate-x-1/2    esto sirve para fijar en pantalla */}


                            {/*<div className='col-start-8 col-end-11 mr-20 bg-white '>
                                <div></div>
                                {user && <LikesPosts id={id} likes={post.likes}/>}
                                <div className=' p-2'>
                                    <p>{post.likes.length}</p>
                                </div>
                                {user && <SavePost id={id} savePost={post.savePost}/>}
                                        <div className="p-2" onClick={savPost}>
                                            <p>{post.savePost?.length} Evento Guardado</p>
                                        </div>
                            </div> */}

                            <h2 className='my-5 leading-tight text-3xl font-bold  text-black md:col-start-2 md:col-end-7 sm:col-start-1 sm:col-end-11 ml-10 pl-5 mr-10 pr-5'>
                                Descripción
                            </h2>

                            <h4 className='text-2xl md:col-start-2 md:col-end-7 sm:col-start-1 sm:col-end-11 ml-10 pl-5 mr-10 pr-5'>
                                {post.description}
                            </h4>

                            <h2  className='my-5 leading-tight text-3xl font-bold text-black md:col-start-2 md:col-end-7 sm:col-start-1 sm:col-end-11 ml-10 pl-5 mr-10 pr-5'>
                                Detalles Técnicos
                            </h2>

                            <h4 className=' text-2xl md:col-start-2 md:col-end-7 sm:col-start-1 sm:col-end-11 ml-10 pl-5 mr-10 pr-5'>
                                {post.details}
                            </h4>

                            <div  className='my-10 leading-tight text-3xl font-bold text-black md:col-start-2 md:col-end-7 sm:col-start-1 sm:col-end-11 ml-10 pl-5 mr-10 pr-5'>
                                
                                {/* dan fallo ambas cosas <Assistents {post.assists.length}id={post.id}/>condicion de si es 0 no mostrar nada, debido a esto da fallo algunos post {post.assists.length}*/}
                                Asistentes ()
                                
                            </div>
                            <div>
                            {/*<Assistents id={post.id}/>*/}
                            </div>
                            
                                                     


                            {/*comment   <AssistEv id={id} assists={post.assists} />*/}
                            <Comment  id={post.id} />
                            
                            </div>
                            <div className=' sticky bottom-0'>
                                <footer className="grid grid-cols-10  bg-white w-full  border-t border-grey p-4 ">
                                    <div className='text-slate-900 text-l font-light md:col-start-2 md:col-end-6 sm:col-start-1 sm:col-end-6  ml-10 pl-5 mr-10 pr-5'> 
                                                        {post.createdAt.toDate().toDateString()}
                                                        <h1 className='font-bold leading-tight text-2xl mt-2 mb-2 text-black '>
                                                            {post.title}
                                                        </h1>
                                    </div>

                                    <div className='md:col-start-6 md:col-end-7 sm:col-start-6 sm:col-end-7 md:ml-20 md:pl-10  flex flex-row-reverse mt-8'>
                                        {user && <LikesPosts id={id} likes={post.likes}/>}
                                       
                                    </div>
                                    
                                    {user && <AssistEv id={id} assists={post.assists} />}
                                    {console.log(post.assists)}
                                    {/*user && <UnAssist id={id} assists={post.assists}/>*/}
                                    

                                       
                                    <div className='md:col-start-8 md:col-end-10 sm:col-start-9 sm:col-end-10 md:ml-10 md:pl-5 md:mr-36 sm:pr-2'>                                


                                        <button className="  ml-20 py-3 my-6 rounded-lg font-semibold mt-4 bg-white border-t border-b border-r border-l border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white text-xl shadow rounded border-green  py-2 md:x-4 h-3/4 w-full  fa fa-share fa-lg" onClick={open}><div className='hidden md:grid'>Compartir</div></button>
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
      

                                        
                                         
                                </footer>
                            </div>
                            
                        
                        </div>
                        
                        

                
                
            )
        }


        
    </div>
    
  )
}

export default Post