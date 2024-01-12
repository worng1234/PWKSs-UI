<template>
    <div align="center">
        <div class="block-main">
            <div class="block-bg-main">
                    

                    <div class="p-3" >
                        <h3>{{ textHeadAttend }}</h3>
                        <h5>{{ dateTextHead }}</h5>
                        <button class="btn btn-secondary mt-2" @click="this.gotoPage('/')">ย้อนกลับ</button>
                    </div>
                

                <div class="p-3 mt-1">
                    <table class="table" align="center">
                        <thead class="fs-head" align="center">
                            <tr>
                                <th scope="col" class="th-color-main fm-kanit fw-500" style="border-radius: 8px 0 0 0;">
                                    ลำดับ</th>
                                <th scope="col" class="th-color-main fm-kanit fw-500" v-if="this.getStore().setCheckLogin()">เลขที่</th>
                                <th scope="col" class="th-color-main fm-kanit fw-500" style="text-align: left;" >ชื่อ - นามสกุล</th>
                                <th scope="col" class="th-color-main fm-kanit fw-500" style="border-radius: 0 8px 0 0;">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody align="center" v-for="(data, index) in dataAttend">
                            <tr>
                                <td class="fw-500">{{ index+1 }}</td>
                                <td class="fw-500" v-if="this.getStore().setCheckLogin()">{{ data.studentCode }}</td>
                                <td class="fw-500" align="left">{{ `${data.firstName + index} ${data.lastName + index}` }}</td>
                                <td class="fw-500" style="color: var(--color-success);" v-if="data.status == 1">มาเรียน</td>
                                <td class="fw-500" style="color: var(--color-danger);" v-else-if="data.status == 2">ขาด</td>
                                <td class="fw-500" style="color: var(--color-warning-op);" v-else-if="data.status == 3">ลา</td>
                            </tr>
                        </tbody>
                    </table>
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
            textHeadAttend: '',
            dateTextHead: '',
            arrayMonth: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
            dataAttend: [
                {
                    studentCode: 10114,
                    firstName: 'ทดสอบ',
                    lastName: 'ทดสอบ',
                    status: 1
                },
                {
                    studentCode: 10114,
                    firstName: 'ทดสอบ',
                    lastName: 'ทดสอบ',
                    status: 1
                },
                {
                    studentCode: 10114,
                    firstName: 'ทดสอบ',
                    lastName: 'ทดสอบ',
                    status: 2
                },
                {
                    studentCode: 10114,
                    firstName: 'ทดสอบ',
                    lastName: 'ทดสอบ',
                    status: 2
                },
                {
                    studentCode: 10114,
                    firstName: 'ทดสอบ',
                    lastName: 'ทดสอบ',
                    status: 1
                },
                {
                    studentCode: 10114,
                    firstName: 'ทดสอบ',
                    lastName: 'ทดสอบ',
                    status: 1
                },
                {
                    studentCode: 10114,
                    firstName: 'ทดสอบ',
                    lastName: 'ทดสอบ',
                    status: 3
                },
                {
                    studentCode: 10114,
                    firstName: 'ทดสอบ',
                    lastName: 'ทดสอบ',
                    status: 3
                },
                {
                    studentCode: 10114,
                    firstName: 'ทดสอบ',
                    lastName: 'ทดสอบ',
                    status: 1
                },
            ]
        }
    },
    mounted() {
        this.manageTextHead()
    },
    methods: {
        manageTextHead() {
            let query = this.$route.query

            if (query.class == 'vc') {
                this.textHeadAttend = `ประกาศนียบัตรวิชาชีพ ปี ${query.room}`
            } else {
                this.textHeadAttend = `มัธยมศึกษาปีที่ ${query.class} ห้อง ${query.room}`
            }

            let date = query.date.split('/')
            this.dateTextHead = `วันที่ ${date[0]} เดือน${this.arrayMonth[parseInt(date[1])]} ปี ${date[2]}`
        }
    },
}
</script>

<style lang="scss" scoped>
    .j-space{
        justify-content: space-between;
    }
</style>