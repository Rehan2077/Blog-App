import React from "react";
import { images, stables } from "../constants";

const UpdateProfilePicture = ({avatar}) => {

  return (
    <div className="flex gap-5 mb-5 items-center">
      <label htmlFor="profilePicture">
        <img
          className="h-20 w-20 rounded-full cursor-pointer"
          src={ avatar ? stables.UPLOAD_FOLDER_BASE_URL + avatar : images.User}
          alt="profilePicture"
        />
      </label>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        name="profilePicture"
        id="profilePicture"
      />
      <button className="text-[0.93rem] h-fit rounded-lg hover:border-gray-500 text-dark-thin border py-1 px-2">
        Delete
      </button>
    </div>
  );
};

export default UpdateProfilePicture;
