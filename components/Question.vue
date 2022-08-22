<template>
    <v-container justify="center" align-content="center">
        <v-row justify="space-between">
        <v-col>
            <v-row>
                <p class="q_number">{{Get_Q_Num_Disp}}</p>
            </v-row>
            <v-row>
                <p class="q_content">{{Q_Content}}</p>
            </v-row>
        </v-col>
        <v-col cols="1" justify="center" align-content="center">
            <CountDown :count=this.Q_CountDown />
        </v-col>

        </v-row>
    </v-container>
</template>

<style>
.q_number
{
    font-size: 20pt;
    font-weight: bold;
}

.q_content
{
    font-size: 30pt;
    font-weight: bold;
    margin-left: 30px;
}
.q_countdown
{
    font-size:  40pt;
    font-weight: bold;
}
</style>

<script>
import CountDown from './CountDown.vue';
export default{

    data:{

    },
    props: {
        Q_Num: {
            type: Number,
            default: 1,
        },
        Q_Content: {
            type: String,
            default: "This is Question Display Component. Can you see me?"
        },
        Q_CountDown:{
            type : Number,
            default : 10,
        }

    },
    computed: {
        Get_Q_Num_Disp() {
            return "Q." + this.Q_Num;
        }
    },
    components: { CountDown },
}
</script>
