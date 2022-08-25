<template>
    <v-container>
        <v-row justify="space-between" align-content="center" class="mb-5">
            <StateViewer :Q_State="this.q_state"/>
        </v-row>
        <v-row justify="center" align-content="center">
            <v-card class="question-tile" color="blue lighten-4" align-content="center">
                <Question :Q_Num="this.currentQNum" :Q_Content="this.currentQuiz" :Q_CountDown="this.counter"/>
            </v-card>
        </v-row>
        <v-row justify="space-between" align-content="center" class="selection-row">
            <v-col>
                <v-card class="selection-tile" :color="this.leftColorState">
                    <Selection v-bind:answer="this.leftAns" :PoseNum="this.getPoseNumforLeft"/>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="pose-disp-tile" justify="center">
                    <PoseDisplayer :imgSrc="this.imgPath"/>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="selection-tile" :color="this.rightColorState">
                    <Selection v-bind:answer="this.rightAns" v-bind:PoseNum="this.getPoseNumforRight"/>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
                <v-btn color="secondary" v-on:click="UpdateQuiz">
                    Next for Debug(Not Selected)
                </v-btn>
                <v-btn color="warning" @click="onDetectLeftPose">
                    first pose detect for debug
                </v-btn>
                <v-btn color="warning" @click="onDetectRightPose">
                    second pose detect for debug
                </v-btn>
                <v-btn color="success" nuxt to="/">
                    Back to Top For Debug
                </v-btn>
        </v-row>
        <v-row>
            <img :src="this.streamURL"/>
        </v-row>
    </v-container>
</template>

<style>
.question-tile
{
    width: 100%;
    height: 200px;
    padding: 20px;
}

.pose-disp-tile
{
    width: 400px;
    height: 500px;

}
.selection-tile
{
    min-width:600px;
    width: 100%;
    min-height: 500px;
    padding-top:  50px;
}
.selection-row
{
    padding: 20px;
}
</style>
<script>
import Question from '../components/Question.vue';
import PoseDisplayer from '../components/PoseDisplayer.vue'; 
import Selection from '../components/Selection.vue';
import StateViewer from '../components/StateViewer.vue';
import { async } from 'q';
export default{
    data:()=>
    {
        return {
            leftAns : "Yes",
            rightAns : "No",
            leftColorState : "blue-grey lighten-4",
            rightColorState : "blue-grey lighten-4",
            currentQNum : 1,
            totalQCount : 10,
            currentQuiz : "Nodata",
            counterID : undefined,
            counter : 10,
            reload : true,
            q_state : [],
            imgPath: "/yoga_pose_default.png",
            streamURL:"",
            error_message: "",
            recognition: "skeleton",
            timer: undefined,
        };

    },

    methods:{

        UpdateQuiz()
        {

            if (this.currentQNum == this.totalQCount)
            {
                clearInterval(this.timer);
                let passNumer = this.q_state.filter(value => value == "OK").length;
                this.$router.push({name:"Result",params:{pass:passNumer}});
                return;
            }

            this.currentQNum = this.currentQNum+1;
            this.currentQuiz = this.$store.getters['question/getQ_data'](this.currentQNum-1);
            this.counterID = setInterval(()=>this.CountDown(),1000);
        },
        onDetectLeftPose()
        {
            var ans = this.$store.getters['question/getAns_data'](this.currentQNum-1);
            if (ans == "1")
            {
                this.q_state[this.currentQNum-1] = "OK";
                this.q_state.splice();
                this.leftColorState = "green lighten-2";
            }
            else
            {
                this.q_state[this.currentQNum - 1] = "NG";
                this.q_state.splice();
                this.leftColorState = "red lighten-2";

            }
            this.reset();

        },
        onDetectRightPose()
        {
            var ans = this.$store.getters['question/getAns_data'](this.currentQNum-1);
            if (ans == "2")
            {
                this.q_state[this.currentQNum-1] = "OK";
                this.q_state.splice();
                this.rightColorState = "green lighten-2";
            }
            else
            {
                this.q_state[this.currentQNum - 1] = "NG";
                this.q_state.splice();
                this.rightColorState = "red lighten-2";

            }
            this.reset();

        },
        CountDown()
        {
            this.counter = this.counter - 1;
            if (this.counter == 0)
            {
                this.leftColorState = "red lighten-2";
                this.rightColorState = "red lighten-2";
                this.q_state[this.currentQNum - 1] = "NG";
                this.q_state.splice();
                this.reset();
            }
        },
        reset : async function()
        {
            clearInterval(this.counterID);
            await this.sleepByPromise(2);
            this.counter = 10;
            this.leftColorState = "blue-grey lighten-4";
            this.rightColorState = "blue-grey lighten-4";
            this.UpdateQuiz();
        },
        getImg: function () {
            this.$axios.get(this.$config.apiURL, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            })
                .then((response) => {
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

        getStreaming :function()
        {
            this.$axios.get(this.$config.streamURL, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            })
                .then((response) => {
                    this.streamURL = `${response.data.body}`;
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.data.body) {
                            this.imgPath = `data:image/jpeg;base64,${error.response.data.body}`;
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

        sleepByPromise: function (sec) {

            return new Promise(resolve => setTimeout(resolve, sec * 1000));

        },

    },
    components : { Question, PoseDisplayer, Selection, StateViewer },

    mounted:function()
    {
      const self = this;
      self.currentQuiz = this.$store.getters['question/getQ_data'](0);
      self.timer =setInterval(()=>self.getImg(),500);
        self.counterID = setInterval(() => self.CountDown(), 1000);
    },

    created() {
      const self = this;
      self.totalQCount = this.$store.getters["question/getQCount"];
      for (var i = 0; i < self.totalQCount ; i++)
      {
        self.q_state.push("NONE");
      }
      console.log(self.q_state);
      self.q_state.splice();
        
    },

    computed:{
        getPoseNumforLeft()
        {
            return this.currentQNum % 4;
        },
        getPoseNumforRight()
        {
            return (this.currentQNum + 2) % 4;
        }
    }
}
</script>