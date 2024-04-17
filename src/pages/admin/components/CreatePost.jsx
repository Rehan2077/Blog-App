import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineCamera } from "react-icons/hi";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Editor from "../../../components/editor/Editor";
import { createPost } from "../../../services/index/posts";
import { PostCategories } from "../../../utils/categoryTypes";

const CreatePost = () => {
  const categories = PostCategories;
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [caption, setCaption] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Category");

  const { userInfo } = useSelector((state) => state.user);

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

    if (!caption || caption.length === 0) {
      return toast.error("Caption is required");
    }

    if (!body || body.length === 0) {
      return toast.error("Body is required");
    }
    if (!category || category === "Category") {
      return toast.error("Category is required");
    }

    createdData.append("title", title);
    createdData.append("caption", caption);
    createdData.append("category", category);
    createdData.append("document", JSON.stringify({ body }));
    try {
      const postData = await createPost({
        postData: createdData,
        token: userInfo.token,
      });
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
        <form onSubmit={(e) => e.preventDefault()}>
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
            placeholder="Title (should be small)"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            className="my-3 w-full border-2 px-3 py-2 font-roboto text-xl font-semibold tracking-wide text-dark-hard outline-blue-600 transition-all ease-linear "
          />
          <input
            type="text"
            placeholder="Brief summary in 1-2 sentences"
            required={true}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            name="caption"
            className="my-3 w-full border-2 px-3 py-2 font-roboto text-xl font-semibold tracking-wide text-dark-hard outline-blue-600 transition-all ease-linear "
          />

          <label
            htmlFor="category"
            className="pl-0.5 font-semibold text-dark-soft"
          >
            Select Category:
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            name="category"
            id="category"
            className="mb-2 rounded-lg border-2 border-slate-300 p-2"
          >
            <option value="Category">-Select Category-</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

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
