<template>
    <div>
        <div class="nav-head nav-item">
            <div class="d-flex justify-content-center box-title-nav cursor-main" @click="gotoIndex()" >
                <Icon name="ic:sharp-display-settings" class="img-logo-pwks-nav" />
                <h2 class="f-nav fw-400" style="color: var(--color-school);">PWKSs</h2>
            </div>
            <div class="box-sub-nav-icon" v-if="this.getStore().setCheckLogin()" >
                <Icon name="material-symbols:menu" class="img-logo-pwks-nav" @click="clickOpenSubMenu(true)"
                    v-if="openSubMenu === false" />
                <Icon name="ic:sharp-close" class="img-logo-pwks-nav" @click="clickOpenSubMenu(false)"
                    v-else-if="openSubMenu === true" />
            </div>
        </div>
        <div style="position: fixed; z-index: 2; transform: translateX(-320px);" v-if="openSubMenu === true">
            <SubMenuNav :openSubMenu="openSubMenu" :clickOpenSubMenu="clickOpenSubMenu" :clickCloseSubMenu="clickCloseSubMenu"/>
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
            openSubMenu: false
        }
    },
    methods: {
        clickOpenSubMenu(click) {
            this.openSubMenu = click
        },
        clickCloseSubMenu(){
            this.openSubMenu = false
        },
        gotoIndex(){
            if(this.getStore().setCheckLogin()){
                this.gotoPage('/')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.nav-head {
    height: 50px;
    width: 100%;
    background-color: var(--color-white);
    box-shadow: 0 4px 12px 0 rgba(1, 27, 42, .14);
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
}

.nav-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-title-nav {
    margin-left: 2rem;
}

.box-sub-nav-icon {
    margin-right: 2rem;
}

.f-nav {
    margin-top: 0.4rem;
}

.img-logo-pwks-nav {
    font-size: 32px;
    margin-top: 8%;
    color: var(--color-school);
}

@media screen and (min-width: 320px) and (max-width: 360px) {

    .nav-head {
        height: 36px;
    }

    .box-title-nav {
        margin-left: 1rem;
    }

    .box-sub-nav-icon {
        margin-right: 1rem;
    }

    .f-nav {
        font-size: 1.2rem;
    }

    .img-logo-pwks-nav {
        font-size: 1.3rem;
        margin-top: 11%;
        color: var(--color-school);
    }
}

@media screen and (min-width: 360px) and (max-width: 375px) {

    .nav-head {
        height: 36px;
    }

    .box-title-nav {
        margin-left: 1rem;
    }

    .box-sub-nav-icon {
        margin-right: 1rem;
    }

    .f-nav {
        font-size: 1.2rem;
    }

    .img-logo-pwks-nav {
        font-size: 1.3rem;
        margin-top: 11%;
        color: var(--color-school);
    }
}

@media screen and (min-width: 375px) and (max-width: 390px) {

    .nav-head {
        height: 36px;
    }

    .box-title-nav {
        margin-left: 1rem;
    }

    .box-sub-nav-icon {
        margin-right: 1rem;
    }

    .f-nav {
        font-size: 1.2rem;
    }

    .img-logo-pwks-nav {
        font-size: 1.3rem;
        margin-top: 11%;
        color: var(--color-school);
    }
}

@media screen and (min-width: 390px) and (max-width: 420px) {

    .nav-head {
        height: 36px;
    }

    .box-title-nav {
        margin-left: 1rem;
    }

    .box-sub-nav-icon {
        margin-right: 1rem;
    }

    .f-nav {
        font-size: 1.2rem;
    }

    .img-logo-pwks-nav {
        font-size: 1.3rem;
        margin-top: 11%;
        color: var(--color-school);
    }
}

@media screen and (min-width: 420px) and (max-width: 490px) {

    .nav-head {
        height: 36px;
    }

    .box-title-nav {
        margin-left: 1rem;
    }

    .box-sub-nav-icon {
        margin-right: 1rem;
    }

    .f-nav {
        font-size: 1.2rem;
    }

    .img-logo-pwks-nav {
        font-size: 1.3rem;
        margin-top: 11%;
        color: var(--color-school);
    }
}

@media screen and (min-width: 490px) and (max-width: 589px) {

.nav-head {
    height: 36px;
}

.box-title-nav {
    margin-left: 1rem;
}

.box-sub-nav-icon {
    margin-right: 1rem;
}

.f-nav {
    font-size: 1.2rem;
}

.img-logo-pwks-nav {
    font-size: 1.3rem;
    margin-top: 11%;
    color: var(--color-school);
}
}
</style>