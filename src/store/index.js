import { postBuilder } from "../stubs/builders";
import { getPosts } from "@/services/post";

import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  debug: true,
  state: {
    posts: [],
    name: "Santiago",
    user: null,
  },

  mutations: {
    fetchPosts(state) {
      return this.state.posts;
    },
    ADD_POST(state, postData) {
      //   if (this.debug) console.log('addPostAction triggered with', newPost)
      state.posts = [...state.posts, postData];
    },
    VOTE_POST(state, updatedPost) {
      state.posts = state.posts.map((post) => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      });
    },
    DOWN_VOTE_POST(state, downvotedPost) {
      state.posts = state.posts.map((post) => {
        if (post.id === downvotedPost.id) {
          post.likes -= 1;
          return post;
        }
        return post;
      });
    },
    UPDATE_POST(state, updatedPost) {
      state.posts = state.posts.map((post) => {
        if (post.id == updatedPost.id) {
          console.log("matched", post);
          return updatedPost;
        }
        return post;
      });
    },
    setPostsInitialState(state, newPosts) {
      state.posts = newPosts;
    },
    GET_USER(state) {
      return state.user;
    },
    SET_USER(state, userObj) {
      state.user = userObj;
    },
  },
  actions: {
    publishPost({ commit }, postData) {
      commit("ADD_POST", postData);
    },
    votePost({ commit }, { updatedPost }) {
      commit("VOTE_POST", updatedPost);
    },
    downVotePost({ commit }, { post }) {
      commit("DOWN_VOTE_POST", post);
    },
    updatePost({ commit }, updatedPost) {
      // console.log('updatedPost',updatedPost);
      commit("UPDATE_POST", updatedPost);
    },
    getUser({ commit }) {
      commit("GET_USER");
    },
    setUser({ commit }, userObj) {
      commit("SET_USER", userObj);
    },
  },
});

export default store;
