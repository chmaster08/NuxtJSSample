<template>
    <v-container justify="center" >
        <v-row>
            <p class="ready ml-auto mr-auto">{{count}}</p>
        </v-row>
        <v-row justify="center">
            <img src="@/assets/guide.png" class="guide"/>
        </v-row>
    </v-container>
</template>

<style>
.ready{
    font-size: 100pt;
}
.guide{
    margin-top: -50px;
}

</style>

<script>
export default ({
    data:() => {
        return {
            count : 3,
            intervalID : undefined,
        };
    },

    created() {
        this.intervalID = setInterval(()=>{
            this.count --;
            },1500);
    },
    watch:{
        count : function(v)
        {
            if (v == 0)
            {
                clearInterval(this.intervalID);
                this.$router.push('/QuizPage');
            }
        }
    },
})
</script>