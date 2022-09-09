<template>
  <v-container justify="center">
    <v-row justify="center" align-content="center">
      <KMLogo />
    </v-row>
    <v-row justify="center" align-content="center">
      <h1 class="game-title">Quiz Yogionea</h1>
    </v-row>
    <v-row justify="center" align-content="center">
      <p class="guidanceText">プレイヤーが中心に映るようにカメラ位置を調整してください</p>
    </v-row>
    <v-row justify="center" align-content="center">
      <PoseDisplayer :imgSrc="this.imgPath" />
    </v-row>
    <v-row justify="center" align-content="center" v-if="!this.canStart">
      <v-progress-circular :size="50" color="blue" indeterminate>
      </v-progress-circular>
  </v-row>
  <v-row justify="center">
      <p class="loadingText">{{this.loadingText}}</p>
  </v-row>
  <v-row justify="center" align-content="center" v-if="this.canStart && this.debug">
      <v-btn color="primary" @click="this.TransitionToGame">Start</v-btn>
    </v-row>
  <v-row justify="center" align-content="center" v-if="this.canStart && this.debug">
      <v-btn color="secondary" nuxt to="config">Settings</v-btn>
    </v-row>
  </v-container>
</template>

<style>
.game-title{
  font-size: 40pt;
  margin: 20px;
}

.loadingText{
  font-size:  20pt;
}

.guidanceText
{
  font-size:  30pt;
}
</style>

<script>
import KMLogo from "../components/KMLogo.vue";
import PoseDisplayer from "../components/PoseDisplayer.vue";
import { mapMutations } from 'vuex'
import { async } from "q";
import {w3cwebsocket} from 'websocket';
const W3CWebSocket = w3cwebsocket;
export default {
    name: "IndexPage",
    components: { KMLogo, PoseDisplayer },
    data :()=>{
      return{
        imgPath: require("@/assets/yoga_pose_default.png"),
        error_message: "",
        recognition: "skeleton",
        before_recognition: "skeleton",
        loadingText : "Loading Quiz Data...",
        loaded :false,
        canStart:false,
        loadingtimer : undefined,
        timer:undefined,
        acceptTransition : false,
        debug:true,
      }


    },
    methods:{

      LoadQuizData :async function()
      {
        this.loadingtimer = setInterval(()=>this.UpdateLoadingText(),500);
        await this.GetQuizData();
        clearInterval(this.loadingtimer);
        if (this.loaded)
        {
          this.loadingText += "Complete!";
        }
        else
        {
          this.loadingText = "Failed to load Quiz Data. Dummy Data has been loaded."
        }
        this.canStart = true;
      },

      UpdateLoadingText()
      {
        this.loadingText += ".";
      },
      //Quizを取得する
      GetQuizData: async function () {
        await this.$axios.get(this.$config.questionURL, {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          timeout : 5000,
        })
        .then((response) => {
          response.data.forEach(el => {
            this.$store.commit('question/addQ', el["quiz"]);
            this.$store.commit('question/addAns', el["ans"]);
          });
          console.log("Get QuizData Successfully");
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            this.error_message =
              error.response.data.body.error_type +
              ": " +
              error.response.data.body.error_message;
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.statusText);
            console.log(error.response.headers);
          } else if (error.request) {
            this.error_message = "Error: no response from server";
            console.log(error.request);
          } else {
            this.error_message = "Error: something went wrong";
            console.log("Error", error.message);
          }
          this.LoadDummyQuestion();
          this.loaded = false;
        });

      },

      //画像を取得する
      polling : function (){
        this.$axios.get(this.$config.apiURL, {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          if (response.data["button_status"]== "1" && !this.acceptTransition)
          {
            this.acceptTransition = true;
            this.TransitionToGame();
          }
          this.imgPath = `data:image/jpeg;base64,${response.data.body.imagedata}`;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.body.imagedate) {
              this.imgPath = `data:image/jpeg;base64,${error.response.data.body.imagedate}`;
            } else {
              this.imgPath = require("@/assets/yoga_pose_default.png");
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
            this.imgPath = require("@/assets/yoga_pose_default.png");
            this.error_message = "Error: no response from server";
            console.log(error.request);
          } else {
            this.imgPath = require("@/assets/yoga_pose_default.png");
            this.error_message = "Error: something went wrong";
            console.log("Error", error.message);
          }
        });
      },

      //問題取得に失敗した場合 or Debug用のローカルダミー問題
      LoadDummyQuestion()
      {
        for (var  i = 0; i < 10 ; i++)
        {
          var leftNum = Math.floor( Math.random() * 1000);
          var rightNum = Math.floor(Math.random() * 1000);
          var ansNum = i % 2 == 0 ? leftNum+rightNum : (leftNum + rightNum) -Math.floor(Math.random() * 10);
          var ans = i %2 == 0 ? "1" : "2"; 
          var q_txt = leftNum + " + " + rightNum+" = "+ ansNum + " ? ";
          this.$store.commit('question/addQ',q_txt);
          this.$store.commit('question/addAns',ans);
        }


      },

      //Game画面への遷移
      TransitionToGame:function()
      {
        clearInterval(this.timer);
        this.$router.push("/ready");

      }

    },

    //home画面を表示時に
    //クイズデータをVuexStoreにロードする
    //ポーリングを開始する
    created:function()
    {

      this.loaded = false;
      this.acceptTransition = false;
      this.$store.commit('question/clearData');
      this.debug = this.$store.getters["question/getDebug"];
      this.LoadQuizData();
      this.timer =setInterval(()=>this.polling(),500);
    },


}
</script>
