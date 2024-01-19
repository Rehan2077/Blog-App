import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import Cropper from "react-easy-crop";

import getCroppedImg from "./cropImage";
import { useMutation } from "@tanstack/react-query";
import { setUserInfo } from "../../store/reducers/user";
import toast from "react-hot-toast";
import { updatePhoto } from "../../services/index/users";

const CropEasy = ({ photo, setPortal }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const {userInfo} = useSelector((state) => state.user);
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

  const handleCropImage = async () => {
    try {
      const cropppedImage = await getCroppedImg(photo?.url, croppedAreaPixels);
      const file = new File([cropppedImage.file], `${photo?.file?.name}`, {
        type: photo?.file?.type,
      });
      const formData = new FormData();
      formData.append("profilePicture", file);
      mutate(formData);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full inset-0 fixed p-5 overflow-hidden z-[1000]  bg-black/50 ">
      <div className="bg-white  h-fit w-fit sm:max-w-[350px p-5 rounded-lg]">
        <h2 className="font-semibold text-dark-hard mb-2">Crop Image</h2>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={true}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
        </div>
        <div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            name="slider"
            id="slider"
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer my-5"
          />
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <button
            disabled={isLoading}
            onClick={() => setPortal(false)}
            className="px-5 py-2.5 rounded-lg text-red-500 border-2 border-red-500 hover:text-white hover:bg-red-500 text-sm font-semibold disabled:opacity-70 transition-all ease-linear"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handleCropImage}
            className="px-5 py-2.5 rounded-lg text-primary border-2 border-primary hover:text-white hover:bg-primary text-sm font-semibold disabled:opacity-70 transition-all ease-linear"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
