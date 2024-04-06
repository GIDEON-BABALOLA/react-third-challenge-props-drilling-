import Layout from "./Layout.js";
import Home from "./Home.js";
import NewPost from "./NewPost.js";
import EditPost from "./EditPost.js";
import PostPage from "./PostPage.js";
import Missing from "./Missing.js";
import About from "./About.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format as dateFormat } from "date-fns";
import api from "./api/posts.js";
import useWindowSize from "./hooks/useWindowSize.js";
import useAxiosFetch from "./hooks/useAxiosFetch.js"
function App() {
  //In React, Always Call Hooks At The Top Level
  //Don't call Hooks inside loops, conditions, or nested functions.
  //Call Hooks from React function components
  //You can call hooks from custom hooks, such has calling hooks inside useEffect, and you can call hooks like useEffect also in your own created hooks
  //To find a list of react hooks check nikgraf.github.io/react-hooks
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSetResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading} = useAxiosFetch("http://localhost:3000/posts")
  useEffect(() => {
setPosts(data)
  }, [data])
  
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //       if (response && response.data) setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         //Not in the 200 range
  //         console.log(err.response.data.message);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error ${err.message}`);
  //       }
  //       //Axios automatically catches an error when the status code is not in the 200 range of http responses.
  //     }
  //   };
  //   fetchPosts();
  // }, []);
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSetResults(filteredResults.reverse());
  }, [search, posts]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = dateFormat(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      setPosts([...posts, response.data]);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(err.response.status);
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      console.log(err.response.status);
    }
  };
  const handleEdit = async (id) => {
    const datetime = dateFormat(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map((post) => (post.id === id ? response.data  : post)));
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(err)
      console.log(err.response.status);
    }
  };
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout search={search} setSearch={setSearch} width={width} />}
      >
        <Route index element={<Home 
        posts={searchResult}
        fetchError={fetchError}
        isLoading={isLoading}
         />} />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route
          path="edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              editBody={editBody}
              setEditTitle={setEditTitle}
              setEditBody={setEditBody}
            />
          }
        ></Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
