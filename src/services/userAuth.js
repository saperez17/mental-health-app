import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL;

const signin = async useregistrationData => {
  try {
    console.log('userReg', useregistrationData);
    const res = axios.post(`${BASE_URL}/api/users`, useregistrationData);
    return res;
  } catch (e) {
    console.log(e);
  }
};

const login = async ({ email, password }) => {
  try {
    const url = `${BASE_URL}/api/login`;
    const res = await axios.post(url, { email, password });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export { signin, login };
