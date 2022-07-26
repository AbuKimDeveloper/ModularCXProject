import { useEffect, useState } from "react"
import { API_URL } from "../../constants";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import "./posts.css"

export default function Posts() {

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);


  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}posts`, {
        method: "GET",
        headers: {
          accept: "application/json",
          'content-type': "application/json",
        }
      });
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div className="loader-container">
    <Loader />
  </div>

  return <div className='posts-container'>
    {posts.length === 0 && <h3>No posts to be shown :( </h3>}
    {posts.map((eachPost, index) => {
      const { author, content, title, _id } = eachPost;
      const postProps = { author, content, title, index, _id }
      return <Post key={index} {...postProps} />
    })}
  </div>
}
