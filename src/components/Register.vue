<script setup>
import { ref } from 'vue'

const username = ref("")
const password = ref("")
const msg = ref("")
const state = ref(0)

function validateName() {
    return /[!-~]{1,20}/.test(username.value)
}

function validatePassword() {
    return /[!-~]{6,20}/.test(password.value)
}

function sendRegistrationData() {
    if (!validateName()) {
        msg.value = "You are dolbaeb, name is bad"
        state.value = 1
        return
    }
    if (!validatePassword()) {
        msg.value = "You are dolbaeb, pass is bad"
        state.value = 1
        return
    }
    const user = {
        Name: username.value,
        Pass: password.value
    }
    const userJson = JSON.stringify(user)
    msg.value = "You are good, " + userJson
    state.value = 2
}

</script>

<style>
.red {
  color: red;
}
.green {
  color: green;
}
</style>

<template>
    <h1>Register</h1>
    <input v-model="username" placeholder="Type your name" />
    <br/>
    <br/>
    <input v-model="password" placeholder="Type you password" />
    <br/>
    <br/>
    <button @click="sendRegistrationData">Register</button>
    <h1 :class="{red:state==1, green:state==2}">{{ msg }}</h1>

</template>