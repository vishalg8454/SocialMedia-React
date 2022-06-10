import { useEffect, useState } from "react";
import { Post } from "../../components";
import { useSelector } from "react-redux";

const BookmarkPage = () => {
  const { bookmarks } = useSelector((store) => store.bookmark);
  const { posts } = useSelector((store) => store.post);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const bookmarkedPosts = posts.filter((post) =>
      bookmarks.some((_id) => post._id === _id)
    );
    setBookmarkedPosts(bookmarkedPosts);
  }, [bookmarks, posts]);

  return (
    <main>
      <p className="text-xl mt-2 font-bold dark:text-white">Bookmarked Posts</p>
      {bookmarkedPosts.length === 0 && (
        <p className="m-2 text-xl text-center dark:text-slate-100">
          You do not have any posts bookmarked.
        </p>
      )}
      {bookmarkedPosts.map(
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

export { BookmarkPage };
