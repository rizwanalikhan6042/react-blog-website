import React from "react";
import useBlogLogic from "../hooks/useBlogLogic";
import useAuthLogic from "../hooks/useAuthLogic";
import "../style/blog.css";
import LogoutButton from "./LogoutButton";

function BlogApp() {
    const {
        title,
        content,
        setContent,
        setTitle,
        addPost,
        deletePost,
        editPost,
        editId,
        editContent,
        editTitle,
        setEditContent,
        setEditId,
        setEditTitle,
        startEdit,
        toggleDarkMode,
        isDarkMode,
        searchTerm,
        setSearchTerm,
        sortOrder,
        setSortOrder,
        paginatedPosts
    } = useBlogLogic();
    const { user, setUser, token, setToken, handleLogin, setEmail, setPassword, handleLogout } = useAuthLogic();
    return (
        <div className={`container ${isDarkMode ? "dark" : ""}`}>
            {/* Dark mode toggle */}
            <button onClick={toggleDarkMode}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <p>{user ? `Welcome + ${user.name}` : "You are not logged in"} </p>

            {user ? (
                <LogoutButton />
            ) : (
                <div className="login-box">
                    <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
            <h1 className="header">My Blog Website</h1>

            {/* Search input */}
            <input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: "1rem" }}
            />

            {/* Sorting dropdown */}
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">Sort By</option>
                <option value="asc">Title (A-Z)</option>
                <option value="desc">Title (Z-A)</option>
            </select>

            {/* Add new post inputs */}
            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginTop: "1rem" }}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button onClick={() => addPost(title, content)}>Add Post</button>

            {/* Posts listing with edit/delete */}
            {paginatedPosts.map((post) => (
                <div key={post.id} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>

                    <button onClick={() => deletePost(post.id)}>Delete</button>
                    <button onClick={() => startEdit(post.id, post.title, post.content)}>
                        Edit
                    </button>

                    {editId === post.id && (
                        <>
                            <input
                                placeholder="New Title"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="New Content"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <button onClick={() => editPost(editId, editTitle, editContent)}>
                                Save
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default BlogApp;
