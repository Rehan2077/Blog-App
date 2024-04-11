import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

export const createComment = async ({
  desc,
  post,
  parent,
  replyOnUser,
  token,
}) => {
  try {
    const { data } = await axios.post(
      `${url}/api/v1/comments/`,
      {
        desc,
        post,
        parent,
        replyOnUser,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateComment = async ({ desc, commentId, token, type="update" }) => {
  try {
    const { data } = await axios.put(
      `${url}/api/v1/comments/${commentId}`,
      {
        desc,
        type
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteComment = async ({ commentId, token }) => {
  try {
    const { data } = await axios.delete(`${url}/api/v1/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
let i=0;
export const getAllComments = async ({ token, searchKeyword = "" }) => {
  try {

    const { data } = await axios.get(
      `${url}/api/v1/comments/?searchKeyword=${searchKeyword}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
