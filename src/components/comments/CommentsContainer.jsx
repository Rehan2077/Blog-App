import React, { useEffect, useState } from "react";
import { getCommentsData } from "../../data/comments";
import CommentsForm from "./CommentsForm";
import Comment from "./Comment";

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);
  const mainComments = comments.filter((comment) => comment.parent === null);
  const replyComments = comments.filter((comment) => comment.parent !== null);
  const [affectedComment, setAffectedComment] = useState(null);

  const loggedInUserId = "a";

  console.log(comments);

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    })();
  }, []);

  const addCommentHandler = (comment, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: Date.now(),
      user: {
        _id: "a",
        name: "Rehan",
      },
      desc: comment,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: "2022-12-31T17:22:05.092+0000",
    };
    setComments((prev) => [...prev, newComment]);
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment._id === commentId) {
        return { ...comment, desc: value };
      }
      return comment;
    });
    setComments(updatedComments);
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment._id !== commentId
    );
    setComments(updatedComments);
    setAffectedComment(null);
  };

  return (
    <div className={`mt-10 lg:mb-10`}>
      <CommentsForm
        btnLabel={"Submit"}
        formSubmitHandler={(comment) => addCommentHandler(comment)}
      />
      <h2 className="text-lg text-dark-hard mt-7 font-roboto font-[450] lg:text-xl">
        All Comments ({comments.length})
      </h2>
      <div className="space-y-4 mt-4">
        {mainComments.map((comment) => (
          <Comment
          classname="p-3"
            key={comment._id}
            comment={comment}
            loggedInUserId={loggedInUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            deleteComment={deleteCommentHandler}
            parentId={""}
            updateComment={updateCommentHandler}
            replyComments={replyComments}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
