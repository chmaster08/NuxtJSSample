
<template>
    <v-container justify="center" align-content="center" >
        <v-row>
            <v-col cols="3">
                <p>Quiz Number :</p>
            </v-col>
            <v-col cols="1" justify="center">
                <v-combobox v-model="q_numSelect" :items="this.q_numList" filled solo></v-combobox>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="3">
                <p>Debug Mode : </p>
            </v-col>
            <v-col>
                <v-switch v-model="debug"></v-switch>
            </v-col>
        </v-row>
        <v-row >
            <v-col cols="3">
                <p>Quiz Interval Time : </p>
            </v-col>
            <v-col cols="1">
                <v-combobox v-model="interval" :items="this.intervalList" filled solo></v-combobox>
            </v-col>
        </v-row>
        <v-row >
            <v-col cols="3">
                <p>Quiz Answer Time : </p>
            </v-col>
            <v-col cols="1">
                <v-combobox v-model="answer" :items="this.answerList" filled solo></v-combobox>
            </v-col>
        </v-row>
        <v-row>
            <v-btn color="primary" @click="this.save">Save</v-btn>
        </v-row>
    </v-container>
</template>

<style>
    p{
        font-size: 30pt;
    }
</style>

<script>
    export default
    {

        data:function(){

            return{

                q_numList: [5, 7, 10],
                q_numSelect:5,
                intervalList :[2,3,4,5],
                interval:2,
                answerList:[10,15,20,25,30],
                answer:20,
                debug: true,
            }

        },
        methods:{
            save()
            {
                this.$store.commit('question/setTotalQuizNum', this.q_numSelect);
                this.$store.commit('question/setDebug', this.debug);
                this.$store.commit('question/setInterval', this.interval);
                this.$store.commit('question/setAnswerTime', this.answer);
                console.log("Set Quiz Number : "+ this.$store.getters['question/getQCount']);
                console.log("Set Debug : "+ this.$store.getters['question/getDebug']);
                console.log("Set Interval : "+ this.$store.getters['question/getInterval']);
                console.log("Set Answer Time : "+ this.$store.getters['question/getAnswerTime']);
                this.$router.push("/");
            }
        },

        created() {
            this.q_numSelect = this.$store.getters["question/getQCount"];
            this.debug = this.$store.getters["question/getDebug"];
            this.interval = this.$store.getters["question/getInterval"];
            this.answer = this.$store.getters["question/getAnswerTime"];
        },
    }
</script>