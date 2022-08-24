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
                <v-btn color="secondary" v-on:click="onClickForDebug">
                    Next for Debug
                </v-btn>
                <v-btn color="warning" @click="onDetectFirstPose">
                    first pose detect for debug
                </v-btn>
                <v-btn color="warning" @click="onDetectSecondPose">
                    second pose detect for debug
                </v-btn>
                <v-btn color="success" nuxt to="/">
                    Back to Top For Debug
                </v-btn>
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
            currentQuiz : "これは最初のクイズですか？",
            counterID : undefined,
            counter : 10,
            reload : true,
            q_state : ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"],
            imgPath: "/yoga_pose_default.png",
            error_message: "",
            recognition: "skeleton",
            before_recognition: "skeleton",
            timer: undefined,
        };

    },

    created() {
        this.counterID = setInterval(() => this.CountDown(), 1000);
    },

    methods:{

        onClickForDebug()
        {

            if (this.currentQNum == 10)
            {
                clearInterval(this.timer);
                let passNumer = this.q_state.filter(value => value == "OK").length;
                this.$router.push({name:"Result",params:{pass:passNumer}});
            }

            this.currentQNum = this.currentQNum+1;
            this.currentQuiz = "これは"+ this.currentQNum + "番目のクイズですか？";
            if (this.currentQNum % 2 == 0)
            {
                this.leftAns = "Yes";
                this.rightAns = "No";
            }
            else
            {
                this.leftAns = "No";
                this.rightAns = "Yes";
            }
            this.counterID = setInterval(()=>this.CountDown(),1000);
        },
        onDetectFirstPose()
        {
            this.q_state[this.currentQNum-1]="OK";
            this.q_state.splice();
            this.leftColorState = "green lighten-2";
            this.reset();

        },
        onDetectSecondPose()
        {
            this.q_state[this.currentQNum-1]="NG";
            this.q_state.splice();
            this.rightColorState = "red lighten-2";
            this.reset();

        },
        CountDown()
        {
            this.counter = this.counter - 1;
            if (this.counter == 0)
            {
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
            this.onClickForDebug();
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

        sleepByPromise: function (sec) {

            return new Promise(resolve => setTimeout(resolve, sec * 1000));

        },

    },
    components : { Question, PoseDisplayer, Selection, StateViewer },

    mounted:function()
    {
      const self = this;
      self.timer =setInterval(()=>self.getImg(),500);
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