<template>
    <v-container align-content="center">
        <v-row align-content="center" justify="center" class="align-center">
            <v-col >
                <v-row justify="center">
                    <p class="pose_name">{{PoseName}}</p>
                </v-row>
                <v-row justify="center">
                    <img :src="imgSrc" class="pose-img" />
                </v-row>
            </v-col>
        </v-row>
        <v-row justify="center">
            <p class="select-content">{{answer}}</p>
        </v-row>
    </v-container>
</template>

<style>
.pose-img{
    height: 450px;
    width: 450px;
    align-items: center;
}

.pose_name
{
    font-size: 30px;
    font-weight: bold;
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
            },
            PoseName :{
                type: String,
                default : "やばいポーズ",
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