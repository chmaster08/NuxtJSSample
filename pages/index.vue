<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <KMLogo/>
      </v-card>
      <v-card>
        <v-card-title class="headline justify-center">
          Welcome to KM YOGA Service
        </v-card-title>
        <v-card-text>
          <p>Yoga can solve everything.</p>
          <p>Yoga would work for any diseases.</p>
          <p>Enjoy your Yoga life!!</p>
          <p></p>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import KMLogo from "../components/KMLogo.vue";
export default {
    name: "IndexPage",
    components: { KMLogo }
}
</script>
