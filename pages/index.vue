<template>
  <v-container justify="center">
    <v-row justify="center" align-content="center">
      <KMLogo />
    </v-row>
    <v-row justify="center" align-content="center">
      <h1 class="game-title">Quiz Yogionea</h1>
    </v-row>
    <v-row justify="center" align-content="center">
      <p>プレイヤーが中心に移るようにカメラ位置を調整してください</p>
    </v-row>
    <v-row justify="center" align-content="center">
      <PoseDisplayer />
    </v-row>
    <v-row justify="center" align-content="center">
      <v-btn color="primary" nuxt to="/ready">Start for Debug</v-btn>
    </v-row>
  </v-container>
</template>

<style>
.game-title{
  font-size: 40pt;
  margin: 30px;
}
</style>

<script>
import KMLogo from "../components/KMLogo.vue";
import PoseDisplayer from "../components/PoseDisplayer.vue";
export default {
    name: "IndexPage",
    components: { KMLogo, PoseDisplayer },
    data :{
      overlay : false,
    }
}
</script>
