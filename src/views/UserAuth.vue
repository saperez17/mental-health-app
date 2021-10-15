<template>
<b-row align-h="center" class="wrapper white-bk ">
  <b-col cols="6" class="signup-wrapper">
    <div class="d-flex p-2 justify-content-center">
      <b-button class="mr-2" size="sm" variant="outline-primary" v-on:click="onClickFormSelection(false)">Signup</b-button>
      <b-button class="btn login-btn" size="sm" variant="primary" v-on:click="onClickFormSelection(true)">Login</b-button>
    </div>
    <Login v-if="choice"/>
    <Signup v-else/>
  </b-col>
</b-row>
</template>

<script>
import Login from '@/components/Login'
import Signup from '@/components/Signup'
export default {
  name: 'UserAuth',
  components: {
    Signup,
    Login
  },
  data () {
    return {
      choice: false
    }
  },
  methods: {
    onClickFormSelection (value) {
      this.choice = value;
    }
  }
}
</script>

<style scoped>
.wrapper{
  height: 70vh;
  display: flex;
  align-items: center;
}
.btn{
  /* border-style: none none solid none; */
  /* border */
}
.signup-btn{}

.signup-wrapper{
  background-color: white;
  box-shadow: 0px 0px 5px 1px #c9c9c9;
  border-radius: 10px;
  padding: 1rem;
}

</style>
