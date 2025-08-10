import React from "react";
import useBlogLogic from "../hooks/useBlogLogic";
import "../style/blog.css";

function BlogApp() {
    const { posts, title, content, setContent, setTitle, setPosts, addPost, deletePost, editPost, editId, editContent, editTitle, setEditContent, setEditId, setEditTitle, startEdit, toggleDarkMode, isDarkMode,id ,page, nextPage, prevPage, indexLast, visiblePosts,loading } = useBlogLogic();
    let postItems = [];


    return (
        <div className={`container ${isDarkMode ? "dark" : ""}`}>

            <button onClick={toggleDarkMode}>{isDarkMode ? "Light Mode" : "Dark Mode"}</button>
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

            {visiblePosts.map(post => (
                <div key={post.id} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}

            {/* Loading Indicator */}
            {loading && <p>Loading more posts...</p>}

        </div>
    )
}

export default BlogApp;