import React from "react";

interface AvatarBisProps {
  avatar: string;
  badge: string;
  statusUser: string;
}

const Avatar: React.FC<AvatarBisProps> = ({ avatar, badge, statusUser }) => {
  return (
    <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
      <img src={avatar} className="rounded-circle avatar-xs" alt="avatar" />
      <span className="badge-connexion translate-middle">
        <i
          className={`${badge} bg-white ${
            statusUser === "disponible" ? "text-success" : "text-danger"
          } rounded-circle border border-white border-2 p-0`}
        ></i>
      </span>
    </div>
  );
};

export default Avatar;
