import { useRouter } from "next/router";
import React, { useState } from "react";

const CreateBlog = () => {
   const router = useRouter()
    const [blogData, setblogData] = useState({
        title:"",
        date:"",
        content:"",
        imageLinks1:"",
        imageLinks2:"",
        imageLinks3:"",
        imageLinks4:"",
        blogKeyword1:"",
        blogKeyword2:"",
        blogKeyword3:"",
        blogKeyword4:"",
    })

    const setBlogData = (event)=>{
        const value = event.target.value
        const name = event.target.name

        setblogData({...blogData,[name]:value})
    }

    const CreateblogPost = async (event)=>{
        event.preventDefault()
        const{ title, date, content, imageLinks1, imageLinks2, imageLinks3, imageLinks4 ,blogKeyword1 ,blogKeyword2,blogKeyword3,blogKeyword4} = blogData
           await fetch("http://localhost:8000/createPost",{
                mode:'cors',
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({ title, date, content, imageLinks1, imageLinks2, imageLinks3, imageLinks4 ,blogKeyword1 ,blogKeyword2 ,blogKeyword3 ,blogKeyword4})
            }).then((res)=>{res.json()}).then((data)=>{console.log(data)}).catch((err)=>{console.log(err)})
        alert("Blog Post Created")
        router.push('/')
        }

  return (
    <React.Fragment>
      <form method="POST">
        <h1>Create Post</h1>
        <label>Title</label>
        <input type="text" value={blogData.title} name="title"  onChange={(event)=>{setBlogData(event)}} />
        <label>Date</label>
        <input type="text" value={blogData.date} name="date" onChange={(event)=>{setBlogData(event)}}  />
        <label>Content</label>
        <textarea value={blogData.content} name="content" onChange={(event)=>{setBlogData(event)}} />
        <label>Image Links</label>
        <input type="text" value={blogData.imageLinks1} name="imageLinks1"  onChange={(event)=>{setBlogData(event)}} />
        <input type="text" value={blogData.imageLinks2} name="imageLinks2" onChange={(event)=>{setBlogData(event)}}  />
        <input type="text" value={blogData.imageLinks3} name="imageLinks3" onChange={(event)=>{setBlogData(event)}} />
        <input type="text" value={blogData.imageLinks4} name="imageLinks4" onChange={(event)=>{setBlogData(event)}} />
        <input type="text" value={blogData.blogKeyword1} name="blogKeyword1" onChange={(event)=>{setBlogData(event)}} />
        <input type="text" value={blogData.blogKeyword2} name="blogKeyword2" onChange={(event)=>{setBlogData(event)}} />
        <input type="text" value={blogData.blogKeyword3} name="blogKeyword3" onChange={(event)=>{setBlogData(event)}} />
        <input type="text" value={blogData.blogKeyword4} name="blogKeyword4" onChange={(event)=>{setBlogData(event)}} />
        <input type="submit" onClick={(event)=>{CreateblogPost(event)}} />
      </form>
    </React.Fragment>
  );
};

export default CreateBlog;
