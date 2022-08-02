<template>
    <img src="/kmlogo.png" class="km-logo"/>
</template>

<style>
.km-logo{
    height: 50%;
    width: 30%;
    transform: rotateY(720deg);
    animation: turn 5s ease-out forwards 1s;
}

@keyframes turn{
    100%{
        transform:rotateY(0deg);
    }
}
</style>