<template>
    <v-container align-content="center">
        <p :class="changeCSS">{{count}}</p>
    </v-container>
</template>

<style>
.number_normal
{
    font-size: 70pt;
    font-weight: bold;
    color :black;
    text-shadow: 5px 10px 10px #808080;
}
.number_emergency
{
    font-size: 75pt;
    font-weight: bold;
    align-items: center;
    color:#E53935;
    text-shadow: 5px 10px 10px #808080;
    animation: turn .2s ease-out .2s;
}

@keyframes turn{
    100%{
        transform:scale(1.8);
    }

}
</style>

<script>
export default{
    props:{
        count : {
            type:Number,
            default : 10
        }
    },

    data:()=>{
        return{
            fontColor: "black",
        };
    },

    computed:{
        changeCSS()
        {
            if (this.count <= 5)
            {
                return "number_emergency";
            }
            else
            {
                return "number_normal";
            }
        }
    }
};
</script>