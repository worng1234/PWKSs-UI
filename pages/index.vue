<template>
    <div>
        <div align="center">
            <div class="block-main">
                <div class="block-bg-main">
                    <div class="m-date" align="left">
                        <h3 class="fw-500">วันที่ {{ dateDashboard.date }} เดือน{{ arrayMonth[dateDashboard.month] }} ปี {{
                            dateDashboard.year }}</h3>
                    </div>

                    <div class="row p-3">
                        <div class="col-lg-3 col-md-6 col-sm-12" v-for="totle in cardDetailCountStudent">
                            <div class="card-detail-student-count" :style="`background-color: var(${totle.color});`">
                                <div>
                                    <h5 class="fw-500 ms-2" style="padding-top: 0.5rem;">{{ totle.text }}</h5>
                                </div>
                                <div>
                                    <h4 class="fw-500" style="padding-bottom: 0.5rem;">{{
                                        this.formatNumberToLocal(totle.count) }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="divider-solid mt-3 mb-3" style="height: 2px; width: 95%;"></div>

                    <div class="row p-3">
                        <div class="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <VueDatePicker v-model="startDateDetail" :format-locale="langFormat" :format="format"
                                :preview-format="format" :enable-time-picker="false" @update:model-value="getDetailAff">
                                <template #input-icon>

                                </template>
                                <template #clear-icon="{ clear }">
                                    <Icon name="material-symbols:calendar-today-outline-rounded"
                                        class="dp__icon dp__clear_icon dp__input_icons" />
                                </template>
                            </VueDatePicker>
                        </div>

                        <div class="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <select class="form-select fm-kanit" aria-label="Default select example" v-model="classSearch"
                                @change="vcCheck()">
                                <option value="0">เลือกชั้นเรียนทั้งหมด</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="vc">ปวช.</option>
                            </select>
                        </div>

                        <div class="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <select class="form-select fm-kanit" aria-label="Default select example" v-model="roomSearch">
                                <option value="0">{{ roomText }}</option>
                                <option :value="room" v-for="room in roomArray">{{ room }}</option>
                            </select>
                        </div>

                    </div>

                    <div class="p-table-dashboard mt-1">
                        <table class="table table-striped" align="center">
                            <thead class="fs-head" align="center">
                                <tr>
                                    <th scope="col" class="th-color-main fm-kanit fw-500" style="border-radius: 8px 0 0 0;">
                                        ชั้นเรียน/ห้องเรียน</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500">นักเรียนทั้งหมด</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500">มาเรียน</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500">ขาด</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500">
                                        ลา</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500" style="border-radius: 0 8px 0 0;">
                                        ดูข้อมูล</th>
                                </tr>
                            </thead>
                            <tbody align="center" >
                                <tr v-for="dashboard in dataDashBoard">
                                    <td class="fm-kanit fw-500" v-if="dashboard.class != 'vc'">{{ `${dashboard.class}/${dashboard.room}` }}</td>
                                    <td class="fm-kanit fw-500" v-else >{{ `ปวช. ${dashboard.room}` }}</td>
                                    <td class="fm-kanit fw-500">{{ dashboard.student }}</td>
                                    <td class="fm-kanit fw-500" style="color: var(--color-success);">{{ dashboard.attend }}</td>
                                    <td class="fm-kanit fw-500" style="color: var(--color-danger);">{{ dashboard.disable }}</td>
                                    <td class="fm-kanit fw-500" style="color: var(--color-warning-op);">{{ dashboard.leave }}</td>
                                    <td class="fm-kanit fw-500">
                                        <button class="btn btn-main" style="padding: 1px 10px !important;" @click="gotoReportAttendDetail(dashboard)">
                                            <Icon name="fluent:document-search-24-filled" style="padding: 0 0; margin: 0 0; font-size: 1.5rem;" class="fm-kanit"/>
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
import { ref } from 'vue';
import th from 'date-fns/locale/th'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    components: { VueDatePicker },
    setup() {
        let monthThai = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']

        const format = (date) => {
            const day = date.getDate();
            const month = monthThai[date.getMonth()];
            const year = date.getFullYear();

            return `${day} ${month} ${year}`;
        }

        const DateNow = (type) => {
            if (type == 'start') {
                return ref({
                    // day: new Date().getDate(),
                    month: new Date().getMonth(),
                    year: new Date().getFullYear()
                });

            } else {
                return ref({
                    // day: new Date().getDate(),
                    month: new Date().getMonth(),
                    year: new Date().getFullYear()
                });
            }

        }

        const monthAffAll = DateNow();
        const startDateDetail = new Date()
        const startDateMember = new Date()
        const startDateTransaction = new Date()

        const endDateDetail = new Date()
        const endDateMember = new Date()
        const endDateTransaction = new Date()

        return { monthAffAll, startDateDetail, startDateMember, startDateTransaction, endDateDetail, endDateMember, endDateTransaction, format }
    },
    data() {
        return {
            dateDashboard: {
                date: 0,
                month: 0,
                year: 0
            },
            arrayMonth: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
            cardDetailCountStudent: [
                {
                    id: 1,
                    name: 'totalStudentAll',
                    text: 'จำนวนนักเรียนทั้งหมด',
                    count: 1020,
                    color: '--color-school'
                },
                {
                    id: 2,
                    name: 'totalStudentLearned',
                    text: 'จำนวนนักเรียนมาเรียน',
                    count: 980,
                    color: '--color-success'
                },
                {
                    id: 3,
                    name: 'totalStudentLeave',
                    text: 'จำนวนนักเรียนลา',
                    count: 20,
                    color: '--color-warning-op'
                },
                {
                    id: 4,
                    name: 'totalStudentDisable',
                    text: 'จำนวนนักเรียนขาด',
                    count: 20,
                    color: '--color-danger'
                },
            ],
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
            langFormat: '',
            roomArray: [1, 2, 3, 4, 5, 6],
            roomText: 'เลือกห้องเรียนทั้งหมด',
            classSearch: 0,
            roomSearch: 0
        }
    },
    mounted() {
        this.langFormat = th;
        this.getDateDashboard()
    },
    methods: {
        getDateDashboard() {
            let date = new Date()

            this.dateDashboard.date = date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate()
            this.dateDashboard.month = date.getUTCMonth()
            this.dateDashboard.year = date.getFullYear() + 543
        },
        vcCheck() {
            if (this.classSearch == 'vc') {
                this.roomArray = [1, 2, 3]
                this.roomText = 'เลือกห้องชั้นปีทั้งหมด'
            } else {
                this.roomArray = [1, 2, 3, 4, 5, 6]
                this.roomText = 'เลือกห้องเรียนทั้งหมด'
            }
        },
        gotoReportAttendDetail(detail){
            let attend = {
                date: '20/8/2566',
                class: detail.class,
                room: detail.room
            }
            this.gotoPage('/report/reportAttendDetail', {...attend})
        },
    },
}
</script>

<style lang="scss" scoped>
.m-date {
    margin-left: 1rem;
    padding: 2rem 0 1rem 0;
}

.card-detail-student-count {
    border-radius: 8px;
    color: var(--color-white);
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