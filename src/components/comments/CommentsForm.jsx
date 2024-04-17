import React, { useState } from "react";
import toast from "react-hot-toast";

const CommentsForm = ({
  btnLabel,
  commentText = "",
  formSubmitHandler,
  formCancelHandler = null,
  loggedInUser = null,
  loading = false,
}) => {
  const [comment, setComment] = useState(commentText);
  const submitHandler = (e) => {
    e.preventDefault();
    if (loggedInUser === null) {
      toast.error("You must be logged in to comment");
      return;
    }
    if (comment && comment.length > 0) {
      formSubmitHandler(comment);
      setComment("");
    }
    return;
  };

  return (
    <form
      onSubmit={submitHandler}
      className={`${formCancelHandler && "mt-4  lg:text-lg"} `}
    >
      <div className="-mt-2 mb-2 flex flex-col items-end justify-center rounded-lg border border-primary  bg-gray-100 font-opensans text-dark-soft transition-all ease-linear hover:shadow-[rgba(13,_38,_200,_0.3)_0px_5px_20px] ">
        <textarea
          className="p-y-2 my-2 w-full bg-gray-100 px-3 text-[0.95rem] outline-none md:text-base "
          name="comment"
          id="comment"
          rows={`${formCancelHandler} ? "3" : "4"}`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave your comment here..."
        ></textarea>
        {formCancelHandler ? (
          <div className="flex w-full items-center justify-end gap-1 text-[0.8rem] md:text-base">
            <button
              onClick={formCancelHandler}
              className="m-1 rounded-lg bg-gray-600 px-1 py-1 text-white  transition-all ease-linear hover:bg-gray-700 md:m-2 md:px-3 md:py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="disabled:opacity-7 0 m-1 rounded-lg bg-primary px-1 py-1 text-white transition-all ease-linear hover:bg-blue-700 md:m-2 md:px-3 md:py-2"
            >
              {btnLabel}
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className=" m-2 rounded-lg bg-primary px-3 py-2 text-white transition-all ease-linear hover:bg-blue-700"
          >
            {btnLabel}
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentsForm;
