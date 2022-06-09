import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../components";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const { users } = useSelector((state) => state.user);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [profileUser, setProfileUser] = useState({});
  let { profileId } = useParams();

  useEffect(() => {
    const profileUser = users.filter((user) => user.username === profileId);
    setProfileUser(profileUser[0]);
  }, [users,profileId]);

  useEffect(() => {
    const count = posts.filter(
      (post) => post.username === user.username
    ).length;
    setNumberOfPosts(count);
  }, [posts, user,profileId]);

  return (
    <div>
      <div className="max-w-[45rem] rounded w-full p-4 bg-white border">
        <div className="relative flex justify-center">
          <img src={profileUser.backgroundImage} className="w-full h-[12rem]" />
          <div className="absolute bottom-0 -my-16">
            <img
              className="border-4 border-white h-32 w-32 rounded-full"
              src={profileUser.profileImage}
            />
          </div>
        </div>
        {profileUser.username === profileId && (
          <div className="flex justify-end gap-1 mt-2">
            <button className="flex items-center text-blue-500 rounded border-2 border-blue-500 px-4">
              Edit Profile
            </button>
          </div>
        )}
        <div className="flex flex-col text-lg items-center mt-6">
          <p className="mt-2 font-bold text-2xl">{`${profileUser.firstName} ${profileUser.lastName}`}</p>
          <p className="text-slate-600">{profileUser.username}</p>
          <p className="text-center mt-2">{profileUser.bio}</p>
          <a href="http://example.com" className="text-blue-500 underline mt-2">
            {profileUser.website}
          </a>
          {profileUser.username !== profileId && (
            <button
              className="rounded border-4 border-blue-500
     mt-2 px-4 hover:opacity-75 bg-blue-500 text-white disabled:cursor-not-allowed"
            >
              Follow
            </button>
          )}
          <div className="w-[90%] rounded h-20 mt-4 flex justify-around bg-slate-100 items-center">
            <div className="flex flex-col items-center">
              <p className="font-bold">{profileUser?.following?.length}</p>
              <p>Following</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold">{numberOfPosts}</p>
              <p>Posts</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold">{profileUser?.followers?.length}</p>
              <p>Followers</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xl mt-2 font-bold">User Posts</p>
      {numberOfPosts === 0 && (
        <p className="m-2 text-xl text-center">User does not has any posts.</p>
      )}
      {posts
        .filter((post) => post.username === profileId)
        .map(({ _id, content, username, fullname, comments, profileImage }) => (
          <Post
            key={_id}
            _id={_id}
            content={content}
            username={username}
            fullname={fullname}
            comments={comments}
            profileImage={profileImage}
          />
        ))}
    </div>
  );
};

export { ProfilePage };
