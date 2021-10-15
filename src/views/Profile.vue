<template>
  <b-row>
    <b-col cols="3"> </b-col>
    <b-col cols="6">
      <div class="wrapper">
        <!-- <img
          src="img_girl.jpg"
          alt="Girl in a jacket"
          width="500"
          height="600"
        /> -->

        <div
          class="d-flex justify-content-center flex-column align-items-center"
        >
          <img width="300" :src="mySVG" />
          <h2>{{ userObj.username }}</h2>
          <div
            class="d-flex flex-column justify-content-center align-items-start"
          >
            <div class="d-flex justify-content-center align-items-center">
              <p class="p-0 m-0 font-weight-bold">Email</p>
              <p class="p-0 mt-0 mb-0 ml-3">{{ userObj.email }}</p>
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <p class="p-0 m-0 font-weight-bold">Gender</p>
              <p class="p-0 mt-0 mb-0 ml-3">{{ userObj.gender }}</p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-4">
          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <p class="font-weight-bold">#Posts</p>
            <h4>{{ userObj.posts.length }}</h4>
          </div>
          <div class="ml-4">
            <div
              class="
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
            >
              <p class="font-weight-bold">#Likes</p>
              <h4>{{ likesNumber }}</h4>
            </div>
          </div>
        </div>
      </div>
    </b-col>
    <b-col cols="3"> </b-col>
  </b-row>
</template>
<script>
import { getUserData } from "@/services/userInfo";

export default {
  name: "Profile",
  data() {
    return {
      mySVG: require("@/assets/undraw_profile_pic_ic5t.svg"),
      userObj: null
    };
  },
  computed: {
    postNumber() {
      return this.$store.user.posts.length;
    },
    likesNumber() {
      let likesQuantity = this.userObj.posts.reduce(
        (prev, curr) => {
          return prev + curr.likes.length;
        },
        0
      );
      return likesQuantity
    },
  },
  created(){    
  },
  mounted() {
    if (this.$router.history.current){
      getUserData(this.$router.history.current.params.id)
      .then(res => {
        console.log('res', res);
        this.userObj = res.data
      })
    }
    console.log('userObj', this.userObj);
  },
  methods: {
    reducer(prev, curr) {
      return prev.likes.length + curr;
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>