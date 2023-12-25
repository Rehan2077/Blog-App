import axios from "axios";

export const signin = async ({ email, password }) => {
  try {
    const { data } = await axios.post("/api/v1/users/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
