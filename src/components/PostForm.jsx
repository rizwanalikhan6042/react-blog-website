export default function PostForm({ title, setTitle, content, setContent, addPost }) {
  return (
    <div className="post-form">
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={addPost}>Add Post</button>
    </div>
  );
}
