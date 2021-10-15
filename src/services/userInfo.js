import axios from 'axios'

const BASE_URL = process.env.VUE_APP_BASE_URL;

const getUserData = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/users/${id}`)
    return res
  } catch (e) {
    console.log(e)
  }
}

export {
    getUserData
}