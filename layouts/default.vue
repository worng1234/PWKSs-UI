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
    },
    mounted() {
        let bootstrab = document.createElement("script");
        bootstrab.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js');
        document.body.appendChild(bootstrab);
    },
}
</script>

<style lang="scss" scoped>
.mg-t-body {
    padding-top: 50px;
}
</style>