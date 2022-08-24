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
      <PoseDisplayer :imgSrc="this.imgPath" />
    </v-row>
    <v-row justify="center" align-content="center">
      <v-btn color="primary" @click="this.Transit">Start for Debug</v-btn>
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
    data :()=>{
      return{
        imgPath: "/yoga_pose_default.png",
        error_message: "",
        recognition: "skeleton",
        before_recognition: "skeleton",
        timer:undefined,
      }


    },
    methods:{
      polling : function (){
        this.$axios.get(this.$config.apiURL, {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          //if (response.data.body.button_status == 1)
          //{
          //  this.Transit();
          //}
          this.imgPath = `data:image/jpeg;base64,${response.data.body.imagedata}`;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.body.imagedate) {
              this.imgPath = `data:image/jpeg;base64,${error.response.data.body.imagedate}`;
            } else {
              this.imgPath = "yoga_pose_default.png";
            }
            this.error_message =
              error.response.data.body.error_type +
              ": " +
              error.response.data.body.error_message;
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.statusText);
            console.log(error.response.headers);
          } else if (error.request) {
            this.imgPath = "yoga_pose_default.png";
            this.error_message = "Error: no response from server";
            console.log(error.request);
          } else {
            this.imgPath = "yoga_pose_default.png";
            this.error_message = "Error: something went wrong";
            console.log("Error", error.message);
          }
        });
      },
      Transit()
      {
        clearInterval(this.timer);
        this.$router.push("/ready");

      }

    },
    mounted:function()
    {
      const self = this;
      self.timer =setInterval(()=>self.polling(),500);
    },


}
</script>
