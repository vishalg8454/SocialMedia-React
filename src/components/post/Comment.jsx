import { AvatarSmall } from "../../components";
import { Link } from "react-router-dom";

const Comment = ({ comment, fullname, userName, profileImage = "" }) => {
  return (
    <div className="ml-2 flex items-start">
      <AvatarSmall img={profileImage} />
      <div className="flex flex-col ml-4">
        <Link to={`/profile/${userName}`}>
        <div className="flex gap-2">
          <p className="font-semibold text-sm">{fullname}</p>
          <p className="text-slate-600 text-sm">{"@" + userName}</p>
        </div>
        </Link>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export { Comment };
