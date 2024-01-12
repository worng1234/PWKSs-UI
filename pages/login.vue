<template>
    <div>
        <div align="center">
            <div class="block-main">
                <div class="box-login">
                    <h3 class="p-h-login">PWKs SYSTEM</h3>

                    <div class="p-4">
                        <form>
                            <div class="mb-4" align="left">
                                <label for="username" class="form-label">ชื่อผู้ใช้</label>
                                <input type="text" class="form-control" id="username" v-model="username">
                                <label class="mt-2" style="color: var(--color-danger);" v-if="check.username">กรุณากรอกชื่อผู้ใช้</label>
                            </div>
                            <div class="mb-3" align="left">
                                <label for="password" class="form-label">รหัสผ่าน</label>
                                <div class="input-group">
                                    <input :type="!openEye ? 'password': 'text' " class="form-control" id="password" v-model="password">
                                    <span class="input-group-text" id="basic-addon2">
                                        <Icon name="mdi:eye-closed" class="eye-icon cursor-main"  @click="checkPassword()" v-if="!openEye"/>
                                        <Icon name="mdi:eye-outline" class="eye-icon cursor-main"  @click="checkPassword()" v-else-if="openEye"/>
                                    </span>
                                </div>
                                <label class="mt-2" style="color: var(--color-danger);" v-if="check.password">กรุณากรอกรหัสผ่าน</label>
                            </div>
                            <button type="button" class="btn btn-main mt-3" @click="login()">เข้าสู่ระบบ</button>
                            <button class="btn btn-secondary ms-3 mt-3" @click="this.gotoPage('/')">ย้อนกลับ</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal v-if="isModal" :closeModal="closeModal" :type="typeModal"/>
</template>

<script>
import callApi from '../api/callApi'

export default {
    setup() {


        return {}
    },

    data() {
        return {
            isModal: false,
            typeModal: '',
            openEye: false,
            username: '',
            password: '',
            check:{
                username: false,
                password: false
            }
        }
    },

    mounted() {

    },

    methods: {
        async login () {
            if(this.username == ""){
                this.check.username = true
            }

            if(this.password == ""){
                this.check.password = true
            }

            if(!this.check.username && !this.check.password){
                this.typeModal = 'loading'
                this.isModal = true

                let data = {
                    username: this.username,
                    password: this. password
                }

                await callApi.login(data).then( res => {
                    if(res.code == 0){
                        this.getStore().setAuth(res.result)
                        this.getStore().setCheckLogin(true)
                        setTimeout(() => {
                            this.isModal = false
                            window.location.href = this.$config.public.baseURL
                        },1000)
                        
                    }else{
                        this.typeModal = ''
                        this.isModal = false

                        setTimeout(() => {
                            this.isModal = true
                            this.typeModal = 'warning-login'
                        }, 500);
                    }
                }).catch( err => {
                    this.closeModal()

                    setTimeout(() => {
                        this.isModal = true
                        this.typeModal = 'error-login'
                    }, 500);
                })
            }
        },

        checkPassword(){
            if(!this.openEye){
                this.openEye = true
            }else{
                this.openEye = false
            }
        },

        closeModal() {
            this.isModal = false
            this.typeModal = ''
        }
    },
}
</script>

<style lang="scss" scoped>
.box-login {
    width: 400px;
    background-color: white;
    border-radius: 10px;
}

.p-h-login {
    padding-top: 1rem;
}

.eye-icon{
    font-size: 1.5rem;
    color: #818181;
}
</style>