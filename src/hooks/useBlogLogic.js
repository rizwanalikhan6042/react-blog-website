import { useState, useEffect } from "react";

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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const postsPerPage = 3;
  const indexLast = page * postsPerPage;
  const indexFirst = indexLast - postsPerPage;
   const visiblePosts = posts.slice(0, indexLast); 
  const nextPage = () => {
    setPage(page + 1);
  }

  const prevPage = () => setPage(page - 1);
  const loadMore = () => {
    setPage(prev => prev + 1);
  }

  useEffect(() => {
    const handleScroll = () => {
       if (!loading) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setPage(prev=>prev+1); // Load next posts
      }}
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[loading])
  
  useEffect(()=>{
    setLoading(false);
  },page);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    console.log(isDarkMode)
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
    , toggleDarkMode, isDarkMode, page, nextPage, prevPage, indexFirst, indexLast,visiblePosts, loading
  }
}

export default useBlogLogic;