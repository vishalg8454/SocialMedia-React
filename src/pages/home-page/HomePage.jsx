import { useEffect, useState } from "react";
import { NewPost, Post, Loader } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/post/postSlice";

const HomePage = () => {
  const { posts, status } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      <NewPost />
      <p className="text-xl mt-2 font-bold">Latest Posts</p>
      {/* {status === "loading" && (
        <div className="flex justify-center fixed text-center left-0 right-0">
          <Loader />
        </div>
      )} */}
      {posts.map(
        ({ _id, content, username, fullname, comments, profileImage }) => (
          <Post
            key={_id}
            _id={_id}
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
