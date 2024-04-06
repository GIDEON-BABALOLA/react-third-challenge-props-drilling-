import React, { useState, useEffect} from 'react'
import { Link, useParams, } from "react-router-dom"

const EditPost = ({
posts,
editBody,
editTitle,
handleEdit,
setEditTitle,
setEditBody



}) => {
  const [visibility, setVisibility] = useState(true)
    const { id } = useParams()
    const post = posts.find((post) => post.id.toString() === id)
    useEffect(() => {
if(post){
        setVisibility(true)
        setEditTitle(post.title)
        setEditBody(post.body)
    }else{
      setVisibility(false)
    }
    }, [post, setEditTitle, setEditBody])
  return (
    <main className='NewPost'>
    { visibility &&
<>
<h2>EditPost</h2>
        <form className='newPostForm' onSubmit={(e) =>  e.preventDefault()}>
        <label htmlFor='postTitle'>Title:</label>
        <input 
          id="editTitle"
          type= "text"
          required
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post:</label>
        <textarea
        id="postBody"
        //It does not need a type text because it is already a text area
        required
        value={editBody}
        onChange={(e) => setEditBody(e.target.value)}
         />
<button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
        </form>
</>
    }
    {
        !visibility &&
        <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
                <Link to="/">Visit Our Homepage</Link>
            </p>
        </>
    }
    </main>
  )
}

export default EditPost