import axios from "axios";

export const getAllPosts = async (searchKeyword="", limit=10, page=1,) => {
  try {
    const { data, headers } = await axios.get(`/api/v1/posts/?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`);
    return {data, headers};
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSinglePost = async (slug) => {
  try {
    const { data } = await axios.get(`/api/v1/posts/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

