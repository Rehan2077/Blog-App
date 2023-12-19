import React, { useState } from "react";

const CommentsForm = ({
  btnLabel,
  commentText = "",
  formSubmitHandler,
  formCancelHandler = null,
}) => {
  const [comment, setComment] = useState(commentText);
  const submitHandler = (e) => {
    e.preventDefault();
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
      <div className="flex flex-col items-end border text-dark-soft font-opensans bg-gray-100  border-primary rounded-lg justify-center ">
        <textarea
          className="w-full outline-none text-[0.95rem] md:text-base px-3 p-y-2 my-2 bg-gray-100"
          name="comment"
          id="comment"
          rows={`${formCancelHandler} ? "3" : "4"}`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave your comment here..."
        ></textarea>
        {formCancelHandler ? (
          <div className="flex w-full items-center justify-end gap-1">
            <button
              onClick={formCancelHandler}
              className="px-1 py-1 md:px-3 md:py-2 m-1 md:m-2 text-sm md:text-base bg-gray-600 rounded-lg text-white hover:bg-gray-700 transition-all ease-linear"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-1 py-1 md:px-3 md:py-2 m-1 md:m-2 text-sm md:text-base bg-primary rounded-lg text-white hover:bg-blue-700 transition-all ease-linear"
            >
              {btnLabel}
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className=" px-3 py-2 m-2 bg-primary rounded-lg text-white hover:bg-blue-700 transition-all ease-linear"
          >
            {btnLabel}
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentsForm;
