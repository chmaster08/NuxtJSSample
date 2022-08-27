<template>
    <v-container justify="center" fill-height align-content="center">
        <transition>
            <p class="ready ml-auto mr-auto">{{count}}</p>
        </transition>
    </v-container>
</template>

<style>
.ready{
    font-size: 100pt;
    padding-top: 120px;
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