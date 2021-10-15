<template>
  <b-col>
    <div style="container-wrapper">
      <PostInput />
      <div>
        <div class="d-flex justify-content-center"><h3>Latest Posts</h3></div>
        <div v-if="posts.length === 0">No posts yet</div>
        <Post v-else v-for="post in posts" v-bind:key="post.id" :data="post" />
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>
    </div>
  </b-col>
</template>

<script>
import PostInput from "@/components/ContentFeed/components/PostInput";
import Post from "@/components/ContentFeed/components/Post";
import store from "@/store";
import { getPosts } from "@/services/post";
export default {
  name: "ContentFeed",
  components: {
    PostInput,
    Post,
  },
  data() {
    return {
      mySVG: require("@/assets/undraw_Login_re_4vu2.svg"),
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    userId() {
      const userId = this.$store.state.user;
      return userId;
    },
  },
  created() {
    // console.log('posts data', this.posts);
    getPosts().then((res) => {
      console.log("retrieved posts", res);
      this.$store.commit("setPostsInitialState", res);
    });
  },
  methods: {},
};
</script>

<style scoped>
.container-wrapper {
  display: flex;
  flex-direction: column;
}

.pleaseLoginWrapper {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
