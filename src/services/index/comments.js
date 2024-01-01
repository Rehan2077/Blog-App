import axios from "axios";

export const createComment = async ({ desc, post, parent, replyOnUser }) => {
  try {
    const { data } = await axios.post("/api/v1/comments/", {
      desc,
      post,
      parent,
      replyOnUser,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateComment = async ({ desc, commentId }) => {
    try {
      const { data } = await axios.put(`/api/v1/comments/${commentId}`, {
        desc,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };
  
export const deleteComment = async ({ commentId }) => {
    try {
      const { data } = await axios.delete(`/api/v1/comments/${commentId}`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };
  