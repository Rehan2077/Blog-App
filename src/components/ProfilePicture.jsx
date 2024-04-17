import React from "react";
import { images, stables } from "../constants";

const ProfilePicture = ({ photo, className = "h-32 w-32" }) => {
  return (
    <img
      className={`rounded-full border-2 border-black/50 ${className}`}
      src={photo ? stables.UPLOAD_FOLDER_BASE_URL + photo : images.User}
      alt="profile"
    />
  );
};

export default ProfilePicture;
