<template>
    <v-container>
        <v-row justify="space-between" align-content="center">

        </v-row>
        <v-row justify="center" align-content="center">
            <v-card class="question-tile" color="blue lighten-4" align-content="center">
                <Question :Q_Num="this.currentQNum" :Q_Content="this.currentQuiz" :Q_CountDown="this.counter"/>
            </v-card>
        </v-row>
        <v-row justify="space-between" align-content="center" class="selection-row">
            <v-col>
                <v-card class="selection-tile" color="orange lighten-4">
                    <Selection v-bind:answer="this.select1"/>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="pose-disp-tile" justify="center">
                    <PoseDisplayer />
                </v-card>
            </v-col>
            <v-col>
                <v-card class="selection-tile" color="orange lighten-4">
                    <Selection v-bind:answer="this.select2" v-bind:PoseNum="1"/>
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
export default{
    data()
    {
        return {
            select1 : "Yes",
            select2 : "No",
            currentQNum : 1,
            currentQuiz : "これは最初のクイズですか？",
            counterID : undefined,
            counter : 10,
        };

    },

    created() {
        this.counterID = setInterval(() => this.CountDown(), 1000);
    },

    methods:{

        onClickForDebug()
        {
            clearInterval(this.counterID);

            if (this.currentQNum == 10)
            {
                this.$router.push("/Result");
                return;
            }

            this.currentQNum = this.currentQNum+1;
            this.currentQuiz = "これは"+ this.currentQNum + "番目のクイズですか？";
            if (this.currentQNum % 2 == 0)
            {
                this.select1 = "Yes";
                this.select2 = "No";
            }
            else
            {
                this.select1 = "No";
                this.select2 = "Yes";
            }
            this.counterID = setInterval(()=>this.CountDown(),1000);
        },
        onDetectFirstPose()
        {
            this.reset();

        },
        onDetectSecondPose()
        {
            this.reset();

        },
        CountDown()
        {
            this.counter = this.counter - 1;
            if (this.counter == 0)
            {
                this.counter = 10;
                this.onClickForDebug();
            }
        },
        reset()
        {
            this.counter = 10;
            this.onClickForDebug();
        }

    },
    components : { Question, PoseDisplayer, Selection }
}
</script>