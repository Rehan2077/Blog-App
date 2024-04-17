import React from "react";
import { BiConversation, BiEdit, BiTrashAlt } from "react-icons/bi";

import { images, stables } from "../../constants";
import { formatDate } from "../../utils/formatDate";
import CommentsForm from "./CommentsForm";

const Comment = ({
  comment = null,
  classname = "",
  loggedInUser,
  affectedComment,
  setAffectedComment,
  addComment,
  deleteComment,
  parentId,
  updateComment,
  replyComments = null,
  mainCommentId,
}) => {
  const loggedInUserId = loggedInUser?._id;
  const isUserLoggedIn = Boolean(loggedInUserId);

  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;

  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;

  const repliedCommentId = parentId
    ? parentId
    : { _id: comment._id, name: comment.author.name };
  const replyOnUserId = comment.author._id;

  return (
    <div className={`flex  flex-col rounded-lg bg-[#F2F4F5]  `}>
      <div
        className={`flex flex-1 flex-nowrap items-start gap-3 p-3 ${classname}`}
      >
        <img
          className="h-10 w-10 rounded-full"
          src={
            comment?.author?.avatar
              ? stables.UPLOAD_FOLDER_BASE_URL + comment?.author?.avatar
              : images.User
          }
          alt=""
        />
        <div className="flex flex-1  flex-col">
          <h3 className="text-base font-semibold text-dark-hard md:text-lg">
            {comment?.author?.name}
          </h3>
          <p className="text-sm text-dark-thin">
            {formatDate(comment?.createdAt)}
          </p>
          <p className="my-2 font-opensans text-[0.95rem] text-dark-soft md:text-base ">
            {/* {comment?.parent && (
              <span className="text-primary">@{comment?.parent}</span>
            )}{" "} */}
            {comment?.desc}
          </p>

          {isUserLoggedIn && (
            <div className="flex items-center gap-4 text-xs text-dark-thin md:text-sm">
              {comment?.author?._id === loggedInUserId ? (
                <>
                  <button
                    onClick={() =>
                      setAffectedComment({
                        type: "replying",
                        _id: comment?._id,
                      })
                    }
                    className="flex items-center gap-1 hover:text-dark-soft"
                  >
                    <BiConversation />
                    Reply
                  </button>
                  <button
                    onClick={() =>
                      setAffectedComment({
                        type: "editing",
                        _id: comment?._id,
                        desc: comment?.desc,
                      })
                    }
                    className="flex items-center gap-1 hover:text-dark-soft"
                  >
                    <BiEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteComment(comment?._id)}
                    className="flex items-center gap-[0.1rem] hover:text-dark-soft"
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
                  className="flex items-center gap-1 hover:text-dark-soft"
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
              loggedInUser={loggedInUser}
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
              loggedInUser={loggedInUser}
              formSubmitHandler={(repliedComment) =>
                addComment(repliedComment, repliedCommentId, replyOnUserId)
              }
              formCancelHandler={() => setAffectedComment(null)}
            />
          )}
        </div>
      </div>
      <div className="">
        {replyComments?.length > 0 &&
          replyComments?.map(
            (replyComment) =>
              replyComment.parent === comment._id && (
                <Comment
                  key={replyComment._id}
                  classname="pl-7 "
                  comment={replyComment}
                  loggedInUser={loggedInUser}
                  affectedComment={affectedComment}
                  setAffectedComment={setAffectedComment}
                  addComment={addComment}
                  deleteComment={deleteComment}
                  parentId={parentId}
                  updateComment={updateComment}
                  replyComments={replyComments}
                />
              ),
          )}
      </div>
    </div>
  );
};

export default Comment;
