<template>
<v-container justify="center" align-content="center" fill-height>
    <v-row justify="center">
        <h1>Result</h1>
    </v-row>
    <v-row justify="center">
        <p class="content">{{this.getResultText}}</p>
    </v-row>
    <v-row justify="center">
        <p class="point">{{this.getScore}} points !!</p>
    </v-row>
    <v-row justify="center">
        <p class="content">Thank you for playing.</p>
    </v-row>
    <v-row justify="center">
        <v-btn color="primary" nuxt to="/" class="btn">Retry</v-btn>
    </v-row>
</v-container>
</template>

<style>
h1{
    font-size: 100pt;
    align-items: center;
}

.point{
    font-size: 80pt;
}

.content{
    font-size: 60pt;
}

.btn
{
    width: 1000px;
    height:200px;
}
</style>

<script>

export default({
    methods :{
        startConfetti(){
            this.$confetti.start();
        },
        stopConfetti()
        {
            this.$confetti.stop();
        }
    },

    computed :{
        getScore()
        {
            return this.$route.params.pass * 10;
        },

        getResultText()
        {
            if (this.$route.params.pass == 0)
            {
                return "Work hard!!";
            }
            else if (this.$route.params.pass < 5)
            {
                return "Nice try!!";
            }
            else if (this.$route.params.pass == 10)
            {
                return "Perfect!!";
            }
            else
            {
                return "Well done!!";
            }
        }
    }
})
</script>