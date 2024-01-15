import { HiOutlineCamera } from "react-icons/hi";
import { useState } from "react";
import toast from "react-hot-toast";

import Editor from "../../../components/editor/Editor";
import { createPost } from "../../../services/index/posts";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    let createdData = new FormData();

    if (photo) {
      createdData.append("postPicture", photo);
    } else return toast.error("Photo is required");

    if (!title || title.length === 0) {
      return toast.error("Title is required");
    }

    if (!body || body.length === 0) {
      return toast.error("Body is required");
    }

    createdData.append("title", title);
    createdData.append("document", JSON.stringify({ body }));
    try {
      const postData = await createPost(createdData);
      console.log(postData);
      toast.success(postData?.message);
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <section className="container mx-auto mt-5 flex max-w-7xl flex-col px-5 py-5 lg:flex-row lg:gap-5 lg:py-2 ">
      <article className="flex-1 lg:w-2/3 ">
        <form onSubmit={handleCreatePost}>
          <label htmlFor="postPicture">
            {photo ? (
              <img
                className="mt-1 aspect-video h-auto w-[50%] rounded-lg object-cover object-center"
                src={URL.createObjectURL(photo)}
                alt={title}
              />
            ) : (
              <div className="flex h-auto w-[50%] cursor-pointer items-center justify-start bg-blue-50/50">
                <HiOutlineCamera className="text-4xl text-primary" />
              </div>
            )}
          </label>
          <input
            className="hidden"
            type="file"
            required={true}
            accept="image/*"
            name="postPicture"
            id="postPicture"
            onChange={handleSubmit}
          />
          <input
            type="text"
            placeholder="Title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            className="my-3 w-full border-2 px-3 py-2 font-roboto text-xl font-semibold tracking-wide text-dark-hard outline-blue-600 transition-all ease-linear "
          />
          <div className=" leading-relaxed text-dark-soft opacity-90 lg:mb-3 lg:text-lg">
            <Editor
              content={"<p>Write Here...</p>"}
              editable={true}
              onDataChange={(data) => setBody(data)}
            />
          </div>
          <button
            onClick={handleCreatePost}
            className=" m-2 rounded-lg bg-primary px-3 py-2 text-white transition-all ease-linear hover:bg-blue-700 disabled:cursor-not-allowed"
          >
            Create Post
          </button>
        </form>
      </article>
    </section>
  );
};

export default CreatePost;
