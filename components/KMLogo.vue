<template>
    <img src="~/assets/kmlogo.png" class="km-logo"/>
</template>

<style>
.km-logo{
    max-width: 300px;
    height: auto;
    transform: rotateY(720deg);
    animation: turn 5s ease-out forwards 1s;
}

@keyframes turn{
    100%{
        transform:rotateY(0deg);
    }
}
</style>