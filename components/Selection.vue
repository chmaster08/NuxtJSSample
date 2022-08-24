<template>
    <v-container fill-height align-content="center">
        <v-row align-content="center" justify="center" class="align-center">
            <v-col align-content="center" justify="center">
                <img :src="imgSrc"  class="pose-img"/>
            </v-col>
            <v-col>
                <p class="select-content">{{answer}}</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
.pose-img{
    height: 350px;
    max-width: 350px;
    align-items: center;
}

.select-content
{
    font-size: 30pt;
    font-weight: bold;
}
</style>

<script>
    export default{
        props:{
            answer :{
                type : String,
                default: "No Answer Data"
            },
            PoseNum:{
                type : Number,
                default : 0
            }
        },
        computed :{
            imgSrc()
            {
                return require("../static/yoga_pose_"+this.PoseNum+".png")
            },
        }
    };
</script>