import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfile = ({ profileImage, firstName, lastName, username }) => {
  return (
    <Link to={`/profile/${username}`}>
      <div className="flex gap-3 hover:bg-blue-500 p-2 rounded">
        <img className="h-16 w-16" src={profileImage} />
        <div className="flex flex-col">
          <div className="flex gap-2 font-bold">
            <p>{firstName}</p>
            <p>{lastName}</p>
          </div>
          <p className="-mt-1 text-slate-600">{`@${username}`}</p>
        </div>
      </div>
    </Link>
  );
};
const NavigationAside = () => {
  const { users } = useSelector((state) => state.user);

  return (
    <div className="">
      <p className="text-xl mt-2 mb-4 font-bold dark:text-white">
        Users to Follow
      </p>
      <div className="flex flex-col dark:text-white">
        {users.map(({ firstName, lastName, profileImage, username }) => (
          <UserProfile
            key={firstName}
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            username={username}
          />
        ))}
      </div>
    </div>
  );
};

export { NavigationAside };
