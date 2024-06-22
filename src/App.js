import React, { useEffect, useState } from 'react'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Newpost from './Newpost'
import Postpage from './Postpage'
import Header from './Header'
import Nav from './Nav'
import Missing from './Missing'
import Footer from './Footer'
import { format } from 'date-fns'
import api from './api/posts'
import Editpost from './Editpost'
import useWindowSize from './hooks/useWindowSize'
const App = () => {
  const [posts,setPosts]=useState([])
  const [search,setSearch] = useState('')
  const [searchResults,setSearchResults] = useState('')
  const [postBody,setPostBody] = useState('')
  const [postTitle,setPostTitle] = useState('')
  const [editTitle,setEditTitle] = useState('')
  const [editBody,setEditBody] = useState('')
  const {width} = useWindowSize()
  const navigate =useNavigate()
  useEffect(()=>{
    const filterPosts = async ()=>{
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch(err){
        if(err.response){
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error:${err}`);
        }
      }
    }
    filterPosts()
  },[])

  
  useEffect(()=>{
    // debugger
    const filteredResults = posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()))
      setSearchResults(filteredResults.reverse())
  },[posts,search])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const id = posts.length?posts[posts.length-1].id+1:1
    const datetime = format(new Date(), 'MMMM dd,yyyy pp')
    const newPost = {id,title:postTitle,datetime,body:postBody}
    try {
      const response = await api.post('/posts',newPost)
      const allPosts = [...posts,response.data]
      setPosts(allPosts)
      setPostBody('')
      setPostTitle('')
      navigate('/')  
    } catch (err){
      console.log(`Error:${err}`);
    }
  }

  const handleEdit = async (id)=>{
    const datetime = format(new Date(), 'MMMM dd,yyyy pp')
    const updatePost = {id,title:editTitle,datetime,body:editBody}
    try {
      const response = await api.put(`/posts/${id}`,updatePost)
      setPosts(posts.map(post=>post.id===id ? {...response.data}:posts))
      setEditBody('')
      setEditTitle('')
      navigate('/')
    } catch (err){
      console.log(`Error:${err}`);
    }
  }

  const handleDelete = async (id)=>{
   try {
    await api.delete(`/posts/${id}`)
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/')
    } catch(err) {
      console.log(`Error:${err}`);
    }
  }

  return (
    <div className='App'>
    <Header title='Social Media App' width={width}/>
    <Nav search={search} setSearch={setSearch}/>
    <Routes>
      <Route path="/" element={<Home posts={searchResults}/>}/>
      <Route path="/post">
        <Route index element={<Newpost postBody={postBody} postTitle={postTitle} setPostBody={setPostBody} setPostTitle={setPostTitle} handleSubmit={handleSubmit}/>}/>
        <Route path=":id" element={<Postpage posts={posts} handleDelete={handleDelete}/>}/>
      </Route>
      <Route path='/edit/:id' element={<Editpost 
          posts={posts}
          editBody={editBody}
          editTitle={editTitle}
          setEditBody={setEditBody}
          setEditTitle={setEditTitle}
          handleEdit={handleEdit}
        />}/>
      <Route path="/about" element={<About/>}/>
      <Route path="*" element={<Missing/>}/>
    </Routes>
   
    <Footer/>
    </div>
  )
}

export default App

