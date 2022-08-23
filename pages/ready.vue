<template>
<v-container justify="center" fill-height>
    <p class="ready mx-auto">{{count}}</p>
</v-container>
</template>

<style>
.ready{
    font-size: 100pt;
    align-items: center;
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
        this.intervalID = setInterval(()=>{this.count --},1000);
    },
    watch:{
        count : function(v)
        {
            if (v == 0)
            {
                this.$router.push('/QuizPage');
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.intervalID);
    },
})
</script>