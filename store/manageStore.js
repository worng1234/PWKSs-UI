import { useLocalStorage } from '@vueuse/core'

const optionsState = {
    auth: {
        username: null,
        first_name: null,
        last_name: null,
        role: null,
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

    resetAuth(){
        state.value.main.auth = {
            username: null,
            first_name: null,
            last_name: null,
            roll: null,
        }

        state.value.main.checkLogin = false

        return true
    },

    setCheckLogin(payload) {
        if(payload !== undefined){
            state.value.main.checkLogin = payload
        }

        return state.value.main.checkLogin
    },
}