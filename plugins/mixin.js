const globalMixin = {
    methods: {

        showAlert(title, type, position) {
            if (type == 'success') {
                useNuxtApp().$toast.success(title)
            }
            else if (type == 'warning') {
                useNuxtApp().$toast.warning(title)
            }
            else if (type == 'info') {
                useNuxtApp().$toast.info(title)
            }
            else if (type == 'error') {
                useNuxtApp().$toast.error(title)
            }

        },
        
        copyToClipboard(text) {
            navigator.clipboard.writeText(text)
            this.showAlert('คัดลอกสำเร็จ', 'success')
        },

        gotoPage(namePage = '/', query = {}){
            const router = useRouter()

            router.push({ path: namePage, query: {...query} })

        },

        formatNumberToLocal(num) {
            const number = parseFloat(num)
            const options = {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
            const formatted = Number(number).toLocaleString('en');

            return formatted
        },

    }
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.mixin(globalMixin)
})