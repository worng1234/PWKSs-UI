import { useLocalStorage } from '@vueuse/core'

const optionsState = {
    auth: {
        access_token: null,
        profile: null,
        role: null,
        group: null
    },
    checkLogin: false

}

const state = useLocalStorage('PWKSs', { main: optionsState })

export const store = {
    setAuth(payload) {
        if(payload !== undefined){
            state.value.main.auth = payload
        }

        return state.value.main.auth
    },

    setCheckLogin(payload) {
        if(payload !== undefined){
            state.value.main.checkLogin = payload
        }

        return state.value.main.checkLogin
    },
}