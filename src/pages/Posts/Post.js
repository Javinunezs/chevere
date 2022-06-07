import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState, Component } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams, useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase-config';
import LikesPosts from './LikesPosts';
import SavePost from "./SavePost";
import Comment from './Comment';
import Avatar from "@mui/material/Avatar";
import Share from './Share';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { useModal } from 'react-hooks-use-modal';

function Post() {
    let navigate = useNavigate();
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [saved, setSaved] = useState(false);
    const [user] = useAuthState(auth);
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
      });
    

    const eventID=doc(db,'users', `${user?.email}`)

    const savPost = async()=>{
        if(user?.email){
            setSaved(true)
            await updateDoc(eventID, {savedPosts: arrayUnion({
               /* id: item.id,
                title: item.title,
                img: item.backdrop_path*/
            })
            })
        }
        else{
            alert('Please log in');
        }
    }

    // Este hook nos permite que se guarde la referencia del documento y guardar el post, para asi poder ver un post
    useEffect(
        ()=>{
            const docRef = doc(db,"Posts",id);
            onSnapshot(docRef,(snapshot)=>{
                setPost({...snapshot.data(),id: snapshot.id});
            })
        }, []
    );



   const handleShare = () => {
    try{
        navigate('/share');
    }catch (error) {
        console.error(error.message);
    }

};




  // Diseño de como se ve un evento por dentro, ahora mismo funcional pero el estilo hay que cambiarlo
  return (
    <div>
        {
            post && (
               
                    <div >
                         
                          <div className="   grid grid-cols-10  bg-gray-200">
                        
                         <div className=' bg-white col-start-1 col-end-11 sticky top-0'>
                            <div className='text-slate-900 text-xl font-light col-start-1 col-end-6 ml-20'> 
                                {post.createdAt.toDate().toDateString()}
                            </div>

                            <h1 className='font-bold leading-tight text-6xl mt-2 mb-10 text-black col-start-1 col-end-6 ml-20 pt-5'>
                                {post.title}
                            </h1>
                        </div>
                            <Avatar src={user.photoURL} className="col-start-1 bottom ml-20" />

                            <h5 className=" ml-5 col-start-2 col-end-3">
                                Anfitrion 
                            </h5>

                            <h5 className='col-start-2  leading-tight text-l font-bold mt-0 mb-10 ml-5 text-black'> 
                                {post.createdBy}
                            </h5>
                            
                        
                            <div className=' col-start-1 col-end-7 ml-20'>
                                <img className="w-full h-full object-cover" src={post.imageUrl} alt={post.title} style={{height:450}} />
                            </div>

                            <div className='col-start-9 col-end-11 flex flex-row-reverse'>
                                {user && <LikesPosts id={id} likes={post.likes}/>}
                                <div className='p-2'>
                                    <p>{post.likes.length}</p>
                                </div>
                                {user && <SavePost id={id} savePost={post.savePost}/>}
                                        <div className="p-2" onClick={savPost}>
                                            <p>{post.savePost?.length} Evento Guardado</p>
                                        </div>
                            </div>

                            <h2 className='my-10 leading-tight text-3xl font-bold  text-black col-start-1 col-end-6 ml-20'>
                                Descripción
                            </h2>

                            <h4 className=' col-start-1 col-end-6 ml-20'>
                                {post.description}
                            </h4>

                            <h2  className='my-10 leading-tight text-3xl font-bold text-black col-start-1 col-end-6 ml-20'>
                                Detalles Técnicos
                            </h2>

                            <h4 className=' col-start-1 col-end-6 ml-20'>
                                {post.details}
                            </h4>

                            

                            


                            {/*comment*/}
                            <Comment  id={post.id} />
                            
                            </div>
                            <div className=' sticky bottom-0'>
                                <footer className="grid grid-cols-10  bg-white w-full  border-t border-grey p-4 ">
                                    <div className='text-slate-900 text-l font-light col-start-3 col-end-5 '> 
                                                        {post.createdAt.toDate().toDateString()}
                                                        <h1 className='font-bold leading-tight text-2xl mt-2 mb-2 text-black col-start-1 col-end-6'>
                                                            {post.title}
                                                        </h1>
                                    </div>

                                    <div className='col-start-5 col-end-6 flex flex-row-reverse mt-8'>
                                        {user && <LikesPosts id={id} likes={post.likes}/>}
                                       
                                    </div>

                                    <button onClick={handleShare} className=" col-start-6 col-end-8 ml-20 py-3 my-6 rounded font-bold mt-4 bg-green-600 hover:bg-slate-500 text-black shadow rounded border-green  py-2 px-4 h-3/4 w-full">Asistir</button>
                                       
                                    <div className=' col-start-9 col-end-10 '>                                


                                        <button className="  py-3 my-6 rounded font-bold mt-4 bg-white border-t border-b border-r border-l border-blue-500 hover:bg-blue-500 text-black shadow rounded border-green  py-2 px-4 h-3/4 w-full mr-5  text-xl fa fa-share fa-lg" onClick={open}>Compartir</button>
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