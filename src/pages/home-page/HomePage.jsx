import { useEffect, useState } from "react";
import { NewPost, Post } from "../../components";
import axios from "axios";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/posts");
      setPosts(res.data.posts);
    })();
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
