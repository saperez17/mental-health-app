<template>
  <div class="form-wrapper">
    <b-avatar variant="primary" text="BV"></b-avatar>
    <b-form @submit="onSubmit" @reset="onReset" v-if="true" class="post-form">
      <b-form-group>
        <b-form-input
          id="post-content"
          v-model="post.content"
          type="text"
          placeholder="How's your mood today?"
          class="form-input"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" size="sm">Publish</b-button>
    </b-form>
    <!-- {{ posts.length > 1 ? posts[1] : posts[0] }} -->
  </div>
</template>

<script>
// import store from "@/store";
import { createPost } from '@/services/post'
export default {
  name: "PostInput",
  data() {
    return {
      post: {
        content: "",
      },
      name: "Santiago",
      posts: this.$store.state.posts
    };
  },
  computed: {
    // posts() {
    //   return this.$store.state.posts
    // },
    // name: {
    //   get() {
    //     return "Santiago"
    //   }
    //   set(value){
    //     this.
    //   }
    // }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form))
      createPost({ content: this.post.content })
      .then(res => {
        console.log('created post', res.data);
        this.$store.dispatch("publishPost", res.data);
      })
      .catch(e => console.log(e))
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.post.content = "";
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  created() {
    this.$nextTick(function () {
     
    });
  },
  updated() {
    console.log('here');
}
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid rgb(199, 199, 199);
  border-style: none none solid none;
}
.form-wrapper .post-form {
  flex: 0.9;
  margin-left: 0.5rem;
}
.form-input {
  position: relative;
  height: 5rem;
}
.form-input::placeholder {
  position: absolute;
}
</style>
