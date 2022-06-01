import avatar from "../../assets/avatar.jpeg";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Picker from "emoji-picker-react";
import { Portal, Avatar } from "../../components";
import "./newpost.css";

const btnRef = React.createRef();

const NewPost = () => {
  const inputReference = useRef(null);
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [coords, setCoords] = useState({}); // takes current button coordinates

  const updateTooltipCoords = (button) => {
    console.log("here");
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 2, // add half the width of the button for centering
      top: rect.y + window.scrollY, // add scrollY offset, as soon as getBountingClientRect takes on screen coords
    });
  };

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
    updateTooltipCoords(e.target);
  };

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <div className="w-full p-2 bg-white border flex flex-col">
      <div className=" flex items-start">
        <Avatar img={avatar} />
        <ReactQuill
          value={text}
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
        <button className="ml-auto border-4 border-blue-500 p-1 px-4 mr-2 hover:opacity-75 bg-blue-500 text-white">
          Post
        </button>
      </div>
      {showEmoji && (
        <Portal
          dismiss={setShowEmoji}
          coords={coords}
          updateTooltipCoords={() =>
            updateTooltipCoords(btnRef.current.buttonNode)
          }
        >
          {" "}
          <Picker onEmojiClick={onEmojiClick} />
        </Portal>
      )}
    </div>
  );
};

export { NewPost };
