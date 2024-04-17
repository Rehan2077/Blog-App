import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { images, stables } from "../constants";
import { updatePhoto } from "../services/index/users";
import { setUserInfo } from "../store/reducers/user";
import CropEasy from "./crop/CropEasy";

const UpdateProfilePicture = ({ avatar }) => {
  const [openPortal, setPortal] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setPortal(true);
  };

  const { userInfo } = useSelector((state) => state.user);
  const token = userInfo?.token;

  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => {
      return updatePhoto(formData, token);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
      dispatch(setUserInfo(data.user));
      setPortal(false);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleDeleteImage = async () => {
    try {
      if (window.confirm("Do you want to delete your profile picture?")) {
        const formData = new FormData();
        formData.append("profilePicture", null);
        mutate(formData);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
      {openPortal &&
        createPortal(
          <CropEasy photo={photo} setPortal={setPortal} />,
          document.getElementById("portal"),
        )}
      <div className="mb-5 flex items-center gap-5">
        <label htmlFor="profilePicture">
          <img
            className="h-20 w-20 cursor-pointer rounded-full border-2 border-black/50"
            src={avatar ? stables.UPLOAD_FOLDER_BASE_URL + avatar : images.User}
            alt={avatar}
          />
        </label>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          name="profilePicture"
          id="profilePicture"
          onChange={handleSubmit}
        />
        {avatar ? (
          <button
            onClick={handleDeleteImage}
            disabled={isLoading}
            className="h-fit rounded-lg border px-2 py-1 text-[0.93rem] text-dark-thin hover:border-gray-500"
          >
            Delete
          </button>
        ) : (
          <span className="text-xs italic text-dark-thin opacity-80">
            Only JPG, JPEG, and <br /> PNG formats are allowed.
          </span>
        )}
      </div>
    </>
  );
};

export default UpdateProfilePicture;
