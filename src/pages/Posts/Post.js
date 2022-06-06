import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom'
import { auth, db } from '../../firebase-config';
import LikesPosts from './LikesPosts';
import SavePost from "./SavePost";
import Comment from './Comment';
import Avatar from "@mui/material/Avatar";

function Post(item) {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [saved, setSaved] = useState(false);
    const [user] = useAuthState(auth);

    const eventID=doc(db,'users', `${user?.email}`)

    const savPost = async()=>{
        if(user?.email){
            setSaved(true)
            await updateDoc(eventID, {savedPosts: arrayUnion({
                id: item.id,
                title: item.title,
                img: item.backdrop_path
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

  // Diseño de como se ve un evento por dentro, ahora mismo funcional pero el estilo hay que cambiarlo
  return (
    <div>
        {
            post && (
               
                    <div className=" mx-10 pt-20 grid grid-cols-10  bg-gray-100">
                         
                          
                    
                         
                            <div className='text-slate-900 text-xl font-light col-start-1 col-end-6 ml-20'> 
                                {post.createdAt.toDate().toDateString()}
                            </div>

                            <h1 className='font-bold leading-tight text-6xl mt-2 mb-10 text-black col-start-1 col-end-6 ml-20'>
                                {post.title}
                            </h1>

                            <Avatar src={user.photoURL} className="col-start-1 ml-20" />

                            <h5 className=" ml-5 col-start-2 col-end-3">
                                Anfitrion 
                            </h5>

                            <h5 className='col-start-2  leading-tight text-l font-bold mt-0 mb-10 ml-5 text-black'> 
                                {post.createdBy}
                            </h5>
                            

                            <div className=' col-start-1 col-end-8 ml-20'>
                                <img className="w-full h-full object-cover" src={post.imageUrl} alt={post.title} style={{height:450, width:700}} />
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
                                {post.description}
                            </h4>

                            

                            


                            {/*comment*/}
                            <Comment  id={post.id} />
                        
                        </div>

                
                
            )
        }

    </div>
  )
}

export default Post