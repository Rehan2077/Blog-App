import React from "react";
import { BiConversation, BiEdit, BiTrashAlt } from "react-icons/bi";

import { images, stables } from "../../constants";
import CommentsForm from "./CommentsForm";
import { formatDate } from "../../utils/formatDate";

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
  mainCommentId
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
    <div className={`flex  flex-col bg-[#F2F4F5] rounded-lg  `}>
      <div
        className={`flex flex-nowrap items-start p-3 gap-3 flex-1 ${classname}`}
      >
        <img
          className="w-10 h-10 rounded-full"
          src={
            comment?.author?.avatar
              ? stables.UPLOAD_FOLDER_BASE_URL + comment?.author?.avatar
              : images.User
          }
          alt=""
        />
        <div className="flex flex-col  flex-1">
          <h3 className="text-base md:text-lg font-semibold text-dark-hard">
            {comment?.author?.name}
          </h3>
          <p className="text-sm text-dark-thin">
            {formatDate(comment?.createdAt)}
          </p>
          <p className="text-dark-soft font-opensans my-2 text-[0.95rem] md:text-base lg:text-lg">
            {/* {comment?.parent && (
              <span className="text-primary">@{comment?.parent}</span>
            )}{" "} */}
            {comment?.desc}
          </p>

          {isUserLoggedIn && (
            <div className="flex gap-4 text-xs md:text-base text-dark-thin items-center">
              {comment?.author?._id === loggedInUserId ? (
                <>
                  <button
                    onClick={() =>
                      setAffectedComment({
                        type: "replying",
                        _id: comment?._id,
                      })
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
                        _id: comment?._id,
                        desc: comment?.desc,
                      })
                    }
                    className="flex items-center hover:text-dark-soft gap-1"
                  >
                    <BiEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteComment(comment?._id)}
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
              )
          )}
      </div>
    </div>
  );
};

export default Comment;
