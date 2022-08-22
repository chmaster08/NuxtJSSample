<template>
    <v-container>
        <p :class="changeCSS">{{count}}</p>
    </v-container>
</template>

<style>
.number_normal
{
    font-size: 50pt;
    font-weight: bold;
    color :black;
}
.number_emergency
{
    font-size: 50pt;
    font-weight: bold;
    color:firebrick;
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

    data:{
        fontColor : "black",
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