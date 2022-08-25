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
      <v-btn color="primary" @click="this.TransitionToGame">Start for Debug</v-btn>
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
import { mapMutations } from 'vuex'
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

      //Quizを取得する
      LoadQuizData: function () {
        this.$axios.get(this.$config.questionURL, {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          response.data.forEach(el => {
            this.$store.commit('question/addQ', el["quiz"]);
            this.$store.commit('question/addAns', el["ans"]);
          });
          console.log("Get QuizData Successfully");
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
          console.log(this.$store.getters['question/getQ_data'](i));
          console.log(this.$store.getters['question/getAns_data'](i));
        }


      },

      //Game画面への遷移
      TransitionToGame:function()
      {
        clearInterval(this.timer);
        if (this.$store.getters["question/getQCount"] == 0)
        {
          this.LoadDummyQuestion();
        }
        this.$router.push("/ready");

      }

    },

    //home画面を表示時に
    //クイズデータをVuexStoreにロードする
    //ポーリングを開始する
    mounted:function()
    {
      const self = this;

      self.$store.commit('question/clearData');
      self.LoadQuizData();
      self.timer =setInterval(()=>self.polling(),500);
    },


}
</script>
