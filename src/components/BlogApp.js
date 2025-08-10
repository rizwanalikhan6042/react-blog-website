import React from "react";
import useBlogLogic from "../hooks/useBlogLogic";
import "../style/blog.css";

function BlogApp() {
    const { posts, title, content, setContent, setTitle, setPosts, addPost, deletePost, editPost, editId, editContent, editTitle, setEditContent, setEditId, setEditTitle, startEdit } = useBlogLogic();
    let postItems = [];


    return (
        <div className="container">
            <h1 className="header">My Blog Website</h1>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={() => addPost(title, content)}>Add Post</button>
            {/* post display */}
            {posts.map((p) => (
                <div key={p.id} className="post">
                    <h2>{p.title}</h2>
                    <p>{p.content}</p>
                    <button onClick={() => deletePost(p.id)}>Delete</button>
                    <button onClick={() => startEdit(p.id, p.title, p.content)} >Edit</button>
                    {editId === p.id && (
                        <button onClick={() => editPost(editId, editTitle, editContent)}>Save</button>
                    )}
                    <input placeholder="New Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                    <textarea
                        placeholder="New Content"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button onClick={() => {
                        editPost(editId, editTitle, editContent)
                    }}>Save</button>
                </div>
            ))}
        </div>
    )
}

export default BlogApp;