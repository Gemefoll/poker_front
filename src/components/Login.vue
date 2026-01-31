<script setup>
import { ref, getCurrentInstance } from 'vue'
import Cookies from 'js-cookie'
const { appContext } = getCurrentInstance()

const apiUrl = appContext.config.globalProperties.$apiUrl

const username = ref("")
const password = ref("")
const msg = ref("")
const state = ref(0)

function validateName() {
    return /^[!-~]{1,20}$/.test(username.value)
}

function validatePassword() {
    return /^[!-~]{6,20}$/.test(password.value)
}

async function sendRegistrationData() {
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
    try {
        const user = {
            Name: username.value,
            Pass: password.value
        }
        const res = await fetch(apiUrl + "/user/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(user)
        })
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json()
        Cookies.set('AccessToken', data.AccessToken, {expires: 30})
        Cookies.set('RefreshToken', data.RefreshToken, {expires: 30})
        console.log(Cookies.get('AccessToken'))
        console.log(Cookies.get('RefreshToken'))
        msg.value = "Success!"
        state.value = 2
    } catch (error) {
        console.error("Request failed:", error)
        msg.value = "You are dolbaeb, reason: " + error
    }
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
    <h1>Login</h1>
    <input v-model="username" placeholder="Type your name" />
    <br/>
    <br/>
    <input v-model="password" placeholder="Type you password" />
    <br/>
    <br/>
    <button @click="sendRegistrationData">Login</button>
    <h1 :class="{red:state==1, green:state==2}">{{ msg }}</h1>

</template>