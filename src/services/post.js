import axios from 'axios'
import { getFromLocal } from "@/utils/localStorage";

const BASE_URL = process.env.VUE_APP_BASE_URL;

const getPosts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/posts`)
    return res.data
  } catch (e) {
    console.log(e)
  }
}
const createPost = async (newPost) => {
  try {
    const user = getFromLocal('user');
    let headers = {
            "Authorization": `Bearer ${user.token}`,
            "content-type": "application/json"
    };
    const res = await axios.post(`${BASE_URL}/api/posts`,  newPost, { headers: { ...headers } })
    return res
  } catch (e) {
    console.log(e)
  }
}
const updatePost = async ({newPostData, postId}) => {
  try {
    const user = getFromLocal('user');
    console.log('postId',postId);
    let headers = {
            "Authorization": `Bearer ${user.token}`,
            "content-type": "application/json"
    };
    const res = await axios.put(`${BASE_URL}/api/posts/${postId}`,  { ...newPostData, userId:user.id }, { headers: { ...headers } })
    return res
  } catch (e) {
    console.log(e)
  }
}

export {
  getPosts,
  createPost,
  updatePost
}
