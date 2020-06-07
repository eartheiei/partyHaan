import axios from "axios";

export const login = (user) => {
  return axios
    .post("/users/login", user)
    .then((res) => {
      localStorage.setItem("usertoken", res.data);
      return res;
    })
    .catch((err) => {
      return err.response
    });
};

export const register = (newUser) => {
  return axios
    .post("/users/register",newUser)
    .then((res) => {
      console.log(res.status)
      return res
    })
    .catch((err) => {
      return err.response
    })
}

