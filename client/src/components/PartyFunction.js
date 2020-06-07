import axios from "axios";

export const createParty = (party) => {
  return axios
    .post("/parties/add", party)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const allParty = () => {
  return axios
    .get("/parties/all")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export async function countMember(id) {
  try {
    let res = await axios({
      url: `/parties/${id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    return err;
  }
}

export const joinParty = (detail) => {
  return axios.post("/parties/join", detail).then((res) => {
    return res.data;
  });
};
