import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import { Avatar } from "../../components/avatar/Avatar";
import { AvatarSmall } from "../../components/avatar/AvatarSmall";
import { useEffect, useRef, useState } from "react";
import { Portal, PortalForModal, EditModal } from "../../components";
import parse from "html-react-parser";
import { Comment } from "./Comment";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePost,
  likePost,
  unlikePost,
} from "../../features/post/postSlice";
import {
  addToBookmark,
  removeFromBookmark,
} from "../../features/bookmark/bookmarkSlice";

const Post = ({
  content = "",
  comments = [],
  username = "",
  fullname = "",
  profileImage = "",
  _id,
}) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.auth);
  const { posts, status } = useSelector((store) => store.post);
  const { bookmarks, status: bookmarkStatus } = useSelector(
    (store) => store.bookmark
  );
  const [replyText, setReplyText] = useState("");
  const [menuOn, setMenuOn] = useState(false);
  const [editModalOn, setEditModalOn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setisBookmarked] = useState(false);
  const ref = useRef();

  const deletePostHandler = () => {
    dispatch(deletePost({ token: token, postId: _id }));
  };

  const likePostHandler = () => {
    dispatch(likePost({ token: token, postId: _id }));
  };

  const unlikePostHandler = () => {
    dispatch(unlikePost({ token: token, postId: _id }));
  };

  const addToBookmarkHandler = () => {
    dispatch(addToBookmark({ token: token, postId: _id }));
  };

  const removeFromBookmarkHandler = () => {
    dispatch(removeFromBookmark({ token: token, postId: _id }));
  };

  useEffect(() => {
    const post = posts.find((post) => post._id === _id);
    const liked = post.likes.likedBy.some((it) => it._id === user._id);
    setIsLiked(liked);
  }, [posts]);

  useEffect(() => {
    const present = bookmarks.some((id) => id === _id);
    setisBookmarked(present);
  }, [bookmarks]);

  return (
    <div className=" my-4 bg-white p-4 max-w-[45rem] rounded">
      <div className="flex">
        <Avatar img={profileImage} />
        <div className="flex flex-col ml-4 w-full">
          <div className="flex gap-2">
            <p className="font-semibold">{fullname}</p>
            <p className="text-slate-600">{`@${username}`}</p>
          </div>
          <div className="mt-2 max-w-full">{parse(content)}</div>
          <div className="w-full flex justify-between mt-3 text-slate-600">
            {!isLiked && (
              <button
                disabled={status === "loading"}
                className="hover:opacity-75 disabled:cursor-not-allowed"
                onClick={likePostHandler}
              >
                <FavoriteBorderIcon />
              </button>
            )}
            {isLiked && (
              <button
                disabled={status === "loading"}
                className="hover:opacity-75 disabled:cursor-not-allowed"
                onClick={unlikePostHandler}
              >
                <FavoriteOutlinedIcon />
              </button>
            )}
            {!isBookmarked && (
              <button
                className="hover:opacity-75 disabled:cursor-not-allowed"
                onClick={addToBookmarkHandler}
                disabled={bookmarkStatus === "loading"}
              >
                <BookmarkBorderOutlinedIcon />
              </button>
            )}
            {isBookmarked && (
              <button
                className="hover:opacity-75 disabled:cursor-not-allowed"
                onClick={removeFromBookmarkHandler}
                disabled={bookmarkStatus === "loading"}
              >
                <BookmarkOutlinedIcon />
              </button>
            )}
            <button
              className="hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setEditModalOn(!editModalOn)}
              disabled={user.username !== username}
            >
              <EditOutlinedIcon />
            </button>
            <button
              onClick={() => setMenuOn(!menuOn)}
              ref={ref}
              className="hover:opacity-75"
            >
              <MoreVertOutlinedIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-5">
        <div className="ml-2 flex">
          <AvatarSmall img={profileImage} />
          <input
            placeholder="Post your reply..."
            className="rounded pr-8 pl-4 ml-4 w-full  border border-text-slate-800 outline-none "
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></input>
          <button
            disabled={replyText.length === 0}
            className="disabled:text-slate-700 text-blue-500 -ml-8"
          >
            <SendOutlinedIcon />
          </button>
        </div>
        {comments.map(({ _id, username, text, profileImage }) => (
          <Comment
            key={_id}
            comment={text}
            fullname={username}
            userName={username}
            profileImage={profileImage}
          />
        ))}
      </div>
      {menuOn && (
        <Portal anchorRef={ref} dismiss={setMenuOn}>
          <div className="bg-blue-200 flex flex-col p-2 rounded">
            {user.username === username && (
              <button
                className="flex p-2 hover:bg-white rounded"
                onClick={deletePostHandler}
              >
                <DeleteIcon />
                <span className="ml-1">Delete</span>
              </button>
            )}
            <button className="flex p-2 hover:bg-white self-center rounded text-red-500">
              <FlagIcon />
              <span className="ml-1">Report</span>
            </button>
          </div>
        </Portal>
      )}
      {editModalOn && (
        <PortalForModal dismiss={setEditModalOn}>
          <EditModal postText={content} dismiss={setEditModalOn} postId={_id} />
        </PortalForModal>
      )}
    </div>
  );
};

export { Post };
