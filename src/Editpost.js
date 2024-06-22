import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Editpost = ({posts,editTitle,editBody,setEditTitle,setEditBody,handleEdit}) => {
   const {id} =useParams()
   const post = posts.find(post=>(post.id).toString()===id)
   useEffect(()=>{
    if(post){
        setEditTitle(post.title)
        setEditBody(post.body)
    }
   },[posts,setEditBody,setEditTitle])
  return (
    <main className='NewPost'>
        {editTitle && 
            <>
                <h2>Edit Post</h2>
                <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor='postTitle'>Title :</label>
                    <input 
                        id='postTitle' 
                        type='text'
                        required
                        value={editTitle}
                        onChange={(e)=>setEditTitle(e.target.value)}
                    />
                     <textarea
                        id='postBody'
                        required
                        value={editBody}
                        onChange={(e)=> setEditBody(e.target.value)}
                    ></textarea>
                    <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
                </form>
            </>
            
        }
    </main>
  )
}

export default Editpost