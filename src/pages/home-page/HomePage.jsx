import { useEffect, useState } from "react";
import { NewPost, Post } from "../../components";
import axios from "axios";
import {useDispatch,useSelector} from 'react-redux';
import {loginUser} from "../../features/auth/authSlice";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/posts");
      setPosts(res.data.posts);
    })();
    dispatch(loginUser());
  }, []);

  return (
    <div>
      <NewPost />
      <p className="text-xl mt-2 font-bold">Latest Posts</p>
      {posts.map(
        ({ _id, content, username, fullname, comments, profileImage }) => (
          <Post
            key={_id}
            content={content}
            username={username}
            fullname={fullname}
            comments={comments}
            profileImage={profileImage}
          />
        )
      )}
    </div>
  );
};

export { HomePage };
