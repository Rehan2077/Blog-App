import axios from "axios";
import toast from "react-hot-toast";
import { clearUserInfo } from "../../store/reducers/user";

const url = process.env.REACT_APP_BACKEND_URL;

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post(`${url}/api/v1/users/register`, {
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
    const { data } = await axios.post(`${url}/api/v1/users/login`, {
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
    const { data } = await axios.get(`${url}/api/v1/users/logout`);
    dispatch(clearUserInfo());
    localStorage.removeItem("userInfo");
    toast.success(data.message);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    toast.error(error.message);
    throw new Error(error.message);
  }
};

export const updateProfile = async ({ userData, token }) => {
  try {
    const { name, email, password, newpassword } = userData;

    const { data } = await axios.put(
      `${url}/api/v1/users/updateProfile`,
      {
        name,
        email,
        password,
        newpassword,
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

export const updatePhoto = async (formdata, token) => {
  try {
    const { data } = await axios.put(
      `${url}/api/v1/users/updateProfilePicture`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
