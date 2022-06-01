import avatar from "../../assets/avatar.jpeg";

const NewPost = () => {
  return (
    <div className=" w-full p-2 bg-white border flex flex-col">
      <div className=" flex items-start">
        <img src={avatar} className="h-16 w-16 rounded-full"></img>
        <textarea
          className="w-full m-4 p-1 resize-none"
          placeholder="What's on your mind?"
          rows={2}
        ></textarea>
      </div>
      <div className="self-end">
        <button className="border-4 border-blue-500 p-1 px-4 m-2 hover:opacity-75 bg-blue-500 text-white">
          Post
        </button>
      </div>
    </div>
  );
};

export { NewPost };
