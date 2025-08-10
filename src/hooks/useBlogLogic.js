import { useState } from "react";

function useBlogLogic(){
    const [posts, setPosts] = useState([
    { id: 1, title: "My First Blog", content: "Hello! This is my first post." },
    { id: 2, title: "React is Fun", content: "Learning React step by step." }
  ]);
  const [title,setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = (title,content) =>{
    if(!title.trim() ||!content.trim() ){
      alert("Title and content cannot be empty");
      return;
    }
     const newPost = { id: posts.length + 1, title, content };
     setPosts([...posts,newPost]);
     setTitle("");
     setContent("");
  }
  const deletePost = (id) =>{
    setPosts(posts.filter(post=>post.id!==id));
  }

  return {posts, setPosts,
  title,setTitle,setContent,content,addPost,deletePost

  }
}

export default useBlogLogic ;