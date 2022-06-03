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
import { Portal } from "../../components";
import parse from "html-react-parser";
import { Comment } from "./Comment";

const Post = ({
  content = "",
  comments = [],
  username = "",
  fullname = "",
  profileImage="",
}) => {
  const [replyText, setReplyText] = useState("");
  const [menuOn, setMenuOn] = useState(false);
  const ref = useRef();

  useEffect(() => {
    console.log(menuOn);
  }, [menuOn]);

  return (
    <div className=" my-4 bg-white p-4 max-w-[45rem] rounded">
      <div className=" flex">
        <Avatar img={profileImage} />
        <div className="flex flex-col ml-4">
          <div className="flex gap-2">
            <p className="font-semibold">{fullname}</p>
            <p className="text-slate-600">{`@${username}`}</p>
          </div>
          <div className="mt-2 max-w-full">{parse(content)}</div>
          <div className="flex justify-between mt-3 text-slate-600">
            <button className="hover:opacity-75">
              <FavoriteBorderIcon />
            </button>
            <button className="hover:opacity-75">
              <BookmarkBorderOutlinedIcon />
            </button>
            <button className="hover:opacity-75">
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
        {comments.map(({_id,username,text,profileImage}) => (
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
            <button className="flex p-2 hover:bg-white rounded">
              <DeleteIcon />
              <span className="ml-1">Delete</span>
            </button>
            <button className="flex p-2 hover:bg-white self-center rounded text-red-500">
              <FlagIcon />
              <span className="ml-1">Report</span>
            </button>
          </div>
        </Portal>
      )}
    </div>
  );
};

export { Post };
