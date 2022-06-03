import { AvatarSmall } from "../../components";

const Comment = ({ comment, fullname, userName, profileImage = "" }) => {
  return (
    <div className="ml-2 flex items-start">
      <AvatarSmall img={profileImage} />
      <div className="flex flex-col ml-4">
        <div className="flex gap-2">
          <p className="font-semibold text-sm">{fullname}</p>
          <p className="text-slate-600 text-sm">{"@" + userName}</p>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export { Comment };
