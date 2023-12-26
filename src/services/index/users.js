import axios from "axios";
import { clearUserInfo } from "../../store/reducers/user";
import toast from "react-hot-toast";

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post("/api/v1/users/register", {
      name,
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

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/users/logout");
    dispatch(clearUserInfo());
    toast.success(data.message);
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    toast.error(error.message);
    throw new Error(error.message);
  }
};

export const update = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post("/api/v1/users/register", {
      name,
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
