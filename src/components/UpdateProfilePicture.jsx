import React, { useState } from "react";
import { images, stables } from "../constants";
import CropEasy from "./crop/CropEasy";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { setUserInfo } from "../store/reducers/user";
import { updatePhoto } from "../services/index/users";
import toast from "react-hot-toast";

const UpdateProfilePicture = ({ avatar }) => {
  const [openPortal, setPortal] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setPortal(true);
  };

  const {userInfo} = useSelector(state=>state.user)
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
      if(window.confirm("Do you want to delete your profile picture?")){

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
          document.getElementById("portal")
        )}
      <div className="flex gap-5 mb-5 items-center">
        <label htmlFor="profilePicture">
          <img
            className="h-20 w-20 rounded-full cursor-pointer border-2 border-black/50"
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
            className="text-[0.93rem] h-fit rounded-lg hover:border-gray-500 text-dark-thin border py-1 px-2"
          >
            Delete
          </button>)
          :
          <span className="text-xs text-dark-thin opacity-80 italic">Only JPG, JPEG, and <br /> PNG formats are allowed.</span>
        }
      </div>
    </>
  );
};

export default UpdateProfilePicture;
