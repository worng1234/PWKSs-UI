<template>
    <div align="center">
        <div class="block-main">
            <div class="block-bg-main">
                <div class="box-head-profile">
                    <div align="left" class="box-img-profile d-flex">
                        <img src="../assets/img/user-img/user-profile.png" alt="profile" class="img-profile">
                        <div class="ms-3 mt-2">
                            <h3 class="f-profile fw-500" style="padding: 0 0 0 0; margin: 0 0 0 0;">กิตติกรณ์ อรุณภพ</h3>
                            <h4 class="f-profile fw-500" style="opacity: 0.4;">Kittikorn Arunpop</h4>
                        </div>
                    </div>
                </div>

                <div class="mt-3">
                    <button class="btn btn-main btn-edit-profile rounded-pill fm-kanit">
                        <Icon name="material-symbols:settings-account-box-outline"
                            style="font-size: 1.2rem; padding: 0 0;" />
                        แก้ไขโปรไฟล์
                    </button>
                </div>

                <div class="block-main-detail-profile">
                    <div class="divider-solid"></div>
                </div>

                <div>
                    <ul class="nav nav-tabs width-tab nav-fill justify-content-center" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link fm-kanit fs-tab active" id="attend-and-homeroom-tab" data-bs-toggle="tab"
                                data-bs-target="#attend-and-homeroom-tab-pane" type="button" role="tab"
                                aria-controls="attend-and-homeroom-tab-pane" aria-selected="true">เช็คชื่อ</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link fm-kanit fs-tab " id="schedule-tab" data-bs-toggle="tab"
                                data-bs-target="#schedule-tab-pane" type="button" role="tab"
                                aria-controls="schedule-tab-pane" aria-selected="false">ตารางสอน</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent" align="center">
                        <div class="tab-pane fade show active" id="attend-and-homeroom-tab-pane" role="tabpanel"
                            aria-labelledby="attend-and-homeroom-tab" tabindex="0">
                            <div class="p-table-schedule mt-3">
                                <div class=" mb-3">
                                    <h3>มัธยมศึกษาปีที่ 5/2</h3>
                                </div>
                                <table class="table table-striped" align="center">
                                    <thead class="fs-head" align="center">
                                        <tr>
                                            <th scope="col" class="th-color-main fm-kanit fw-500"
                                                style="border-radius: 8px 0 0 0;" :hidden="disTableHeadAndBody">ลำดับ</th>
                                            <th scope="col" class="th-color-main fm-kanit fw-500"
                                                :hidden="disTableHeadAndBody">รหัสนักเรียน</th>
                                            <th scope="col" class="th-color-main fm-kanit fw-500"
                                                :style="disTableHeadAndBody ? 'border-radius: 8px 0 0 0;' : ''">ชื่อ -
                                                นามสกุล</th>
                                            <th scope="col" class="color-attend fm-kanit fw-500">มาเรียน</th>
                                            <th scope="col" class="color-sick fm-kanit fw-500">ลาป่วย</th>
                                            <th scope="col" class="color-absence fm-kanit fw-500">ลากิจ</th>
                                            <th scope="col" class="color-activity fm-kanit fw-500">กิจกรรม</th>
                                            <th scope="col" class="color-loss fm-kanit fw-500"
                                                style="border-radius: 0 8px 0 0;">ขาด</th>
                                        </tr>
                                    </thead>
                                    <tbody align="center" >
                                        <tr v-for="(student, index) in listStudent">
                                            <th scope="row" :hidden="disTableHeadAndBody">{{ index + 1 }}</th>
                                            <td :id="`code-student-${index}`" :hidden="disTableHeadAndBody">{{ student.code
                                            }}</td>
                                            <td align="left" class="fs-body">{{ student.preName }}{{ student.firstName }} {{
                                                student.lastName }}</td>
                                            <td class="color-attend">
                                                <input class="form-check-input" type="radio" :name="`attend-${index}`"
                                                    :id="`attend-${index}`" checked>
                                            </td>
                                            <td class="color-sick">
                                                <input class="form-check-input" type="radio" :name="`attend-${index}`"
                                                    :id="`sick-${index}`">
                                            </td>
                                            <td class="color-absence">
                                                <input class="form-check-input" type="radio" :name="`attend-${index}`"
                                                    :id="`absence-${index}`">
                                            </td>
                                            <td class="color-activity">
                                                <input class="form-check-input" type="radio" :name="`attend-${index}`"
                                                    :id="`activity-${index}`">
                                            </td>
                                            <td class="color-loss">
                                                <input class="form-check-input" type="radio" :name="`attend-${index}`"
                                                    :id="`loss-${index}`">
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                                <div class="divider-solid mb-4 mt-4"></div>

                                <div class="form-floating mb-4">
                                    <textarea class="form-control text-area-height" placeholder="บันทึกข้อความโฮมรูม"
                                        id="homeRoom"></textarea>
                                    <label for="homeRoom" class="fm-kanit">บันทึกโฮมรูม</label>
                                </div>

                                <div>
                                    <button class="btn btn-main rounded-pill fm-kanit fw-500 mt-2"
                                        style="padding: 3px 15px; width: 150px;" @click="submitAttend()">
                                        <Icon name="humbleicons:save" style="margin-top: -3%; font-size: 1.2rem;" />
                                        บันทึก
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade " id="schedule-tab-pane" role="tabpanel"
                            aria-labelledby="schedule-tab" tabindex="0">
                            <div class="p-table-schedule">
                                <div class="mt-2">
                                    <h3>ตารางสอน ปีการศึกษา 1/2566</h3>
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
                                                            <td class="active" v-for="(subject, index) in schedule.subject">
                                                                <div class="cursor-main"
                                                                    v-if="schedule.subject[index].room != ''"
                                                                    @click="openModal(schedule.day, index)">
                                                                    <h4>ว20222</h4>
                                                                    <h4>{{ subject.room }}</h4>
                                                                    <div class="hover">
                                                                        <h4>ว20222</h4>
                                                                        <h4>{{ subject.room }}</h4>
                                                                        <p>{{ subject.time }}</p>
                                                                    </div>
                                                                </div>
                                                                <div v-else>
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
            </div>
        </div>
    </div>
    <Modal v-if="isModal" :closeModal="closeModal" :type="typeModal" :period="period" :daySchedule="daySchedule"
        :listStudent="listStudent" />
</template>

<script>
export default {
    setup() {


        return {}
    },
    data() {
        return {
            listStudent: [
                {
                    code: '10211',
                    preName: 'นาย',
                    firstName: 'สวัสดี',
                    lastName: 'ยามนอน'
                },
                {
                    code: '11112',
                    preName: 'นาย',
                    firstName: 'ทดสอบ',
                    lastName: 'ทดสอบ'
                },
                {
                    code: '12614',
                    preName: 'นางสาว',
                    firstName: 'กิจกรรม',
                    lastName: 'เป็นหลัก'
                },
                {
                    code: '12441',
                    preName: 'นางสาว',
                    firstName: 'นอนนะ',
                    lastName: 'ลาละ'
                },
                {
                    code: '11456',
                    preName: 'นางสาว',
                    firstName: 'หลับตา',
                    lastName: 'แล้วนอน'
                },
                {
                    code: '12432',
                    preName: 'นางสาว',
                    firstName: 'นอนแล้ว',
                    lastName: 'นอนอยู่'
                },
                {
                    code: '10014',
                    preName: 'นางสาว',
                    firstName: 'ทดสอบ',
                    lastName: 'สอบทด'
                },
                {
                    code: '11321',
                    preName: 'นางสาว',
                    firstName: 'ยามเช้า',
                    lastName: 'ยามเย็น'
                },
                {
                    code: '12146',
                    preName: 'นางสาว',
                    firstName: 'กินอร่อย',
                    lastName: 'กินดี'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
                {
                    code: '11555',
                    preName: 'นางสาว',
                    firstName: 'นักคิด',
                    lastName: 'นักทำ'
                },
            ],
            listSchedule: [
                {
                    day: 'จันทร์',
                    subject: [
                        { time: '08:40', room: '4/5' },
                        { time: '09:30', room: '4/5' },
                        { time: '10:20', room: '' },
                        { time: '11:10', room: '' },
                        { time: '12:00', room: '3/2' },
                        { time: '13:00', room: '' },
                        { time: '13:50', room: '6/1' },
                        { time: '14:40', room: '6/2' },
                        { time: '15:30', room: '1/5' },
                    ]
                },
                {
                    day: 'อังคาร',
                    subject: [
                        { time: '08:40', room: '' },
                        { time: '09:30', room: '' },
                        { time: '10:20', room: '5/1' },
                        { time: '11:10', room: 'ปวช.' },
                        { time: '12:00', room: '4/4' },
                        { time: '13:00', room: '' },
                        { time: '13:50', room: '4/6' },
                        { time: '14:40', room: '6/2' },
                        { time: '15:30', room: '' },
                    ]
                },
                {
                    day: 'พุธ',
                    subject: [
                        { time: '08:40', room: 'ปวช.' },
                        { time: '09:30', room: '2/4' },
                        { time: '10:20', room: '6/6' },
                        { time: '11:10', room: '' },
                        { time: '12:00', room: '4/4' },
                        { time: '13:00', room: '' },
                        { time: '13:50', room: '1/2' },
                        { time: '14:40', room: '1/2' },
                        { time: '15:30', room: '' },
                    ]
                },
                {
                    day: 'พฤหัสบดี',
                    subject: [
                        { time: '08:40', room: '' },
                        { time: '09:30', room: '2/4' },
                        { time: '10:20', room: '4/2' },
                        { time: '11:10', room: '' },
                        { time: '12:00', room: '1/1' },
                        { time: '13:00', room: 'ปวช.' },
                        { time: '13:50', room: 'ปวช.' },
                        { time: '14:40', room: '' },
                        { time: '15:30', room: '5/2' },
                    ]
                },
                {
                    day: 'ศุกร์',
                    subject: [
                        { time: '08:40', room: '' },
                        { time: '09:30', room: '1/3' },
                        { time: '10:20', room: '1/3' },
                        { time: '11:10', room: '' },
                        { time: '12:00', room: '' },
                        { time: '13:00', room: '4/6' },
                        { time: '13:50', room: '' },
                        { time: '14:40', room: '4/3' },
                        { time: '15:30', room: '4/3' },
                    ]
                },
            ],
            isModal: false,
            typeModal: '',
            period: 0,
            daySchedule: '',
            disTableHeadAndBody: false
        }
    },
    mounted() {
        let width = window.screen.width;

        if (width >= 320 && width <= 420) {
            this.disTableHeadAndBody = true
        }

        window.addEventListener("resize", () => {
            if (width >= 320 && width <= 420) {
                this.disTableHeadAndBody = true
            }
        })
    },
    methods: {
        submitAttend() {
            let i = 0
            let dataStudent = []

            for (const e of this.listStudent) {
                try {
                    let attend = document.getElementById(`attend-${i}`).checked
                    let sick = document.getElementById(`sick-${i}`).checked
                    let absence = document.getElementById(`absence-${i}`).checked
                    let activity = document.getElementById(`activity-${i}`).checked
                    let loss = document.getElementById(`loss-${i}`).checked

                    let status = 0

                    if (attend) status = 1
                    else if (sick) status = 2
                    else if (absence) status = 3
                    else if (activity) status = 4
                    else if (loss) status = 5

                    dataStudent.push({
                        codeStudent: e.code,
                        status: status
                    })

                } catch (error) {
                    console.log(error);
                }

                i++

            }

            console.log(dataStudent);
        },
        openModal(day, period) {
            this.isModal = true
            this.period = period
            this.daySchedule = day

            this.typeModal = 'attend-class'
        },
        closeModal() {
            this.isModal = false
            this.typeModal = ''
        }
    },
}
</script>

<style lang="css" scoped>
.block-profile {
    margin-top: 7%;
}

.img-profile {
    width: 150px;
    height: 150px;
    border-radius: 80px;
    border: 5px solid var(--color-white);
    margin-top: -15%;
}

.divider-solid {
    height: 2px;
}

.block-main-detail-profile {
    width: 956px;
    padding: 20px 20px;
}

.box-head-profile {
    display: flex;
    justify-content: space-between;
}

.box-img-profile {
    margin-left: 3rem;
}

.btn-edit-profile {
    width: 90%;
    padding: 0 0;
    margin: 0 0 0 0;
    font-size: 1rem;
}

.fs-tab {
    font-size: 1rem;
}

.width-tab {
    width: 920px;
    /* ลบ 36px ต่อความกว้างของ block-main-detail-profile */
}

.text-area-height {
    height: 200px;
}

.form-floating>label {
    z-index: 1;
}

.color-attend {
    background-color: var(--color-success);
    color: var(--color-white);
}

.color-loss {
    background-color: var(--color-danger);
    color: var(--color-white);
}

.color-activity {
    background-color: var(--color-info);
    color: var(--color-white);
}

.color-absence {
    background-color: var(--color-warning);
    color: var(--color-white);
}

.color-sick {
    background-color: var(--color-primary);
    color: var(--color-white);
}

/* Table Schedule */
.table-schedule {
    background-color: var(--color-white);
    border-radius: 8px;
    font-size: 0.85rem;
}

.table-schedule thead tr th {
    border: 1px solid rgb(190, 190, 190);
}

.table-schedule tbody tr td {
    border: 1px solid rgb(190, 190, 190);
    padding: 10px 10px;
}

.table-schedule tbody tr td p {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
}

.head-main th {
    padding: 10px 10px;
}

/* table */

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
        width: 264px;
        padding: 20px 0;
    }

    .width-tab {
        width: 300px;
    }

    .text-area-height {
        height: 100px;
    }

    .fs-head {
        font-size: 0.6rem;
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
        width: 314px;
        padding: 20px 0;
    }

    .width-tab {
        width: 350px;
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

    .box-img-profile {
        margin-left: 1.5rem;
    }

    .img-profile {
        width: 90px;
        height: 90px;
        border-radius: 80px;
        border: 5px solid var(--color-white);
        margin-top: -15%;
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
        width: 314px;
        padding: 20px 0;
    }

    .width-tab {
        width: 350px;
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
        font-size: 1.2rem;
    }

    .btn-edit-profile {
        padding: 0 0;
        margin: 0 0 0 0;
        font-size: 0.8rem;
    }

    .block-main-detail-profile {
        width: 344px;
        padding: 20px 0;
    }

    .width-tab {
        width: 380px;
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

}
</style>