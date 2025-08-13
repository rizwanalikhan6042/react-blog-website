import PostForm from "./PostForm";
import "../style/blog.css";
export default function PostCard({
  post,
  editId,
  editTitle,
  editContent,
  setEditTitle,
  setEditContent,
  startEdit,
  deletePost,
  editPost
}) {
  return (
    <div className="post" >
      {editId === post.id ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={() => editPost(post.id, editTitle, editContent)}>Save</button>

        </>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => startEdit(post.id, post.title, post.content)}>Edit</button>

          <button onClick={() => deletePost(post.id)}>Delete</button>
        </>
      )}
    </div>
  );
}
