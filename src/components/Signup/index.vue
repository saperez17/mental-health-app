<template>
  <div class="white-bk " >
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>
        Your account has been created. You'll be redirected in
        {{ dismissCountDown }} seconds...
      </p>
      <b-progress
        variant="success"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>

    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          placeholder="Username"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.email"
          placeholder="Email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="gender" label-for="gender">
        <b-form-select
          id="gender"
          v-model="form.gender"
          :options="gender"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="password" label-for="password">
        <b-form-input
          type="password"
          id="password"
          v-model="form.password"
          placeholder="Password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="re-password" label-for="re-password">
        <b-form-input
          type="password"
          id="re-password"
          v-model="form.confirmPassword"
          placeholder="Confirm Password"
          required
        ></b-form-input>
      </b-form-group>
      <div class="d-flex p-2 justify-content-center">
        <b-button type="submit" variant="primary" class="mr-2"
          >Submit form</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
import { signin } from "@/services/userAuth.js";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        email: "",
        gender: "",
        password: "",
        confirmPassword: "",
      },
      gender: [
        { text: "How do you identify yourself", value: null },
        "Female",
        "Male",
        "Binary",
        "Skip",
      ],
      show: true,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      signin(this.form).then((res) => {
        if (res !== undefined && res.status === 200) {
          this.showAlert();
        }
        // this.$router.push('/')
      });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.username = "";
      this.form.email = "";
      this.form.gender = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      // this.$nextTick(() => {
      //   this.show = true
      // })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>

<style >
.form-control,  #input-1, #input-2 {
  border-style: none none solid none !important;
  border-style: none none solid none !important;
  border-radius: 0;
}

.form-control:focus {
  border-color: inherit;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
*:focus {
  outline: none !important;
  border-style: none none solid none;
}
input:focus {
  outline: none !important;
  border-style: none none solid none;
}
/* .white-bk *{
  z-index: 1;
  background-color: white;
} */

</style>
