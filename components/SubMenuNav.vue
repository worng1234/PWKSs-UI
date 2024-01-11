<template>
    <div>
        <div class="d-flex justify-content-center mg-t-nav" style="height: 100vh;">
            <div class="bg-sub-nav" id="box-shadow-nav" @click="clickOpenSubMenu(false)"></div>
            <div class="sub-main-box" id="box-menu-nav" align="center">
                <div class="box-main-sub-nav-menu">
                    <div class="box-profile-nav mt-3">
                        <img src="../assets/img/user-img/user-profile.png" alt="user" class="box-img-profile-nav">
                        <div class="mt-2 ms-4" align="left">
                            <h4 class="h4-pwks fw-500" style="margin-bottom: 0; padding-bottom: 1rem;">กิตติกรณ์ อรุณภพ</h4>

                            <p class="p-pwks" style="margin-bottom: 0; padding-bottom: 0; opacity: 0.5; margin-top: -10px;">
                                <span>
                                    <Icon name="clarity:group-solid" style="font-size: 1rem; margin-top: -2px;" />
                                </span>
                                ฝ่ายกิจการนักเรียน
                            </p>
                        </div>
                    </div>

                    <div class="divider-solid mt-3"></div>

                    <div class="grid-nav-sub-menu grid-column-sub-menu mt-2">
                        <div class="box-menu" v-for="menus in menu" style="margin-top: 8%;">
                            <div class="d-flex cursor-main" style="color: white; margin-top: 9%;"
                                @click="nextPage(menus.link)">
                                <Icon :name="menus.icon" style="font-size: 1.5rem;" class="ms-3" />
                                <h6 class="h5-pwks fw-500 ms-1 mt-1">{{ menus.menuName }}</h6>
                            </div>
                        </div>
                    </div>

                    <div class="divider-solid mt-5"></div>

                    <div class="d-flex justify-content-center mt-4 cursor-main" style="color: rgb(125, 52, 243)"
                        @click="logout()">
                        <Icon name="material-symbols:door-open-outline" style="font-size: 2rem;" class="ms-3" />
                        <h4 class="h3-pwks fw-500 ms-1">ออกจากระบบ</h4>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <Modal v-if="isModal" :closeModal="closeModal" :type="typeModal"/>
</template>

<script>
export default {
    setup() {


        return {}
    },
    props: {
        clickOpenSubMenu: {
            type: Function
        },
        clickCloseSubMenu: {
            type: Function
        },
        openSubMenu: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            menu: [
                { id: 1, menuName: 'หน้าหลัก', link: '/', icon: 'material-symbols:house' },
                { id: 2, menuName: 'เช็คชื่อ', link: '/attandance', icon: 'material-symbols:check-circle-rounded' },
                { id: 3, menuName: 'ตารางสอน', link: '/manageSchedule', icon: 'material-symbols:calendar-month' },
                { id: 4, menuName: 'ตารางรวม', link: '/scheduleAll', icon: 'mdi:wallet-outline' },
                { id: 5, menuName: 'ห้องเรียน', link: '/homeRoom', icon: 'material-symbols:school-rounded' },
                { id: 6, menuName: 'โปรไฟล์', link: '/profile', icon: 'material-symbols:settings-account-box' },
            ],
            isModal: false,
            typeModal: '',
        }
    },
    mounted() {

        if (this.openSubMenu === true) {
            this.tranformNavSlideOpen()

        } else if (this.openSubMenu === false) {
            this.tranformNavSlideClose()
        }
    },
    methods: {
        tranformNavSlideOpen() {
            let shadow = document.getElementById('box-shadow-nav')
            shadow.style.width = 'calc(100vw + 320px)'
            shadow.style.opacity = 0

            let menu = document.getElementById('box-menu-nav')
            menu.style.transform = 'translateX(0px)'
            menu.style.opacity = 0

            let pixel = 0
            let opacityShadow = 0
            let opacityMenu = 0

            let interval = setInterval(() => {

                shadow.style.transform = `translateX(-${pixel}px)`;
                shadow.style.opacity = opacityShadow

                menu.style.transform = `translateX(-${pixel}px)`
                menu.style.opacity = opacityMenu

                pixel += 32;
                opacityShadow += 0.05
                opacityMenu += 0.1

                if (pixel == 352) {
                    this.stopInterval(interval)
                }
            }, 10);
        },
        tranformNavSlideClose() {
            let shadow = document.getElementById('box-shadow-nav')
            shadow.style.width = 'calc(100vw + 320px)'
            shadow.style.opacity = 0

            let menu = document.getElementById('box-menu-nav')
            menu.style.transform = 'translateX(0px)'
            menu.style.opacity = 0

            let pixel = 360
            let opacityShadow = 0.5
            let opacityMenu = 1

            let interval = setInterval(() => {

                shadow.style.transform = `translateX(-${pixel}px)`;
                shadow.style.opacity = opacityShadow

                menu.style.transform = `translateX(-${pixel}px)`
                menu.style.opacity = opacityMenu

                pixel -= 32;
                opacityShadow -= 0.05
                opacityMenu -= 0.1

                if (pixel < 0) {
                    this.stopInterval(interval)
                }
            }, 10);
        },
        stopInterval(interval) {
            clearInterval(interval)
        },
        nextPage(link){
            this.gotoPage(link)
            this.clickCloseSubMenu()
        },

        logout(){
            this.isModal = true
            this.typeModal = 'loading'

            let logout = this.getStore().resetAuth()

            if(logout){
                this.isModal = false
                this.typeModal = ''

                setTimeout(() => {
                    // window.location.href = '/pwks-ui/login'
                    window.location.href = '/login'
                }, 500);
                
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
.mg-t-nav {
    margin-top: 50px;
}

.sub-main-box {
    background-color: white;
    width: 320px;
}

.bg-sub-nav {
    background-color: rgb(106, 106, 106);
    width: 100%;
    opacity: 0.5;

}

.box-main-sub-nav-menu {
    width: 300px;
}

.box-profile-nav {
    display: flex;
}

.box-img-profile-nav {
    width: 64px;
    height: 64px;
    border-radius: 50px;
    border: 3px solid var(--color-primary);
}

.divider-solid {
    height: 1px;
}

.grid-nav-sub-menu {
    display: grid;
    justify-items: center;
}

.grid-column-sub-menu {
    grid-template-columns: 1fr 1fr;
}

.box-menu {
    width: 130px;
    height: 50px;
    background-color: rgb(125, 52, 243);
    border-radius: 5px;
    box-shadow: 5px 5px 12px 0 rgb(175, 175, 175);
}

@media screen and (min-width: 320px) and (max-width: 589px) {
    .mg-t-nav {
        margin-top: 36px;
    }
}
</style>