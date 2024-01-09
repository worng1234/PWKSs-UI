<template>
    <div>
        <div align="center">
            <div class="block-main">
                <div class="box-login">
                    <h3 class="p-h-login">PWKs SYSTEM</h3>

                    <div class="p-3">
                        <form>
                            <div class="mb-4" align="left">
                                <label for="username" class="form-label">ชื่อผู้ใช้</label>
                                <input type="text" class="form-control" id="username" >
                            </div>
                            <div class="mb-3" align="left">
                                <label for="password" class="form-label">รหัสผ่าน</label>
                                <div class="input-group mb-3">
                                    <input :type="!openEye ? 'password': 'text' " class="form-control" id="password" >
                                    <span class="input-group-text" id="basic-addon2">
                                        <Icon name="material-symbols:visibility-outline" class="eye-icon cursor-main"  @click="checkPassword()"/>
                                    </span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-main mt-3">เข้าสู่ระบบ</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    },

    data() {
        return {
            openEye: false
        }
    },

    methods: {
        checkPassword(){
            if(!this.openEye){
                this.openEye = true
            }else{
                this.openEye = false
            }
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