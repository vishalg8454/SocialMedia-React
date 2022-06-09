import { Post } from "../../components";
import { useSelector } from "react-redux";

const ExplorePage = () => {
  const { posts } = useSelector((state) => state.post);
  return (
    <main>
      <p className="text-xl mt-2 font-bold">Explore Posts from other users</p>
      {posts.length === 0 && (
        <p className="m-2 text-xl text-center">
          You do not have any posts bookmarked.
        </p>
      )}
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
    </main>
  );
};

export { ExplorePage };
