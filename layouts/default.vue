<template>
    <div>
        <NavBarHeader />
        <main class="main mg-t-body">
            <slot />
        </main>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
.mg-t-body {
    padding-top: 50px;
}
</style>