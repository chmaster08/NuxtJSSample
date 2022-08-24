<template>
    <v-container>
        <v-row justify="space-between" fill-height>
            <v-col v-for="qs in Q_State" :key="qs">
                <v-card class="state_OK" :color="getColor(qs)">
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<style>

.state_OK{
    background: #81C784;
    height: 20px;
    min-width: 100px;
}

.state_NG{
    height: 20px;
    min-width: 100px;
    color : #e57373;
}

.state_NONE{
    height: 20px;
    min-width: 100px;
    color : #90A4AE;
}

</style>

<script>

export default{
    props:{
        Q_State :{
            type : [],
            default :[]
        }
    },

    methods:{
        getColor(judge)
        {
            if (judge == "OK")
            {
                return "#81C784";
            }
            else if (judge == "NG")
            {
                return "#E57373";
            }
            else
            {
                return "#90A4AE";
            }
        },
    },
}
</script>