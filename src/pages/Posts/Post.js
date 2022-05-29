import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom'
import { auth, db } from '../../firebase-config';
import LikesPosts from './LikesPosts';
import Comment from './Comment';

function Post() {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [user] = useAuthState(auth);

    useEffect(
        ()=>{
            const docRef = doc(db,"Posts",id);
            onSnapshot(docRef,(snapshot)=>{
                setPost({...snapshot.data(),id: snapshot.id});
            })
        }, []
    );
  return (
    <div>
        {
            post && (
                <div className='grid text-black'>
                    <div className='col-span-3'>
                        <img src={post.imageUrl} alt={post.title} style={{}} />
                    </div>
                        <div className='col-9 mt-3'>
                            <h2>{post.title}</h2>
                            <h5>Autor: {post.createdBy}</h5>
                            <div> Publicado el: {post.createdAt.toDate().toDateString()}</div>
                            <hr/>
                            <h4>{post.description}</h4>

                            <div className='flex flex-row-reverse'>
                                {user && <LikesPosts id={id} likes={post.likes}/>}
                                <div className='p-2'>
                                    <p>{post.likes.length}</p>
                                </div>
                            </div>
                            {/*comment*/}
                            <Comment id={post.id} />
                        </div>

                </div>
                
            )
        }

    </div>
  )
}

export default Post