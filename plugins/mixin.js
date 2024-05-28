import { store } from '~/store/manageStore'

const globalMixin = {
    setup() {
        const swal = getCurrentInstance().appContext.config.globalProperties;
        return {swal}
    },
    methods: {
        getStore() {
            return store
        },
        
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

        alertModal(type, title, content){
            let color = ''

            if(type == 'success'){
                color = '#338309'

            }else if (type == 'warning'){
                color = '#fbce02'

            } else if (type == 'error'){
                color = '#bc0000'
                
            }

            this.swal.$swal.fire({
                icon: type,
                title: title,
                text: content,
                confirmButtonText: 'ปิด',
                confirmButtonColor: color,
            }).then( res => {
                if(res && type == 'success'){
                    window.location.reload()
                }
            })
        }

    }
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.mixin(globalMixin)
})