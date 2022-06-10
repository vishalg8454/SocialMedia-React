import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../components";
import { useParams } from "react-router-dom";
import { followUser,unFollowUser } from "../../features/user/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const { users,status } = useSelector((state) => state.user);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [profileUser, setProfileUser] = useState({});
  let { profileId } = useParams();
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const profileUser = users.filter((user) => user.username === profileId);
    setProfileUser(profileUser[0]);
  }, [users, profileId]);

  useEffect(() => {
    const followed = users
      .find((userr) => userr.username === user.username)
      .following.some((it) => it.username === profileId);
    setIsFollowed(followed);
  }, [users]);

  useEffect(() => {
    const count = posts.filter(
      (post) => post.username === user.username
    ).length;
    setNumberOfPosts(count);
  }, [posts, user, profileId]);

  const followUserHandler = () => {
    dispatch(followUser({ userId: profileId, token: token }));
  };

  const unfollowUserHandler = ()=>{
    dispatch(unFollowUser({ userId: profileId, token: token }));
  }

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div>
      <div className="max-w-[45rem] rounded w-full p-4 bg-white dark:bg-slate-600">
        <div className="relative flex justify-center">
          <img src={profileUser.backgroundImage} className="w-full h-[12rem]" />
          <div className="absolute bottom-0 -my-16">
            <img
              className="border-8 border-white dark:border-slate-600 h-32 w-32 rounded-full"
              src={profileUser.profileImage}
            />
          </div>
        </div>
        {profileUser.username === user.username && (
          <div className="flex justify-end gap-1 mt-2 -mb-6">
            <button className="flex items-center dark:text-blue-300 dark:border-blue-300 text-blue-500 rounded border-2 border-blue-500 px-4">
              Edit Profile
            </button>
          </div>
        )}
        <div className="flex flex-col text-lg items-center mt-14">
          <p className="mt-2 font-bold text-2xl dark:text-white">{`${profileUser.firstName} ${profileUser.lastName}`}</p>
          <p className="text-slate-600">{profileUser.username}</p>
          <p className="text-center mt-2 dark:text-slate-100">{profileUser.bio}</p>
          <a href="http://example.com" className="text-blue-500 dark:text-blue-300 underline mt-2">
            {profileUser.website}
          </a>
          {profileUser.username !== user.username && !isFollowed && (
            <button
              onClick={followUserHandler}
              disabled={status === "loading"}
              className="rounded border-4 border-blue-500
     mt-2 px-4 hover:opacity-75 bg-blue-500 text-white disabled:cursor-not-allowed"
            >
              Follow
            </button>
          )}
          {profileUser.username !== user.username && isFollowed && (
            <button
              onClick={unfollowUserHandler}
              disabled={status === "loading"}
              className="rounded border-4 border-blue-500
     mt-2 px-4 hover:opacity-75 bg-blue-500 text-white disabled:cursor-not-allowed"
            >
              Un Follow
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
