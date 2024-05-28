<template>
    <div>
        <div class="bg-modal">

            <div align="center" class="modal-main-pwks" v-if="typeModal == 'add-schedule'" v-click-outside="closeModal">
                <div align="right">
                    <Icon name="material-symbols:close-rounded" class="close-modal-icon cursor-main"
                        @click="closeModal" />
                </div>
                <div class="modal-title-pwks" align="center">
                    <h2>เพิ่มตารางสอน</h2>
                </div>
                <div class="modal-content-pwks mt-3" align="left">
                    <div>
                        <div class="divider-solid mb-3" style="height: 2px;"></div>

                        <p>วัน : {{ daySchedule }}</p>
                        <p>คาบที่ : {{ periodArray[period] }}</p>
                        <p>ช่วงเวลา : {{ timePeriod[period] }}</p>

                        <div class="divider-solid" style="height: 2px;"></div>

                        <div class="input-group me-3 input-class mt-3">
                            <label class="input-group-text" for="class-add">รายวิชา</label>
                            <select class="form-select" id="class-add" v-model="subject" @change="subjectCheck()">
                                <option v-for="subject in dataSubject"
                                    :value="`${subject.subject_code}_${subject.subject_name}`">{{ subject.subject_code
                                    }} {{ subject.subject_name }}</option>
                                <option value="act_1">ลูกเสือ</option>
                                <option value="act_2">ชุมนุม</option>
                                <option value="act_3">แนะแนว</option>
                                <option value="act_4">อบรม</option>
                            </select>
                        </div>

                        <div class="d-flex mt-3" v-if="checkChangeSchedule">
                            <div class="input-group me-3 input-class">
                                <label class="input-group-text" for="class-add">ม.</label>
                                <select class="form-select" id="class-add" v-model="classSchedule" @change="vcCheck()">
                                    <option selected></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="vc">ปวช.</option>
                                </select>
                            </div>
                            <div class="input-group input-class">
                                <label class="input-group-text" for="room-add">{{ vcGrade ? 'ปี' : 'ห้อง' }}</label>
                                <select class="form-select" id="room-add" v-model="roomSchedule">
                                    <option selected value="0"></option>
                                    <option :value="room" v-for=" room in roomList">{{ room }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center danger-input mt-3" v-if="checkValidate.schedule">
                            <Icon name="ph:warning-circle-bold" class="mt-1 me-1" />
                            <p>กรุณากรอกข้อมูลให้ครบถ้วน</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer-pwks mt-4" align="center">
                    <button class="btn btn-main rounded-pill fm-kanit" @click="manageSchedule()">
                        <Icon name="humbleicons:save" style="margin-top: -3%; font-size: 1.2rem;" />
                        บันทึก
                    </button>
                </div>
            </div>

            <div align="center" class="modal-main-pwks" v-else-if="typeModal == 'edit-schedule'"
                v-click-outside="closeModal">
                <div align="right">
                    <Icon name="material-symbols:close-rounded" class="close-modal-icon cursor-main"
                        @click="closeModal" />
                </div>
                <div class="modal-title-pwks" align="center">
                    <h2>แก้ไขตารางสอน</h2>
                </div>
                <div class="modal-content-pwks mt-3" align="left">
                    <div>
                        <div class="divider-solid mb-3" style="height: 2px;"></div>

                        <p>วัน : {{ daySchedule }}</p>
                        <p>คาบที่ : {{ periodArray[period] }}</p>
                        <p>ช่วงเวลา : {{ timePeriod[period] }}</p>

                        <div class="divider-solid" style="height: 2px;"></div>

                        <!-- <div class="form-check form-switch mt-3">
                            <input class="form-check-input form-check-input-h" type="checkbox" role="switch"
                                id="activity-class" v-model="checkChangeSchedule">
                            <label class="form-check-label ms-2 mt-1" for="activity-class">กิจกรรม</label>
                        </div>

                        <div class="input-group me-3 mt-3 input-detail" v-if="!checkChangeSchedule">
                            <label class="input-group-text" for="class-add">รหัสวิชา</label>
                            <input type="text" class="form-control" id="class-add" placeholder="กรอกรหัสวิชา"
                                v-model="subjectCode">
                        </div>

                        <div class="input-group me-3 mt-3 input-detail" v-if="!checkChangeSchedule">
                            <label class="input-group-text" for="class-add">ชื่อรายวิชา</label>
                            <input type="text" class="form-control" id="class-add" placeholder="กรอกชื่อรายวิชา"
                                v-model="subjectName">
                        </div> -->

                        <div class="input-group me-3 input-class mt-3">
                            <label class="input-group-text" for="class-add">รายวิชา</label>
                            <select class="form-select" id="class-add" v-model="subject" @change="subjectCheck()">
                                <option v-for="subject in dataSubject"
                                    :value="`${subject.subject_code}_${subject.subject_name}`">{{ subject.subject_code
                                    }} {{ subject.subject_name }}</option>
                                <option value="act_1">ลูกเสือ</option>
                                <option value="act_2">ชุมนุม</option>
                                <option value="act_3">แนะแนว</option>
                                <option value="act_4">อบรม</option>
                            </select>
                        </div>

                        <div class="d-flex mt-3" v-if="checkChangeSchedule">
                            <div class="input-group me-3 input-class">
                                <label class="input-group-text" for="class-edit">ม.</label>
                                <select class="form-select" id="class-edit" v-model="classSchedule" @change="vcCheck()">
                                    <option selected></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="vc">ปวช.</option>
                                </select>
                            </div>
                            <div class="input-group input-class">
                                <label class="input-group-text" for="room-edit">{{ vcGrade ? 'ปี' : 'ห้อง' }}</label>
                                <select class="form-select" id="room-edit" v-model="roomSchedule">
                                    <option selected value="0"></option>
                                    <option :value="room" v-for=" room in roomList">{{ room }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-3" v-else-if="checkChangeSchedule">
                            <div class="input-group me-3 input-detail">
                                <label class="input-group-text" for="class-add">กิจกรรม</label>
                                <input type="text" class="form-control" id="class-add" placeholder="กรอกรายชื่อกิจกรรม"
                                    v-model="activitySchedule">
                            </div>
                        </div>

                        <div class="d-flex justify-content-center danger-input mt-3" v-if="checkValidate.schedule">
                            <Icon name="ph:warning-circle-bold" class="mt-1 me-1" />
                            <p>กรุณากรอกข้อมูลให้ครบถ้วน</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer-pwks mt-4" align="center">
                    <button class="btn btn-main rounded-pill fm-kanit me-3" @click="manageSchedule()">
                        <Icon name="humbleicons:save" style="margin-top: -3%; font-size: 1.2rem;" />
                        บันทึก
                    </button>
                    <button class="btn btn-danger rounded-pill fm-kanit" @click="warningModal()">
                        <Icon name="material-symbols:delete-outline" style="margin-top: -3%; font-size: 1.2rem;" />
                        ลบข้อมูล
                    </button>
                </div>
            </div>

            <div align="center" class="modal-main-pwks" v-else-if="typeModal == 'attend-class'"
                v-click-outside="closeModal">
                <div align="right">
                    <Icon name="material-symbols:close-rounded" class="close-modal-icon cursor-main"
                        @click="closeModal" />
                </div>
                <div class="modal-title-pwks" align="center">
                    <h2>เช็คชื่อ</h2>
                </div>
                <div class="modal-content-pwks mt-3" align="left">
                    <div>
                        <div class="divider-solid mb-3" style="height: 2px;"></div>

                        <p>วัน : {{ daySchedule }}</p>
                        <p>คาบที่ : {{ periodArray[period] }}</p>
                        <p>ช่วงเวลา : {{ timePeriod[period] }}</p>

                        <div class="divider-solid" style="height: 2px;"></div>

                        <div class="mt-3">
                            <table class="table table-striped">
                                <thead class="fs-head" align="center">
                                    <tr>
                                        <!-- <th scope="col" class="th-color-main fm-kanit fw-500"
                                            style="border-radius: 8px 0 0 0;">ลำดับ</th> -->
                                        <th scope="col" class="th-color-main fm-kanit fw-400 name"
                                            style="border-radius: 8px 0 0 0;">ชื่อ - นามสกุล</th>
                                        <th scope="col" class="color-attend fm-kanit fw-400 check">มาเรียน</th>
                                        <th scope="col" class="color-sick fm-kanit fw-400 check">ลาป่วย</th>
                                        <th scope="col" class="color-absence fm-kanit fw-400 check">ลากิจ</th>
                                        <th scope="col" class="color-activity fm-kanit fw-400 check">กิจกรรม</th>
                                        <th scope="col" class="color-loss fm-kanit fw-400 check"
                                            style="border-radius: 0 8px 0 0;">ขาด</th>
                                    </tr>
                                </thead>
                                <tbody class="fs-body" align="center">
                                    <tr v-for="(student, index) in listStudent">
                                        <td align="left" style="font-size: 0.9rem;">{{ student.preName }}
                                            {{ student.firstName }} {{ student.lastName }}</td>
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
                        </div>

                        <div class="divider-solid mb-3" style="height: 2px;"></div>

                        <div class="form-floating mb-4">
                            <textarea class="form-control" placeholder="บันทึกข้อความโฮมรูม" style="height: 100px"
                                id="homeRoom"></textarea>
                            <label for="homeRoom" class="fm-kanit">บันทึกรายละเอียดการสอน</label>
                        </div>

                    </div>
                </div>
                <div class="modal-footer-pwks mt-4" align="center">
                    <button class="btn btn-main rounded-pill fm-kanit me-3" @click="manageSchedule()">
                        <Icon name="humbleicons:save" style="margin-top: -3%; font-size: 1.2rem;" />
                        บันทึก
                    </button>
                </div>
            </div>

            <div align="center" class="modal-main-pwks" v-else-if="typeModal == 'loading'">
                <div class="modal-title-pwks mt-2" align="center">
                    <Icon name="svg-spinners:blocks-shuffle-3" class="loading-icon mb-4" />
                    <h3>กรุณารอสักครู่.....</h3>
                </div>
            </div>

            <div align="center" class="modal-main-pwks" v-else-if="typeModal == 'success'" v-click-outside="closeModal">
                <div align="right">
                    <Icon name="material-symbols:close-rounded" class="close-modal-icon cursor-main"
                        @click="closeModal" />
                </div>
                <div class="modal-title-pwks" align="center">
                    <Icon name="ph:check-circle" class="success-icon mb-2 mt-2" />
                    <h2>สำเร็จ</h2>
                    <h4 class="fw-400">ทำรายการสำเร็จ</h4>
                </div>

                <div class="modal-footer-pwks mt-4" align="center">
                    <button class="btn btn-success rounded-pill fm-kanit" @click="closeModal">ปิด</button>
                </div>
            </div>

            <div align="center" class="modal-main-pwks" v-else-if="typeModal == 'warning-notify'"
                v-click-outside="closeModal">
                <div align="right">
                    <Icon name="material-symbols:close-rounded" class="close-modal-icon cursor-main"
                        @click="closeModal" />
                </div>
                <div class="modal-title-pwks" align="center">
                    <Icon name="ph:warning-circle" class="warning-icon mb-2 mt-2" />
                    <h2>{{ textWarningHead }}</h2>
                    <h4 class="fw-400">{{ textWarningContent }}</h4>
                </div>

                <div class="modal-footer-pwks mt-4" align="center">
                    <button class="btn btn-warning rounded-pill fm-kanit" @click="closeModal">ปิด</button>
                </div>
            </div>

            <div align="center" class="modal-main-pwks" v-else-if="typeModal == 'danger'" v-click-outside="closeModal">
                <div align="right">
                    <Icon name="material-symbols:close-rounded" class="close-modal-icon cursor-main"
                        @click="closeModal" />
                </div>
                <div class="modal-title-pwks" align="center">
                    <Icon name="ph:x-circle" class="danger-icon mb-2 mt-2" />
                    <h2>ไม่สำเร็จ</h2>
                    <h4 class="fw-400">ทำรายการไม่สำเร็จ</h4>
                </div>

                <div class="modal-footer-pwks mt-4" align="center">
                    <button class="btn btn-danger rounded-pill fm-kanit" @click="closeModal">ปิด</button>
                </div>
            </div>

            <div align="center" class="modal-main-pwks" v-else-if="typeModal == 'warning'">
                <div align="right">
                    <Icon name="material-symbols:close-rounded" class="close-modal-icon cursor-main"
                        @click="closeModal" />
                </div>
                <div class="modal-title-pwks" align="center">
                    <Icon name="ph:question" class="warning-icon mb-2 mt-2" />
                    <h2>ลบข้อมูล</h2>
                    <h4 class="fw-400">ต้องการลบข้อมูลนี้หรือไม่</h4>
                </div>

                <div class="modal-footer-pwks mt-4" align="center">
                    <button class="btn btn-warning rounded-pill fm-kanit me-3" @click="removeData(type)">
                        <Icon name="material-symbols:delete-outline" style="margin-top: -3%; font-size: 1.2rem;" />
                        ลบข้อมูล
                    </button>
                    <button class="btn btn-secondary rounded-pill fm-kanit" @click="cancelRemove">
                        <Icon name="pajamas:cancel" style="margin-top: -3%; font-size: 1.1rem;" />
                        ยกเลิก
                    </button>
                </div>
            </div>

            <div align="center" class="modal-main-pwks" v-else-if="typeModal == 'error-login'"
                v-click-outside="closeModal">
                <div align="right">
                    <Icon name="material-symbols:close-rounded" class="close-modal-icon cursor-main"
                        @click="closeModal" />
                </div>
                <div class="modal-title-pwks" align="center">
                    <Icon name="ph:x-circle" class="danger-icon mb-2 mt-2" />
                    <h2>ไม่สำเร็จ</h2>
                    <h4 class="fw-400">เข้าสู่ระบบไม่สำเร็จ กรุณาแจ้งผู้ดูแลระบบ</h4>
                </div>

                <div class="modal-footer-pwks mt-4" align="center">
                    <button class="btn btn-danger rounded-pill fm-kanit" @click="closeModal">ปิด</button>
                </div>
            </div>

            <div align="center" class="modal-main-pwks" v-else-if="typeModal == 'warning-login'"
                v-click-outside="closeModal">
                <div align="right">
                    <Icon name="material-symbols:close-rounded" class="close-modal-icon cursor-main"
                        @click="closeModal" />
                </div>
                <div class="modal-title-pwks" align="center">
                    <Icon name="ph:question" class="warning-icon mb-2 mt-2" />
                    <h2>ไม่สำเร็จ</h2>
                    <h4 class="fw-400">ชื่อผู้ใช้หรือรหัสผ่านผิด</h4>
                </div>

                <div class="modal-footer-pwks mt-4" align="center">
                    <button class="btn btn-warning rounded-pill fm-kanit" @click="closeModal">ปิด</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import callApi from '../api/callApi'
export default {
    setup() {


        return {}
    },
    props: {
        type: {
            type: String,
            default: 'schedule'
        },
        closeModal: {
            type: Function
        },
        daySchedule: {
            type: String,
        },
        column: {
            type: String,
        },
        period: {
            type: Number
        },
        listStudent: {
            type: Array,
            default: []
        },
        dataSchedule: {
            type: Object,
            default: {}
        },
        manageSchedule: {
            type: Function,
        },
        textWarningHead: {
            type: String,
        },
        textWarningContent: {
            type: String,
        },
    },
    data() {
        return {
            t_id: this.getStore().setAuth() ? this.getStore().setAuth().id : 1,
            term: this.getStore().setAuth() ? this.getStore().setAuth().term : 1,
            year: this.getStore().setAuth() ? this.getStore().setAuth().year : 2566,
            periodArray: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            timePeriod: [
                '08.40 - 09.30',
                '09.30 - 10.20',
                '10.20 - 11.10',
                '11.10 - 12.00',
                '12.00 - 13.00',
                '13.00 - 13.50',
                '13.50 - 14.40',
                '14.40 - 15.30',
                '15.30 - 16.20',
            ],
            roomList: [1, 2, 3, 4, 5, 6],
            typeModal: '',
            checkChangeSchedule: false,
            classSchedule: '',
            roomSchedule: '',
            subjectName: '',
            subjectCode: '',
            activitySchedule: '',
            vcGrade: false,
            checkValidate: {
                schedule: false
            },
            dataSubject: [],
            subject: '',
            activitySubject: [
                {
                    key: 'act_1',
                    name: 'ลูกเสือเนตนารี'
                },
                {
                    key: 'act_2',
                    name: 'ชุมนุม'
                },
                {
                    key: 'act_3',
                    name: 'แนะแนว'
                },
                {
                    key: 'act_4',
                    name: 'อบรม'
                },
                {
                    key: 'act_5',
                    name: 'บำเพ็ญประโยชน์'
                },
            ]
        }
    },
    async mounted() {
        this.typeModal = this.type
        await this.getSubject()
        if (this.dataSchedule.class !== undefined && this.dataSchedule.class != '') {
            console.log(this.dataSchedule, `${this.dataSchedule.code}_${this.dataSchedule.nameSubject}`);
            this.subject = `${this.dataSchedule.code}_${this.dataSchedule.nameSubject}`
            this.classSchedule = this.dataSchedule.class
            this.roomSchedule = this.dataSchedule.room
            this.checkChangeSchedule = true

        } else if (this.dataSchedule.activityName !== undefined && this.dataSchedule.activityName != '') {
            for (const s of this.activitySubject) {
                if(s.name == this.dataSchedule.activityName){
                    this.subject = s.key
                    break
                }
            }
            this.checkChangeSchedule = false
        }

    },
    methods: {
        async manageSchedule() {
            let checkValidate = this.validateSchedule()

            if (checkValidate) {
                this.checkValidate.schedule = false

                let name = this.subjectCheck()
                let subject = ''

                if (name != '') {
                    subject = name

                } else {
                    subject = `${this.subject}_${this.classSchedule}_${this.roomSchedule}`
                }

                let data = {
                    t_id: this.t_id,
                    column: this.column,
                    subject: subject,
                    term: this.term,
                    year: this.year,
                }

                this.typeModal = 'loading'

                await callApi.addAndEditSchedule(data).then(res => {
                    if (res.code == 0) {
                        this.typeModal = 'success'
                        this.manageSchedule()
                    } else {
                        this.typeModal = 'danger'
                    }
                })
            }
        },
        async removeData(type) {
            this.typeModal = 'loading'
            if (type == 'edit-schedule') {

                let data = {
                    t_id: this.t_id,
                    column: this.column,
                    term: this.term,
                    year: this.year,
                }

                await callApi.removeSchedule(data).then(res => {
                    if (res.code == 0) {
                        this.typeModal = 'success'
                        this.manageSchedule()
                    } else {
                        this.typeModal = 'danger'
                    }
                })
            }
        },

        async getSubject() {
            await callApi.getSubjectByYearAndYear({ t_id: this.t_id, term: this.term, year: this.year, }).then(res => {
                if (res.code == 0) {
                    this.dataSubject = res.result;
                }
            }).catch(err => {

            })
        },

        subjectCheck() {
            let check = false
            let name = ''

            for (const s of this.activitySubject) {
                if (s.key == this.subject) {
                    this.checkChangeSchedule = false
                    check = true
                    name = s.name
                    break
                }
            }

            if (!check) {
                this.checkChangeSchedule = true
            }

            return name
        },

        validateSchedule() {
            if (!this.checkChangeSchedule) {
                if (this.subject == '') {
                    this.checkValidate.schedule = true

                    return false
                }

            } else if (this.checkChangeSchedule) {
                if (this.classSchedule == '' || this.roomSchedule == '' || this.subject == '') {
                    this.checkValidate.schedule = true

                    return false

                }
            }


            return true
        },
        vcCheck() {
            if (this.classSchedule == 'vc') {
                this.vcGrade = true
                this.roomList = [1, 2, 3]
            } else {
                this.vcGrade = false
                this.roomList = [1, 2, 3, 4, 5, 6]
            }
        },
        warningModal() {
            this.typeModal = 'warning'
        },
        cancelRemove() {
            this.typeModal = 'edit-schedule'
            // this.closeModal()
        }
    },
}
</script>

<style lang="css" scoped>
.bg-modal {
    position: fixed;
    inset: 0;
    background-color: rgba(26, 33, 42, 0.75);
    z-index: 100000;
    transition: 10s;
    overflow: auto;
}

.modal-main-pwks {
    position: relative;
    padding: 1rem;
    outline: none;
    max-width: 40rem;
    margin: 10vh auto;
    background-color: white;
    border-radius: 8px;
}

.modal-title-pwks {
    padding: 10px 0;
    margin-top: -1rem;
}

.modal-content-pwks {
    width: 30rem;
}

.modal-footer-pwks {}

.close-modal-icon {
    font-size: 1.8rem;
}

.close-modal-icon:hover {
    color: var(--color-danger);
}

.modal-content-pwks .form-select {
    padding: 0 2rem;
    font-size: 1rem;
}

.loading-icon {
    font-size: 5rem;
    color: var(--color-school);
}

.success-icon {
    color: var(--color-success);
    font-size: 10rem;
}

.danger-icon {
    color: var(--color-danger);
    font-size: 10rem;
}

.warning-icon {
    color: var(--color-warning);
    font-size: 10rem;
}

/* Check Slide */
.form-switch .form-check-input {
    width: 2.5rem;
}

.form-check-input-h {
    height: 1.5rem !important;
}

.form-check-input:checked {
    background-color: var(--color-school);
    border-color: var(--color-school);
}

/* Attend Class */
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

.form-check-input {
    height: 1rem;
}

.fm-kanit {
    font-size: 0.8rem;
}

.table>:not(caption)>*>* {
    padding: 0.3rem 0.3rem;
}

/* Input Class And Detail */
.input-detail {
    width: 100%;
}

.input-class {
    width: 100%;
}

@media screen and (min-width: 320px) and (max-width: 360px) {
    .modal-main-pwks {
        max-width: 320px;
    }

    .input-detail {
        width: 290px;
    }

    .input-class {
        width: 138px;
    }

    .fs-head {
        font-size: 0.6rem;
    }

    .fs-body {
        font-size: 0.8rem;
    }

    .table {
        width: 295px !important;
    }

    .form-floating {
        width: 290px;
    }

    .form-check-input {
        height: 1rem;
    }
}

@media screen and (min-width: 360px) and (max-width: 375px) {

    .modal-main-pwks {
        max-width: 360px;
    }

    .input-detail {
        width: 320px;
    }

    .input-class {
        width: 152px;
    }

    .fs-head {
        font-size: 0.6rem;
    }

    .fs-body {
        font-size: 0.8rem;
    }

    .table {
        width: 325px !important;
    }

    .form-floating {
        width: 325px;
    }

    .form-check-input {
        height: 0.8rem;
    }
}

@media screen and (min-width: 375px) and (max-width: 390px) {

    .modal-main-pwks {
        max-width: 375px;
    }

    .input-detail {
        width: 350px;
    }

    .input-class {
        width: 167px;
    }

    .fs-head {
        font-size: 0.6rem;
    }

    .fs-body {
        font-size: 0.8rem;
    }

    .table {
        width: 345px !important;
    }

    .form-floating {
        width: 345px;
    }

    .form-check-input {
        height: 0.8rem;
    }
}

@media screen and (min-width: 390px) and (max-width: 420px) {

    .modal-main-pwks {
        max-width: 390px;
    }

    .input-detail {
        width: 360px;
    }

    .input-class {
        width: 172px;
    }

    .fs-head {
        font-size: 0.6rem;
    }

    .fs-body {
        font-size: 0.8rem;
    }

    .table {
        width: 360px !important;
    }

    .form-floating {
        width: 360px;
    }

    .form-check-input {
        height: 0.9rem;
    }
}

@media screen and (min-width: 420px) and (max-width: 490px) {

    .modal-main-pwks {
        max-width: 420px;
    }

    .input-detail {
        width: 380px;
    }

    .input-class {
        width: 182px;
    }

    .fs-head {
        font-size: 0.6rem;
    }

    .fs-body {
        font-size: 0.8rem;
    }

    .table {
        width: 390px !important;
    }

    .form-floating {
        width: 390px;
    }

    .form-check-input {
        height: 0.9rem;
    }
}

@media screen and (min-width: 490px) and (max-width: 590px) {

    .modal-main-pwks {
        max-width: 490px;
    }

    .input-detail {
        width: 460px;
    }

    .input-class {
        width: 222px;
    }

    .fs-head {
        font-size: 0.6rem;
    }

    .fs-body {
        font-size: 0.8rem;
    }

    .table {
        width: 460px !important;
    }

    .form-floating {
        width: 460px;
    }

    .form-check-input {
        height: 0.9rem;
    }
}

@media screen and (min-width: 590px) and (max-width: 690px) {

    .modal-main-pwks {
        max-width: 590px;
    }

    .input-detail {
        width: 480px;
    }

    .input-class {
        width: 252px;
    }

    .fs-head {
        font-size: 0.6rem;
    }

    .fs-body {
        font-size: 0.8rem;
    }

    .table {
        width: 470px !important;
    }

    .form-floating {
        width: 470px;
    }

    .form-check-input {
        height: 0.9rem;
    }
}
</style>