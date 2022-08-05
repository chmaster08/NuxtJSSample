<template>
  <div>
    <v-card max-width="600" class="mx-auto" align="center">
      <v-card-title>
        <v-icon large left>mdi-twitter</v-icon>
      </v-card-title>

      <VuetifyLogo msg="Hello Vuetify"></VuetifyLogo>
    </v-card>
    <v-card class="mx-auto" max-width="600" align="center">
      <v-card-title>
        Streak
      </v-card-title>
      <p>{{ streakdays }} days</p>
    </v-card>

    <div align="right">
      <a v-bind:href="url" v-bind:class="{active : isActive}">Back to Welcome Page</a>
      <v-btn color="primary" nuxt @click="largerButton">Larger</v-btn>
      <v-btn color="secondary" nuxt @click="smallerButton">Smaller</v-btn>
      <p>{{msg}}</p>
    </div>

  </div>
</template>

<script>
import VuetifyLogo from '../components/VuetifyLogo.vue';
export default{
    data() {
        return {
            url: "/",
            isActive: false,
            streakdays : 5,
        };
    },
    methods: {
        largerButton() {
            this.isActive = true;
        },
        smallerButton() {
            this.isActive = false;
        }
    },
    components: { VuetifyLogo }
}
</script>
<style>
.active{
  font-size: large;
}
.mx-auto{
  margin: 10px;
  padding: 10px;
}
</style>