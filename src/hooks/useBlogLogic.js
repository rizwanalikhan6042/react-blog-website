import { useState } from "react";

function useBlogLogic() {
  const [posts, setPosts] = useState([
    { id: 1, title: "My First Blog", content: "Hello! This is my first post." },
    { id: 2, title: "React is Fun", content: "Learning React step by step." }
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () =>{
    setIsDarkMode(!isDarkMode);
  }

  const addPost = (title, content) => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty");
      return;
    }
    const newPost = { id: posts.length + 1, title, content };
    setPosts([...posts, newPost]);
    setTitle("");
    setContent("");
  }
  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  }

  const editPost = (id, newTitle, newContent) => {
    const updatedPost = posts.map((post) => {
      if (post.id === id) {
        return { ...post, title: newTitle, content: newContent }
      }
      return post; //if id not match then same post ret
    })
    setPosts(updatedPost);
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  }

  const startEdit = (id, title, content) => {
    setEditId(id);
    setEditTitle(title);
    setEditContent(content);
  }

  return {
    posts, setPosts,
    title, setTitle, setContent, content, addPost, deletePost, editPost
    , editId, editContent, editTitle, setEditContent, setEditId, setEditTitle, startEdit
  }
}

export default useBlogLogic;