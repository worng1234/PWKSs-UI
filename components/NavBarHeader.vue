<template>
    <div>
        <div class="nav-head nav-item">
            <div class="d-flex justify-content-center ms-5 mt-1">
                <Icon name="ic:sharp-display-settings" class="img-logo-pwks-nav"/>
                <h2 class="fw-400 ms-2 mt-2" style="color: var(--color-school);">PWKSs</h2>
            </div>
            <div class="me-5">
                <Icon name="material-symbols:menu" class="img-logo-pwks-nav" @click="clickOpenSubMenu(true)" v-if="openSubMenu === false"/>
                <Icon name="ic:sharp-close" class="img-logo-pwks-nav" @click="clickOpenSubMenu(false)" v-else-if="openSubMenu === true"/>
            </div>
        </div>
        <div style="position: fixed; z-index: 2; transform: translateX(-320px);" v-if="openSubMenu === true">
            <SubMenuNav :openSubMenu="openSubMenu" :clickOpenSubMenu="clickOpenSubMenu"/>
        </div>
        
    </div>
</template>

<script>
export default {
    setup () {
        

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

.nav-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.img-logo-pwks-nav{
    font-size: 32px;
    margin-top: 8%;
    color: var(--color-school);
}
</style>