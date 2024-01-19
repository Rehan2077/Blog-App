import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL;

export const getAllPosts = async (searchKeyword = "", limit = 10, page = 1) => {
  try {
    const { data, headers } = await axios.get(
      `${url}/api/v1/posts/?searchKeyword=${searchKeyword}&limit=${limit}&page=${page}`,
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSinglePost = async (slug) => {
  try {
    const { data } = await axios.get(`${url}/api/v1/posts/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deletePost = async ({slug, token}) => {
  try {
    console.log(slug, token);
    const { data } = await axios.delete(`${url}/api/v1/posts/${slug}`, {
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

export const updatePost = async (updatedData, slug, token) => {
  try {
    const { data } = await axios.put(
      `${url}/api/v1/posts/${slug}`,
      updatedData,
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

export const createPost = async ({postData, token}) => {
  try {
    console.log(postData, token);
    const { data } = await axios.post(`${url}/api/v1/posts/`, postData, {
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
