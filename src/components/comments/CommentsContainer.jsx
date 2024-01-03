import React, { useState } from "react";
import CommentsForm from "./CommentsForm";
import Comment from "./Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment, updateComment } from "../../services/index/comments";
import toast from "react-hot-toast";

const CommentsContainer = ({ comments, loggedInUser, postId, postSlug }) => {
  const queryClient = useQueryClient();

  const [affectedComment, setAffectedComment] = useState(null);

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ desc, post, parent, replyOnUser }) => {
        return createComment({ desc, post, parent, replyOnUser });
      },
      mutationKey: ["posts"],
      onSuccess: (data) => {
        toast.success("Comment will appear after verification");
      },
      onError: (error) => toast.error(error.message),
    });
  const { mutate: mutateUpdateComment } =
    useMutation({
      mutationFn: ({ desc, commentId }) => {
        return updateComment({ desc, commentId });
      },
      mutationKey: ["comment"],
      onSuccess: (data) => {
        toast.success("Comment updated successfully");
        queryClient.invalidateQueries({queryKey: ["post", postSlug]});
      },
      onError: (error) => toast.error(error.message),
    });
  const { mutate: mutateDeleteComment } =
    useMutation({
      mutationFn: ({ commentId }) => {
        return deleteComment({ commentId });
      },
      mutationKey: ["comments"],
      onSuccess: (data) => {
        toast.success("Comment deleted successfully");
        queryClient.invalidateQueries({queryKey: ["post"]});
      },
      onError: (error) => toast.error(error.message),
    });

  const addCommentHandler = (comment, parent = null, replyOnUser = null) => {
    mutateNewComment({ desc: comment, post: postId, parent, replyOnUser });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    mutateUpdateComment({desc: value, commentId})
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
    mutateDeleteComment({commentId})
    setAffectedComment(null);
  };

  return (
    <div className={`mt-10 lg:mb-10`}>
      <CommentsForm
        btnLabel={"Submit"}
        loggedInUser={loggedInUser}
        loading = {isLoadingNewComment}
        formSubmitHandler={(comment) => addCommentHandler(comment)}
      />
      <h2 className="text-lg text-dark-hard mt-7 font-roboto font-[450] lg:text-xl">
        All Comments ({comments.length})
      </h2>
      <div className="space-y-4 mt-4">
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
