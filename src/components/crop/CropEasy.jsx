import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePhoto } from "../../services/index/users";
import { setUserInfo } from "../../store/reducers/user";
import getCroppedImg from "./cropImage";

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
    <div className="fixed inset-0 z-[1000] flex h-screen w-full items-center justify-center overflow-hidden bg-black/50  p-5 ">
      <div className="sm:max-w-[350px  rounded-lg] h-fit w-fit bg-white p-5">
        <h2 className="mb-2 font-semibold text-dark-hard">Crop Image</h2>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
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
            className="my-5 h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-300"
          />
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          <button
            disabled={isLoading}
            onClick={() => setPortal(false)}
            className="rounded-lg border-2 border-red-500 px-5 py-2.5 text-sm font-semibold text-red-500 transition-all ease-linear hover:bg-red-500 hover:text-white disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handleCropImage}
            className="rounded-lg border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-all ease-linear hover:bg-primary hover:text-white disabled:opacity-70"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
