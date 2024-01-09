<template>
    <div align="center">
        <div class="block-main">
            <div class="block-bg-main">
                <div class="block-report-schedule-all">
                    <div class="mt-3 mb-3">
                        <h3>ตารางสอนของระดับชั้น</h3>
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

        }
    },
}
</script>

<style lang="scss" scoped>
.block-report-schedule-all {
    padding: 0.25rem 3rem;
}
</style>