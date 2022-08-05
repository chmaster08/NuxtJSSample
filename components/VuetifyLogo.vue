<template>
<div>
  <img
    class="vuetify-logo"
    alt="Vuetify Logo"
    src="/vuetify-logo.svg"
  >
  <h2>{{msg}}</h2>

</div>
</template>

<script>
export default{
  props:{
    msg : {
      type:String,
      default : 'Hello Real World',
    }
  },
}
</script>

<style>
.vuetify-logo {
  height: 180px;
  width: 180px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
