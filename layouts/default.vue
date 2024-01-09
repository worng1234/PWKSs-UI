<template>
    <div>
        <Head>
            <Title>PWKs SYSTEM</Title>
        </Head>

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

    data() {
        return {

        }
    },

    mounted() {
        let bootstrab = document.createElement("script");
        bootstrab.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js');
    },
}
</script>

<style lang="scss" scoped>
.mg-t-body {
    padding-top: 50px;
}
</style>