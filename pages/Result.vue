<template>
<v-container justify="center" align-content="center" fill-height>
    <v-row justify="center">
        <h1>Result</h1>
    </v-row>
    <v-row justify="center">
        <p class="content">{{this.resulttext}}</p>
    </v-row>
    <v-row justify="center">
        <p class="point">{{$route.params.score}}</p>
        <p class="point_latter">points!!</p>
    </v-row>
    <v-row justify="center" v-if="this.startUpload">
        <p class="uploadInfo">{{this.uploadInfo}}</p>
    </v-row>
    <v-row justify="center">
        <p class="content">Thank you for playing.</p>
    </v-row>
    <v-row justify="center">
        <v-btn color="primary" @click="this.BacktoIndex" class="btn">Retry</v-btn>
    </v-row>
</v-container>
</template>

<style>

h1{
    font-size: 100pt;
    align-items: center;
}

.point{
    font-size: 90pt;
    font-weight: bold;
}
.point_latter
{
    font-size: 70pt;
    padding-left: 20px;
    padding-top: 20px;
}

.content{
    font-size: 60pt;
}

.uploadInfo{
    font-size: 40pt;
}

.btn
{
    width: 500px;
    height:500px;
}
</style>

<script>
import Vue from 'vue'
import VueConfetti from 'vue-confetti'

Vue.use(VueConfetti)

export default({
    data : ()=>{

        return{
            startUpload : false,
            score:0,
            uploadInfo : "Uploading result data....",
            imgURL:"",
            resulttext:"Nice Try!!",
        };
    },
    methods :{
        startConfetti:function(){
            this.$confetti.start({particles:[{dropRate:5}]});
            setTimeout(()=>this.stopConfetti(),3000);
        },
        stopConfetti: function()
        {
            this.$confetti.stop();
        },
        UploadImage:async function () {
            var extendtext = this.$store.getters['question/getImgName']+ "_" + this.$store.getters['question/getScore'];
            var url = this.$config.uploadImageURL + extendtext;
            console.log(url);
            await this.$axios.get(url, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
                timeout:4000,
            })
                .then((response) => {
                    this.uploadInfo = "Result data has been uploaded successfully."
                })
                .catch((error) => {
                    if (error.response) {
                        this.error_message =
                            error.response.data.body.error_type +
                            ": " +
                            error.response.data.body.error_message;
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.statusText);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        this.error_message = "Error: no response from server";
                        console.log(error.request);
                    } else {
                        this.error_message = "Error: something went wrong";
                        console.log("Error", error.message);
                    };
                    this.uploadInfo = "Failed to upload result data."
                });
        },

        BacktoIndex :function()
        {
            this.$store.commit('question/clearData');
            this.$router.push("/");
        },

        UploadImageClick :async function()
        {
            var image = this.$store.getters['question/getScore'];
            if (image.length > 0)
            {
                this.startUpload = true;
                await this.UploadImage();
            }
            else
            {
                console.log("upload is canceled because no image data");
            }
        }


    },

    created(){

        this.startConfetti();
        this.UploadImageClick();

    },

    computed :{
        getScore()
        {
            this.score = this.$route.params.body.score;
            this.imgURL = this.$route.params.body.imgName;
            return this.$route.params.body.score;
        },

        getResultText: function()
        {
            if (this.$route.body.score == 0)
            {
                return "Work hard!!";
            }
            else if (this.$route.body.score < 50)
            {
                return "Nice try!!";
            }
            else if (this.$route.body.score == 100)
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