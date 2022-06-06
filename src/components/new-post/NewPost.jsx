import avatar from "../../assets/avatar.jpeg";
import user from "../../assets/user.png";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Picker from "emoji-picker-react";
import { Portal, Avatar } from "../../components";
import "./newpost.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../features/post/postSlice";

const btnRef = React.createRef();

const NewPost = () => {
  const inputReference = useRef(null);
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  var icons = ReactQuill.Quill.import("ui/icons");
  icons["italic"] = null;
  icons["image"] = null;

  const noModules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  const onEmojiClick = (event, emojiObject) => {
    setText(
      (prev) =>
        prev.slice(0, prev.length - 4) + emojiObject.emoji + prev.slice(-4)
    );
  };

  const emojiHandler = (e) => {
    setShowEmoji(!showEmoji);
  };

  const postHandler = () => {
    if (token) {
      dispatch(createPost({ token, text }));
      setText("");
    } else {
      toast.warning("You must be Signed in to add a post.");
    }
  };

  return (
    <div className="rounded w-full p-4 bg-white border flex flex-col">
      <div className=" flex items-start">
        <Avatar img={token ? avatar : user} />
        <ReactQuill
          value={text}
          style={{ border: "none" }}
          className="w-full m-2 p-1"
          fontSize="40px"
          modules={noModules}
          onChange={(e) => setText(e)}
          placeholder={"What's on your mind?"}
          ref={inputReference}
        />
      </div>

      <div className="flex mb-2">
        <div
          style={{ border: "none" }}
          id="toolbar"
          className="border-2 border-blue-500 self-center text-slate-700 flex gap-5 ml-16"
        >
          <button className="ql-image">
            <div>
              <InsertPhotoOutlinedIcon sx={{ fontSize: 32 }} />
            </div>
          </button>
          <button className="">
            <div>
              <GifBoxOutlinedIcon className="" sx={{ fontSize: 32 }} />
            </div>
          </button>
          <button ref={btnRef} onClick={emojiHandler}>
            <div>
              <InsertEmoticonIcon sx={{ fontSize: 32 }} />
            </div>
          </button>
        </div>
        <button
          disabled={text.length === 0 || text === "<p><br></p>"}
          className="rounded ml-auto border-4 border-blue-500
         p-1 px-4 mr-2 hover:opacity-75 bg-blue-500 text-white disabled:cursor-not-allowed"
          onClick={postHandler}
        >
          Post
        </button>
      </div>
      {showEmoji && (
        <Portal dismiss={setShowEmoji} anchorRef={btnRef}>
          {" "}
          <Picker onEmojiClick={onEmojiClick} />
        </Portal>
      )}
    </div>
  );
};

export { NewPost };
