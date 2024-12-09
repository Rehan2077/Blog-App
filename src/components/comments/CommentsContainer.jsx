import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../services/index/comments";
import Comment from "./Comment";
import CommentsForm from "./CommentsForm";

const CommentsContainer = ({
  comments,
  loggedInUser,
  postId,
  postSlug,
  totalComments = 0,
}) => {
  const queryClient = useQueryClient();

  const { userInfo } = useSelector((state) => state.user);

  const [affectedComment, setAffectedComment] = useState(null);

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ desc, post, parent, replyOnUser }) => {
        return createComment({
          desc,
          post,
          parent,
          replyOnUser,
          token: userInfo.token,
        });
      },
      mutationKey: ["posts"],
      onSuccess: (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ["post", postSlug] });
      },
      onError: (error) => toast.error(error.message),
    });
  const { mutate: mutateUpdateComment } = useMutation({
    mutationFn: ({ desc, commentId }) => {
      return updateComment({ desc, commentId, token: userInfo.token });
    },
    mutationKey: ["comment"],
    onSuccess: (data) => {
      toast.success("Comment updated successfully");
      queryClient.invalidateQueries({ queryKey: ["post", postSlug] });
    },
    onError: (error) => toast.error(error.message),
  });
  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: ({ commentId }) => {
      return deleteComment({ commentId, token: userInfo.token });
    },
    mutationKey: ["comments"],
    onSuccess: (data) => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const addCommentHandler = (comment, parent = null, replyOnUser = null) => {
    mutateNewComment({ desc: comment, post: postId, parent, replyOnUser });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    mutateUpdateComment({ desc: value, commentId });
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
    mutateDeleteComment({ commentId });
    setAffectedComment(null);
  };

  return (
    <div className={`mt-10 lg:mb-10`} id="post-comments-section">
      <CommentsForm
        btnLabel={"Submit"}
        loggedInUser={loggedInUser}
        loading={isLoadingNewComment}
        formSubmitHandler={(comment) => addCommentHandler(comment)}
      />
      <h2 className="mt-7 font-roboto text-lg font-[450] text-dark-hard lg:text-xl">
        All Comments: {totalComments}
      </h2>
      <div className="mt-4 space-y-4">
        {comments.map((comment) => (
          <Comment
            classname="p-3"
            key={comment._id}
            comment={comment}
            loggedInUser={loggedInUser}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            deleteComment={deleteCommentHandler}
            parentId={comment._id}
            updateComment={updateCommentHandler}
            replyComments={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
