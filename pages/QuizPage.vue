<template>
    <v-container>
        <v-row justify="space-between" align-content="center" >
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
                    <Selection v-bind:answer="this.leftAns" :PoseNum="this.getPoseNumforLeft" 
                    :PoseName="this.getPoseNameLeft"
                    />
                </v-card>
            </v-col>
            <v-col>
                <v-card class="pose-disp-tile" justify="center">
                    <PoseDisplayer :imgSrc="this.imgPath"/>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="selection-tile" :color="this.rightColorState">
                    <Selection v-bind:answer="this.rightAns" v-bind:PoseNum="this.getPoseNumforRight"
                     :PoseName="this.getPoseNameRight"
                     />
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="this.debug">
                <v-btn color="secondary" v-on:click="UpdateQuiz">
                    Next for Debug(Not Selected)
                </v-btn>
                <v-btn color="secondary" @click="onDetectPose1">
                    Pose0
                </v-btn>
                <v-btn color="secondary" @click="onDetectPose1">
                    Pose1
                </v-btn>
                <v-btn color="secondary" @click="onDetectPose2">
                    Pose2
                </v-btn>
                <v-btn color="secondary" @click="onDetectPose3">
                    Pose3
                </v-btn>
                <v-btn color="warning" @click="onDetectLeftPose">
                    first pose detect for debug
                </v-btn>
                <v-btn color="warning" @click="onDetectRightPose">
                    second pose detect for debug
                </v-btn>
                <v-btn color="success" @click="this.BackToIndex">
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
    height: 250px;
    padding: 20px;
}

.pose-disp-tile
{
    max-width: 660;
    max-height: 500;
    margin-top: 50px;

}
.selection-tile
{
    min-width:500px;
    width: 100%;
    min-height: 550px;
    padding-top:  10px;
}
.selection-row
{
    padding-top: 10px;
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
            leftPoseNum :-1,
            rightPoseNum : -1,
            currentQNum : 1,
            totalQCount : 10,
            currentQuiz : "Nodata",
            counterID : undefined,
            counter : 20,
            answerTime : 20,
            intervalTime : 2,
            detectedPose : -1,
            reload : true,
            q_state : [],
            imgPath: "@/assets/yoga_pose_default.png",
            streamURL:"",
            error_message: "",
            recognition: "skeleton",
            timer: undefined,
            PoseNameList :["戦士のポーズⅡ","木のポーズ","月のポーズ(右)","月のポーズ(左)"],
            imageURL:"",
            successImage:"",
            acceptTransition : false,
            debug:true,
        };

    },

    methods:{

        UpdateQuiz()
        {

            if (this.currentQNum == this.totalQCount)
            {
                clearInterval(this.timer);
                clearInterval(this.counterID);
                let sucscore = this.q_state.filter(value => value == "OK").length*10;
                this.$store.commit('question/setScore', sucscore);
                this.$store.commit('question/setImgName', this.successImage);
                this.$router.push({name:"Result",params:{score:sucscore,imgName:this.successImage}});                
                return;
            }

            this.currentQNum = this.currentQNum+1;
            this.currentQuiz = this.$store.getters['question/getQ_data'](this.currentQNum-1);
            this.counterID = setInterval(()=>this.CountDown(),1000);
        },
        onDetectLeftPose()
        {
            var ans = this.$store.getters['question/getAns_data'](this.currentQNum-1);
            console.log("Correct Pose is : "+ ans);
            if (ans == "1")
            {
                this.CallCorrectSound();
                this.q_state[this.currentQNum-1] = "OK";
                this.q_state.splice();
                this.leftColorState = "green lighten-2";
                this.successImage = this.imageURL;
            }
            else
            {
                this.CallWrongSound();
                this.q_state[this.currentQNum - 1] = "NG";
                this.q_state.splice();
                this.leftColorState = "red lighten-2";

            }
            this.reset();

        },
        onDetectRightPose()
        {
            var ans = this.$store.getters['question/getAns_data'](this.currentQNum-1);
            console.log("Correct Pose is : "+ ans);
            if (ans == "2")
            {
                this.CallCorrectSound();
                this.q_state[this.currentQNum-1] = "OK";
                this.q_state.splice();
                this.rightColorState = "green lighten-2";
                this.successImage = this.imageURL;
            }
            else
            {
                this.CallWrongSound();
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
                this.CallWrongSound();
                this.leftColorState = "red lighten-2";
                this.rightColorState = "red lighten-2";
                this.q_state[this.currentQNum - 1] = "NG";
                this.q_state.splice();
                this.reset();
            }
        },
        reset : async function()
        {
            console.log("Counter ID when reset : "+this.counterID);
            if (this.counterID)
            {
                clearInterval(this.counterID);
                this.counterID = undefined;
                await this.sleepByPromise(this.intervalTime);
                this.counter = this.answerTime;
                this.leftColorState = "blue-grey lighten-4";
                this.rightColorState = "blue-grey lighten-4";
                this.UpdateQuiz();
            }
        },
        pooling: function () {
            this.$axios.get(this.$config.apiURL, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            })
                .then((response) => {
                    this.imgPath = `data:image/jpeg;base64,${response.data.body.imagedata}`;
                    console.log("Pose Detection : : " + response.data.DETECTED_POSE);
                    this.imageURL = response.data.imagename;

                    this.detectedPose = response.data.DETECTED_POSE;
                    if (response.data["button_status"] == "5" && !this.acceptTransition)
                    {
                        this.acceptTransition = true;
                        this.BackToIndex();
                    }

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

        CallCorrectSound : function()
        {
            this.CallSoundAPI("CORRECT");

        },

        CallWrongSound : function()
        {
            this.CallSoundAPI("WRONG");
        },

        CallSoundAPI : function(flag)
        {

            this.$axios.get(this.$config.buzzerURL+flag, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
                timeout: 500,
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
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
                });

        },


        onDetectPose0 : function()
        {
            this.detectedPose = 0;
        },
        onDetectPose1 : function()
        {
            this.detectedPose = 1;
        },
        onDetectPose2 : function()
        {
            this.detectedPose = 2;
        },
        onDetectPose3 : function()
        {
            this.detectedPose = 3;
        },

        sleepByPromise: function (sec) {

            return new Promise(resolve => setTimeout(resolve, sec * 1000));

        },

        BackToIndex : function(){
            
            clearInterval(this.timer);
            clearInterval(this.counterID);
            this.$store.commit('question/clearData');
            this.$router.push("/");
        }

    },
    components : { Question, PoseDisplayer, Selection, StateViewer },

    mounted:function()
    {
        const self = this;
    },

    created() {
      this.totalQCount = this.$store.getters["question/getQCount"];
      this.counter = this.answerTime;
      this.debug = this.$store.getters["question/getDebug"];
      this.intervalTime = this.$store.getters["question/getInterval"];
      this.answerTime = this.$store.getters["question/getAnswerTime"];
      this.counter = this.answerTime;
      for (var i = 0; i < this.totalQCount ; i++)
      {
        this.q_state.push("NONE");
      }
      this.q_state.splice();
        this.currentQuiz = this.$store.getters['question/getQ_data'](0);
        this.acceptTransition = false;
        this.timer = setInterval(() => this.pooling(), 500);
        this.counterID = setInterval(() => this.CountDown(), 1000);
        
    },

    computed:{
        getPoseNumforLeft()
        {
            this.leftPoseNum = this.currentQNum % 4;
            return this.currentQNum % 4;
        },
        getPoseNumforRight()
        {
            this.rightPoseNum = (this.currentQNum + 2) % 4;
            return (this.currentQNum + 2) % 4;
        },
        getPoseNameLeft()
        {
            //console.log("leftName"+this.PoseNameList[this.leftPoseNum]);
            //console.log("leftNum"+this.leftPoseNum);
            return this.PoseNameList[this.leftPoseNum];
        },
        getPoseNameRight()
        {
            return this.PoseNameList[this.rightPoseNum];
        }

    },
    watch:{
        detectedPose : function(oldv,newv)
        {
            if (newv == -1)
            {
                return;
            }
            if (oldv == newv)
            {
                return;
            }
            if (newv == this.leftPoseNum)
            {
                this.onDetectLeftPose();
            }
            else if (newv == this.rightPoseNum)
            {
                this.onDetectRightPose();
            }

        }
    }
}
</script>