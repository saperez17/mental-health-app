<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>Login successful. Please wait.</p>
      <b-progress
        variant="success"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>

    <b-form @submit="onSubmit" @reset="onReset" v-if="true">
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="Password"
          required
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-center align-items-center">
        <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { login } from "@/services/userAuth";
import { saveToLocal, removeFromLocal } from "@/utils/localStorage";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },

      show: true,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      login({ email: this.form.email, password: this.form.password }).then(
        (res) => {
          console.log('res', res);
          if (res.status === 200) {
            this.showAlert();
            removeFromLocal("user");
            saveToLocal("user", res.data);
            this.$store.dispatch("setUser", res.data);
            setTimeout(() => {
              this.$router.push("/");
            }, 5000);
          }
        }
      );
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
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
<style>
</style>
