<template>
    <img :src="this.imgSrc" class="pose_picture" />
</template>

<style>
.pose_picture{
    height: 500px;
    max-width: 400px;
}
</style>

<script>
export default{
    props:{
        imgSrc : undefined
    }
}
</script>