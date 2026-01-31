import Cookies from "js-cookie"

export async function getAccessToken(apiUrl) {
    var accessToken = Cookies.get("AccessToken")
    var refreshToken = Cookies.get("RefreshToken")
    if (!refreshToken) {
        return null
    }
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
        return accessToken
    } catch (error) {
        console.warn("Request failed:", error)
    }
    try {
        const res = await fetch(apiUrl + "/refresh", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + refreshToken,
            },
        })
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json()
        Cookies.set('AccessToken', data.AccessToken, {expires: 30})
        Cookies.set('RefreshToken', data.RefreshToken, {expires: 30})
        accessToken = Cookies.get("AccessToken")
        refreshToken = Cookies.get("RefreshToken")
    } catch (error) {
        console.warn("Request failed:", error)
        return null
    }
    return accessToken
}