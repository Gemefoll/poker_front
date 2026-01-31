<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { getAccessToken } from '@/utils/refresh'
import Cookies from 'js-cookie'
const { appContext } = getCurrentInstance()
const apiUrl = appContext.config.globalProperties.$apiUrl

const name = ref("Unathorized")
const authorized = ref('false')

onMounted(async () => {
    const accessToken = await getAccessToken(apiUrl)
    if (accessToken) {
        try {
            const res = await fetch(apiUrl + "/user/me", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + accessToken,
                },
            })
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json()
            name.value = data.Name
            authorized.value = true
        } catch (error) {
            console.error("Request failed:", error)
            return
        }
    }
})

</script>

<style>
</style>

<template>
    <h1>Profile</h1>
    <h1>{{ name }}</h1>
</template>