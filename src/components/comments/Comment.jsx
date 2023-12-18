import React from "react";
import { BiConversation, BiEdit, BiTrashAlt } from "react-icons/bi";

import { images } from "../../constants";
import CommentsForm from "./CommentsForm";

const Comment = ({
  comment = null,
  classname = "",
  loggedInUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  deleteComment,
  parentId,
  updateComment,
}) => {
  const isUserLoggedIn = Boolean(loggedInUserId);

  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;

  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;

  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  const formatDate = () => {
    const date = new Date(comment.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div className="flex flex-nowrap items-start gap-3 bg-[#F2F4F5] p-3 rounded-lg w-full ">
      <img
        className="w-10 h-10 rounded-full"
        src={images.DisplayImage}
        alt=""
      />
      <div className="flex flex-col  flex-1">
        <h3 className="text-lg font-semibold text-dark-hard">
          {comment.user.name}
        </h3>
        <p className="text-sm text-dark-thin">{formatDate()}</p>
        <p className="text-dark-soft font-opensans my-3 lg:text-lg">
          {comment.desc}
        </p>

        {isUserLoggedIn && (
          <div className="flex gap-4 text-sm text-dark-thin items-center">
            {comment.user._id === loggedInUserId ? (
              <>
                <button
                  onClick={() =>
                    setAffectedComment({ type: "replying", _id: comment._id })
                  }
                  className="flex items-center hover:text-dark-soft gap-1"
                >
                  <BiConversation />
                  Reply
                </button>
                <button
                  onClick={() =>
                    setAffectedComment({
                      type: "editing",
                      _id: comment._id,
                      desc: comment.desc,
                    })
                  }
                  className="flex items-center hover:text-dark-soft gap-1"
                >
                  <BiEdit />
                  Edit
                </button>
                <button
                  onClick={() => deleteComment(comment._id)}
                  className="flex items-center hover:text-dark-soft gap-[0.1rem]"
                >
                  <BiTrashAlt />
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  setAffectedComment({ type: "replying", _id: comment._id })
                }
                className="flex items-center hover:text-dark-soft gap-1"
              >
                <BiConversation />
                Reply
              </button>
            )}
          </div>
        )}
        {isEditing && (
          <CommentsForm
            btnLabel={"Update"}
            commentText={affectedComment.desc}
            formSubmitHandler={(comment) =>
              updateComment(comment, affectedComment._id)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {isReplying && (
          <CommentsForm
            btnLabel={"Reply"}
            formSubmitHandler={(repliedComment) =>
              addComment(repliedComment, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
