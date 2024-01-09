<template>
    <div align="center">
        <div class="block-main">
            <div class="block-bg-main">
                <div class="block-schedule-all">
                    <div class="mt-3 mb-3">
                        <h3>ตารางเรียนรวม</h3>
                    </div>

                    <div class="p-table-dashboard mt-1">
                        <table class="table table-striped" align="center">
                            <thead class="fs-head" align="center">
                                <tr>
                                    <th scope="col" class="th-color-main fm-kanit fw-500" style="border-radius: 8px 0 0 0;">
                                        ชั้นเรียน/ห้องเรียน</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500">นักเรียนทั้งหมด</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500" style="border-radius: 0 8px 0 0;">
                                        ดูข้อมูล</th>
                                </tr>
                            </thead>
                            <tbody align="center">
                                <tr v-for="dashboard in dataDashBoard">
                                    <td class="fm-kanit fw-500" v-if="dashboard.class != 'vc'">{{
                                        `${dashboard.class}/${dashboard.room}` }}</td>
                                    <td class="fm-kanit fw-500" v-else>{{ `ปวช. ${dashboard.room}` }}</td>
                                    <td class="fm-kanit fw-500">{{ dashboard.student }}</td>
                                    <td class="fm-kanit fw-500">
                                        <button class="btn btn-main" style="padding: 1px 10px !important;"
                                        @click="gotoReportScheduleAll()">
                                            <Icon name="fluent:document-search-24-filled"
                                                style="padding: 0 0; margin: 0 0; font-size: 1.5rem;" class="fm-kanit" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
            dataDashBoard: [
                {
                    id: 1,
                    class: 1,
                    room: 2,
                    student: 30,
                    attend: 0,
                    disable: 0,
                    leave: 0
                },
                {
                    id: 2,
                    class: 3,
                    room: 6,
                    student: 39,
                    attend: 30,
                    disable: 9,
                    leave: 0
                },
                {
                    id: 3,
                    class: 4,
                    room: 5,
                    student: 27,
                    attend: 27,
                    disable: 0,
                    leave: 0
                },
                {
                    id: 4,
                    class: 5,
                    room: 2,
                    student: 41,
                    attend: 40,
                    disable: 0,
                    leave: 1
                },
                {
                    id: 5,
                    class: "vc",
                    room: 2,
                    student: 37,
                    attend: 30,
                    disable: 3,
                    leave: 4
                },
            ],
        }
    },
    methods: {
        async gotoReportScheduleAll ()  {
            this.gotoPage('/report/reportScheduleAll')
        }
    },
}
</script>

<style lang="scss" scoped>
.block-schedule-all {
    padding: 0.25rem 3rem;
}

.p-table-dashboard{
    padding: 1rem;
}

@media screen and (min-width: 320px) and (max-width: 360px) {
    .p-table-dashboard{
        padding: 0.25rem;
    }
}
</style>