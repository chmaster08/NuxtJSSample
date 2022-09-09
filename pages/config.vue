
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
                q_numSelect:10,
                debug: true,
            }

        },
        methods:{
            save()
            {
                this.$store.commit('question/setTotalQuizNum', this.q_numSelect);
                this.$store.commit('question/setDebug', this.debug);
                console.log("Set Quiz Number : "+ this.$store.getters['question/getQCount']);
                console.log("Set Debug : "+ this.$store.getters['question/getDebug']);
                this.$router.push("/");
            }
        }
    }
</script>