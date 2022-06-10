import { Avatar, Portal } from "../../../components";
import Picker from "emoji-picker-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { editPost } from "../../../features/post/postSlice";

const EditModal = ({ postText = "", dismiss, postId }) => {
  const inputReference = useRef(null);
  const btnRef = useRef(null);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [text, setText] = useState(postText);
  const [showEmoji, setShowEmoji] = useState(false);

  var icons = ReactQuill.Quill.import("ui/icons");
  icons["italic"] = null;
  icons["image"] = null;

  const noModules = {
    toolbar: false,
    // toolbar: {
    //   container: "#toolbar",
    // },
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

  const editHandler = () => {
    dispatch(editPost({ token: token, text: text, postId: postId }));
    dismiss((prev) => !prev);
  };

  return (
    <div className="w-screen flex justify-center h-screen items-center">
      <div
        className="max-h-[90%] w-[95%] sm:w-[80%] lg:w-[60%] rounded p-4 bg-white border dark:bg-slate-800 flex flex-col 
       dark:text-white"
      >
        <div className=" flex items-start">
          <Avatar img={user.profileImage} />
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
            className="border-2 dark:text-white border-blue-500 self-center text-slate-700 flex gap-5 ml-16"
          >
            <button className="ql-image">
              <div className="">
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
            className="rounded ml-auto border-2 border-blue-500 dark:text-blue-300 dark:border-blue-300
       p-1 px-4 mr-2 hover:opacity-75 text-blue-500 disabled:cursor-not-allowed"
            onClick={() => dismiss((prev) => !prev)}
          >
            Dismiss
          </button>

          <button
            disabled={text.length === 0 || text === "<p><br></p>"}
            className="rounded ml-4 border-4 border-blue-500 dark:border-blue-700 dark:bg-blue-700
       p-1 px-4 mr-2 hover:opacity-75 bg-blue-500 text-white disabled:cursor-not-allowed"
            onClick={editHandler}
          >
            Edit
          </button>
        </div>
        {showEmoji && (
          <Portal dismiss={setShowEmoji} anchorRef={btnRef}>
            {" "}
            <Picker onEmojiClick={onEmojiClick} />
          </Portal>
        )}
      </div>
    </div>
  );
};
export { EditModal };
