<template>
  <Home/>
</template>

<script>
import Home from '@/views/Home'
export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

#app, * {
  font-family: 'Varela Round', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  margin: 0;
  padding: 0;

  /* background-color: whitesmoke; */
}

p{ margin: 0;}
.container-fluid {
  padding: 0
}
.btn-primary {
  background-color: #1d93d9 !important;
  border-color: #1375ad !important;
}
.btn-primary:hover{
  background-color: #3d9ed6 !important;
  border-color: #3d9ed6 !important;
}



</style>
