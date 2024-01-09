<template>
    <div align="center">
        <div class="block-main">
            <div class="block-bg-main">
                <div class="p-table-schedule">
                    <div class="mt-3 mb-3">
                        <h3>จัดการตารางสอน ปีการศึกษา 1/2566</h3>
                    </div>
                    <div class="mb-3" align="left">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="schedule-table">
                                    <table class="bg-white">
                                        <thead>
                                            <tr class="period-subject">
                                                <th style="border-radius: 8px 0 0 0;">คาบ</th>
                                                <th>1</th>
                                                <th>2</th>
                                                <th>3</th>
                                                <th>4</th>
                                                <th>5</th>
                                                <th>6</th>
                                                <th>7</th>
                                                <th>8</th>
                                                <th class="last" style="border-radius: 0 8px 0 0;">9</th>
                                            </tr>
                                            <tr class="time-subject">
                                                <th>เวลา</th>
                                                <th>08.40-09.30</th>
                                                <th>09.30-10.20</th>
                                                <th>10.20-11.10</th>
                                                <th>11.10-12.00</th>
                                                <th>12.00-13.00</th>
                                                <th>13.00-13.50</th>
                                                <th>13.50-14.40</th>
                                                <th>14.40-15.30</th>
                                                <th class="last">15.30-16.20</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="listSchedule.length > 0" v-for="schedule in listSchedule">
                                            <tr>
                                                <td class="day fm-kanit">{{ schedule.day }}</td>
                                                <td class="active cursor-main" v-for="(subject, index) in schedule.subject">
                                                    <div v-if="schedule.subject[index].class != ''"
                                                        @click="openModal(schedule.day, schedule.column, index, 'edit', subject)">
                                                        <h4>{{ subject.code }}</h4>
                                                        <h4>{{ `${subject.class == 'vc' ? 'ปวช.' :
                                                            subject.class}${subject.class == 'vc' ? ' ' :
                                                                '/'}${subject.room}` }}</h4>
                                                        <div class="hover">
                                                            <h4>{{ subject.code }}</h4>
                                                            <h4 style="padding: 3px 0;">{{ subject.nameSubject }}</h4>
                                                            <p>{{ `${subject.class == 'vc' ? 'ปวช.' :
                                                                subject.class}${subject.class == 'vc' ? ' ' :
                                                                    '/'}${subject.room}` }}</p>
                                                        </div>
                                                    </div>
                                                    <div v-else-if="schedule.subject[index].activity === true"
                                                        @click="openModal(schedule.day, schedule.column, index, 'edit', subject)">
                                                        <h4>{{ subject.activityName }}</h4>
                                                        <div class="hover">
                                                            <h4>กิจกรรม</h4>
                                                            <h4>{{ subject.activityName }}</h4>
                                                        </div>
                                                    </div>
                                                    <div v-else
                                                        @click="openModal(schedule.day, schedule.column, index, 'add')">
                                                        <h4 style="padding: 0 0; margin: 0 0;">
                                                            <Icon name="material-symbols:add-circle-outline"
                                                                class="icon-add-schedule" />
                                                        </h4>
                                                        <div class="hover-add">
                                                            <h4
                                                                style="padding: 0 0; margin: 0 0; color: var(--color-white);">
                                                                <Icon name="material-symbols:add-circle-outline"
                                                                    style="font-size: 1.2rem;" />
                                                            </h4>
                                                            <p style="font-size: 0.8rem; color: var(--color-white);">
                                                                เพิ่มห้องเรียน</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody v-else>
                                            <tr>
                                                <td colspan="9">
                                                    <div class="d-flex justify-content-center">
                                                        <Icon name="mi:circle-information" class="me-1"
                                                            style="font-size: 1.2rem; margin-top: 1px; color: var(--color-warning);" />
                                                        <p style="padding: 0 0; margin: 0 0;">ไม่พบข้อมูล</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal v-if="isModal" :closeModal="closeModal" :type="typeModal" :period="period" :daySchedule="daySchedule"
        :column="column" :dataSchedule="dataSchedule" :manageSchedule="getSchedule"/>
</template>

<script>
import callApi from '../api/callApi'

export default {
    setup() {


        return {}
    },
    data() {
        return {
            listSchedule: [],
            isModal: false,
            typeModal: '',
            period: 0,
            daySchedule: '',
            dataSchedule: {},
            column: ''
        }
    },
    mounted() {
        this.getSchedule()
    },
    methods: {
        async getSchedule() {
            const data = {
                t_id: 2,
                term: 1,
                year: 2566
            }

            let day = [
                {
                    id: 0,
                    key: 'a',
                    nameDay: 'จันทร์'
                },
                {
                    id: 1,
                    key: 'b',
                    nameDay: 'อังคาร'
                },
                {
                    id: 2,
                    key: 'c',
                    nameDay: 'พุธ'
                },
                {
                    id: 3,
                    key: 'd',
                    nameDay: 'พฤหัสบดี'
                },
                {
                    id: 4,
                    key: 'e',
                    nameDay: 'ศุกร์'
                },
            ]

            let schedule = []

            await callApi.getScheduleById(data).then(res => {
                if (res.code == 0) {
                    let keyObj = Object.keys(res.result);
                    let i = 0

                    let entries = Object.entries(res.result)

                    for (const list of keyObj) {
                        if (keyObj[i] != 'id' && keyObj[i] != 't_id' && keyObj[i] != 'tc_term' && keyObj[i] != 'tc_year' && keyObj[i] != 'created_at' && keyObj[i] != 'updated_at') {
                            let splitFirst = keyObj[i].split('_');
                            let splitSecond = splitFirst[1].split("");

                            let addDay = day.filter(e => {
                                if (e.key == splitSecond[0]) {
                                    return e
                                }
                            })

                            let getDataSchedule = entries.filter(([key, value]) => {
                                if (key == keyObj[i]) {
                                    return value
                                }
                            })

                            let dataSchedule = {
                                code: '',
                                nameSubject: '',
                                class: '',
                                room: '',
                                activity: false,
                                activityName: ''
                            }

                            if (getDataSchedule.length > 0) {
                                try {
                                    let splitNameSubject = getDataSchedule[0][1].split("_");

                                    if(splitNameSubject.length == 1){
                                        dataSchedule.activity = true,
                                        dataSchedule.activityName = getDataSchedule[0][1]
                                    }else{
                                        dataSchedule.code = splitNameSubject[0]
                                        dataSchedule.nameSubject = splitNameSubject[1]
                                        dataSchedule.class = splitNameSubject[2]
                                        dataSchedule.room = splitNameSubject[3]
                                    }
                                    
                                } catch (error) {
                                    dataSchedule.activity = true,
                                    dataSchedule.activityName = getDataSchedule[0][1]
                                }
                                
                            }

                            if (schedule.length == 0) {
                                schedule.push({
                                    column: 'tc_' + addDay[0].key,
                                    day: addDay[0].nameDay,
                                    subject: []
                                })
                            }

                            if (schedule[addDay[0].id] === undefined) {
                                schedule.push({
                                    column: 'tc_' + addDay[0].key,
                                    day: addDay[0].nameDay,
                                    subject: [{ ...dataSchedule }]
                                })
                            } else {
                                schedule[addDay[0].id].subject.push({ ...dataSchedule })
                            }
                        }

                        i++
                    }
                    this.listSchedule = schedule
                }
            })


        },
        openModal(day, column, period, type, data) {
            this.isModal = true
            this.period = period
            this.daySchedule = day
            this.column = `${column}${(period + 1)}`
            this.dataSchedule = data

            if (type == 'add') {
                this.typeModal = 'add-schedule'

            } else if (type == 'edit') {
                this.typeModal = 'edit-schedule'

            }
        },
        closeModal() {
            this.isModal = false
            this.typeModal = ''
        }
    },
}
</script>

<style lang="css" scoped>
/* table */

.icon-add-schedule {
    font-size: 1.2rem;
    opacity: 0.2;
}

.p-table-schedule {
    padding: 0.25rem 3rem;
}

.period-subject {
    background: var(--color-primary);
}

.time-subject {
    background: var(--color-dark);
}

.time-subject th {
    font-size: 0.8rem !important;
}

.schedule-table table thead th {
    padding: 5px 1px;
    color: #fff;
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
    width: 150px;
    /* position: relative; */
    /* border: 1px solid rgb(255, 255, 255); */
    font-family: "__font_pwks_kanit";
}

.schedule-table table thead th:before {
    content: "";
    width: 3px;
    height: 35px;
    background: rgba(255, 255, 255, 0.2);
    position: absolute;
    right: -1px;
    top: 50%;
    transform: translateY(-50%);
}

.schedule-table table thead th.last:before {
    content: none;
}

.schedule-table table tbody td {
    vertical-align: middle;
    border: 1px solid #e2edf8;
    font-weight: 500;
    padding: 20px 10px;
    text-align: center;
}

.schedule-table table tbody td.day {
    font-size: 1.2rem;
    font-weight: 400;
    background: var(--color-info);
    border: 1px solid var(--color-info);
    position: relative;
    transition: all 0.3s linear 0s;
}

.schedule-table table tbody td.day:hover {
    background: var(--color-school-op);
    color: #fff;
    border: 1px solid var(--color-school-op);
}

.schedule-table table tbody td.active {
    position: relative;
    z-index: 0;
    transition: all 0.3s linear 0s;
}

.schedule-table table tbody td.active h4 {
    font-weight: 400;
    color: #000;
    font-size: 1rem;
}

.schedule-table table tbody td.active p {
    font-size: 1rem;
    line-height: normal;
    margin-bottom: 0;
}

.schedule-table table tbody td .hover h4 {
    font-weight: 400;
    font-size: 1rem;
    color: #ffffff;
    padding: 0 0 0 0;
    margin: 0 0 0 0;
}

.schedule-table table tbody td .hover p {
    font-size: 1rem;
    color: #ffffff;
    line-height: normal;
    padding-bottom: 10px;
}

.schedule-table table tbody td.active::before {
    position: absolute;
    content: "";
    min-width: 100%;
    min-height: 100%;
    transform: scale(0);
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 0.25rem;
    transition: all 0.3s linear 0s;
}

.schedule-table table tbody td .hover {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 120%;
    height: 120%;
    transform: translate(-50%, -50%) scale(0.8);
    z-index: 0;
    background: var(--color-school);
    border-radius: 0.25rem;
    padding: 25px 0;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s linear 0s;
}

.schedule-table table tbody td .hover-add {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 120%;
    height: 120%;
    transform: translate(-50%, -50%) scale(0.8);
    z-index: 0;
    background: var(--color-secondary);
    border-radius: 0.25rem;
    padding: 25px 0;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s linear 0s;
}

.schedule-table table tbody td.active:hover .hover {
    transform: translate(-50%, -50%) scale(1);
    visibility: visible;
    opacity: 1;
}

.schedule-table table tbody td.active:hover .hover-add {
    transform: translate(-50%, -50%) scale(1);
    visibility: visible;
    opacity: 1;
}

@media screen and (min-width: 320px) and (max-width: 360px) {

    .icon-add-schedule {
        font-size: 1rem;
    }

    .p-table-schedule {
        padding: 0.25rem;
    }

    .schedule-table table thead th {
        font-size: 0.6rem;
    }

    .time-subject th {
        font-size: 0.6rem !important;
    }

    .schedule-table table tbody td {
        padding: 5px 0;
    }

    .schedule-table table tbody td.day {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td.active h4 {
        font-size: 0.5rem;
        padding: 1px 1.5px;
        margin: 0 0;
    }

    .schedule-table table tbody td.active p {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td .hover h4 {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td .hover p {
        font-size: 0.6rem;
    }
}

@media screen and (min-width: 360px) and (max-width: 375px) {

    .icon-add-schedule {
        font-size: 1rem;
    }

    .p-table-schedule {
        padding: 0.25rem;
    }

    .schedule-table table thead th {
        font-size: 0.6rem;
    }

    .time-subject th {
        font-size: 0.6rem !important;
    }

    .schedule-table table tbody td {
        padding: 5px 0;
    }

    .schedule-table table tbody td.day {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td.active h4 {
        font-size: 0.5rem;
        padding: 1px 1.5px;
        margin: 0 0;
    }

    .schedule-table table tbody td.active p {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td .hover h4 {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td .hover p {
        font-size: 0.6rem;
    }

}

@media screen and (min-width: 375px) and (max-width: 390px) {

    .icon-add-schedule {
        font-size: 1rem;
    }

    .p-table-schedule {
        padding: 0.25rem;
    }

    .schedule-table table thead th {
        font-size: 0.6rem;
    }

    .time-subject th {
        font-size: 0.6rem !important;
    }

    .schedule-table table tbody td {
        padding: 7px 0;
    }

    .schedule-table table tbody td.day {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td.active h4 {
        font-size: 0.5rem;
        padding: 1px 1.5px;
        margin: 0 0;
    }

    .schedule-table table tbody td.active p {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td .hover h4 {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td .hover p {
        font-size: 0.6rem;
    }

}

@media screen and (min-width: 390px) and (max-width: 420px) {

    .icon-add-schedule {
        font-size: 1.1rem;
    }

    .p-table-schedule {
        padding: 0.25rem;
    }

    .schedule-table table thead th {
        font-size: 0.6rem;
    }

    .time-subject th {
        font-size: 0.6rem !important;
    }

    .schedule-table table tbody td {
        padding: 10px 0;
    }

    .schedule-table table tbody td.day {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td.active h4 {
        font-size: 0.5rem;
        padding: 1px 1.5px;
        margin: 0 0;
    }

    .schedule-table table tbody td.active p {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td .hover h4 {
        font-size: 0.5rem;
    }

    .schedule-table table tbody td .hover p {
        font-size: 0.6rem;
    }

}

@media screen and (min-width: 420px) and (max-width: 490px) {

    .box-img-profile {
        margin-left: 1.5rem;
    }

    .img-profile {
        width: 90px;
        height: 90px;
        border-radius: 80px;
        border: 5px solid var(--color-white);
        margin-top: -10%;
    }

    .f-profile {
        font-size: 1.3rem;
    }

    .btn-edit-profile {
        padding: 0 0;
        margin: 0 0 0 0;
        font-size: 0.8rem;
    }

    .block-main-detail-profile {
        width: 374px;
        padding: 20px 0;
    }

    .width-tab {
        width: 410px;
    }

    .text-area-height {
        height: 100px;
    }

    .fs-head {
        font-size: 0.7rem;
    }

    .fs-body {
        font-size: 0.8rem;
    }

    .p-table-schedule {
        padding: 0.25rem;
    }

    .schedule-table table thead th {
        font-size: 0.6rem;
    }

    .time-subject th {
        font-size: 0.6rem !important;
    }

    .schedule-table table tbody td {
        padding: 10px 0;
    }

    .schedule-table table tbody td.day {
        font-size: 0.6rem;
    }

    .schedule-table table tbody td.active h4 {
        font-size: 0.6rem;
        padding: 1px 1.5px;
        margin: 0 0;
    }

    .schedule-table table tbody td.active p {
        font-size: 0.6rem;
    }

    .schedule-table table tbody td .hover h4 {
        font-size: 0.6rem;
    }

    .schedule-table table tbody td .hover p {
        font-size: 0.6rem;
    }

}

@media screen and (min-width: 490px) and (max-width: 590px) {

    .box-img-profile {
        margin-left: 1.5rem;
    }

    .img-profile {
        width: 90px;
        height: 90px;
        border-radius: 80px;
        border: 5px solid var(--color-white);
        margin-top: -10%;
    }

    .f-profile {
        font-size: 1rem;
    }

    .btn-edit-profile {
        padding: 0 0;
        margin: 0 0 0 0;
        font-size: 0.8rem;
    }

    .block-main-detail-profile {
        width: 444px;
        padding: 20px 0;
    }

    .width-tab {
        width: 480px;
    }

    .text-area-height {
        height: 100px;
    }

    .fs-head {
        font-size: 0.7rem;
    }

    .fs-body {
        font-size: 0.8rem;
    }

    .p-table-schedule {
        padding: 0.25rem;
    }

    .schedule-table table thead th {
        font-size: 0.7rem;
    }

    .time-subject th {
        font-size: 0.45rem !important;
    }

    .schedule-table table tbody td {
        padding: 15px 0;
    }

    .schedule-table table tbody td.day {
        font-size: 0.7rem;
    }

    .schedule-table table tbody td.active h4 {
        font-size: 0.7rem;
        padding: 1px 1.5px;
        margin: 0 0;
    }

    .schedule-table table tbody td.active p {
        font-size: 0.7rem;
    }

    .schedule-table table tbody td .hover h4 {
        font-size: 0.7rem;
    }

    .schedule-table table tbody td .hover p {
        font-size: 0.7rem;
    }

}

@media screen and (min-width: 590px) and (max-width: 690px) {

    .box-img-profile {
        margin-left: 1.5rem;
    }

    .img-profile {
        width: 100px;
        height: 100px;
        border-radius: 80px;
        border: 5px solid var(--color-white);
        margin-top: -10%;
    }

    .f-profile {
        font-size: 1.5rem;
    }

    .btn-edit-profile {
        padding: 0 0;
        margin: 0 0 0 0;
        font-size: 0.8rem;
    }

    .block-main-detail-profile {
        width: 544px;
        padding: 20px 0;
    }

    .width-tab {
        width: 580px;
    }

    .text-area-height {
        height: 150px;
    }

    .fs-head {
        font-size: 0.8rem;
    }

    .fs-body {
        font-size: 0.8rem;
    }

    .p-table-schedule {
        padding: 0.25rem;
    }

    .schedule-table table thead th {
        font-size: 0.8rem;
    }

    .time-subject th {
        font-size: 0.6rem !important;
    }

    .schedule-table table tbody td {
        padding: 15px 0;
    }

    .schedule-table table tbody td.day {
        font-size: 0.8rem;
    }

    .schedule-table table tbody td.active h4 {
        font-size: 0.8rem;
        padding: 1px 1.5px;
        margin: 0 0;
    }

    .schedule-table table tbody td.active p {
        font-size: 0.8rem;
    }

    .schedule-table table tbody td .hover h4 {
        font-size: 0.8rem;
    }

    .schedule-table table tbody td .hover p {
        font-size: 0.8rem;
    }

}

@media screen and (min-width: 690px) and (max-width: 760px) {

    .box-img-profile {
        margin-left: 1.5rem;
    }

    .img-profile {
        width: 100px;
        height: 100px;
        border-radius: 80px;
        border: 5px solid var(--color-white);
        margin-top: -10%;
    }

    .f-profile {
        font-size: 1.5rem;
    }

    .btn-edit-profile {
        padding: 0 0;
        margin: 0 0 0 0;
        font-size: 0.8rem;
    }

    .block-main-detail-profile {
        width: 644px;
        padding: 20px 0;
    }

    .width-tab {
        width: 680px;
    }

    .text-area-height {
        height: 150px;
    }

    .fs-head {
        font-size: 0.85rem;
    }

    .fs-body {
        font-size: 0.85rem;
    }

    .p-table-schedule {
        padding: 0.25rem;
    }

    .schedule-table table thead th {
        font-size: 0.85rem;
    }

    .time-subject th {
        font-size: 0.65rem !important;
    }

    .schedule-table table tbody td {
        padding: 15px 0;
    }

    .schedule-table table tbody td.day {
        font-size: 0.85rem;
    }

    .schedule-table table tbody td.active h4 {
        font-size: 0.85rem;
        padding: 1px 1.5px;
        margin: 0 0;
    }

    .schedule-table table tbody td.active p {
        font-size: 0.85rem;
    }

    .schedule-table table tbody td .hover h4 {
        font-size: 0.85rem;
    }

    .schedule-table table tbody td .hover p {
        font-size: 0.85rem;
    }

}

@media screen and (min-width: 760px) and (max-width: 820px) {

    .box-img-profile {
        margin-left: 1.5rem;
    }

    .img-profile {
        width: 120px;
        height: 120px;
        border-radius: 80px;
        border: 5px solid var(--color-white);
        margin-top: -10%;
    }

    .f-profile {
        font-size: 1.7rem;
    }

    .btn-edit-profile {
        padding: 0 0;
        margin: 0 0 0 0;
        font-size: 0.8rem;
    }

    .block-main-detail-profile {
        width: 724px;
        padding: 20px 0;
    }

    .width-tab {
        width: 750px;
    }

    .text-area-height {
        height: 150px;
    }

    .fs-head {
        font-size: 0.85rem;
    }

    .fs-body {
        font-size: 1rem;
    }

    .p-table-schedule {
        padding: 0.25rem;
    }

    .schedule-table table thead th {
        font-size: 1rem;
    }

    .time-subject th {
        font-size: 0.75rem !important;
    }

    .schedule-table table tbody td {
        padding: 20px 0;
    }

    .schedule-table table tbody td.day {
        font-size: 1rem;
    }

    .schedule-table table tbody td.active h4 {
        font-size: 1rem;
        padding: 1px 1.5px;
        margin: 0 0;
    }

    .schedule-table table tbody td.active p {
        font-size: 1rem;
    }

    .schedule-table table tbody td .hover h4 {
        font-size: 1rem;
    }

    .schedule-table table tbody td .hover p {
        font-size: 1rem;
    }

}

@media screen and (min-width: 820px) and (max-width: 920px) {

    .box-img-profile {
        margin-left: 1.5rem;
    }

    .img-profile {
        width: 120px;
        height: 120px;
        border-radius: 80px;
        border: 5px solid var(--color-white);
        margin-top: -10%;
    }

    .f-profile {
        font-size: 1.7rem;
    }

    .btn-edit-profile {
        padding: 0 0;
        margin: 0 0 0 0;
        font-size: 0.8rem;
    }

    .block-main-detail-profile {
        width: 784px;
        padding: 20px 0;
    }

    .width-tab {
        width: 820px;
    }

    .text-area-height {
        height: 150px;
    }

    .fs-head {
        font-size: 0.85rem;
    }

    .fs-body {
        font-size: 1rem;
    }

    .p-table-schedule {
        padding: 0.25rem;
    }

    .schedule-table table thead th {
        font-size: 1.1rem;
    }

    .time-subject th {
        font-size: 0.75rem !important;
    }

    .schedule-table table tbody td {
        padding: 20px 0;
    }

    .schedule-table table tbody td.day {
        font-size: 1.1rem;
    }

    .schedule-table table tbody td.active h4 {
        font-size: 1.1rem;
        padding: 1px 1.5px;
        margin: 0 0;
    }

    .schedule-table table tbody td.active p {
        font-size: 1.1rem;
    }

    .schedule-table table tbody td .hover h4 {
        font-size: 1.1rem;
    }

    .schedule-table table tbody td .hover p {
        font-size: 1.1rem;
    }

}</style>