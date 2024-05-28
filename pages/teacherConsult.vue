<template>
    <div align="center">
        <div class="block-main" id="to-top-subject">
            <div class="block-bg-main">
                <div class="p-box-main">

                    <div class="mt-3 mb-3">
                        <h3>ครูที่ปรึกษา ประจำปีการศึกษา {{ year }}</h3>
                    </div>

                    <div class="box-add-consult mt-3 mb-3" v-if="!switchEdit">

                        <div class="mt-3">
                            <div class="input-group me-3 input-class">
                                <label class="input-group-text" for="class-add">ระดับชั้น</label>
                                <select class="form-select" id="class-add" v-model="classSchedule" @change="vcCheck()" disabled>
                                    <option value="1">ม.1</option>
                                    <option value="2">ม.2</option>
                                    <option value="3">ม.3</option>
                                    <option value="4">ม.4</option>
                                    <option value="5">ม.5</option>
                                    <option value="6">ม.6</option>
                                    <option value="vc">ปวช.</option>
                                </select>
                            </div>

                            <div class=" mt-3 input-group input-class">
                                <label class="input-group-text" for="room-add">{{ vcGrade ? 'ปี' : 'ห้อง' }}</label>
                                <select class="form-select" id="room-add" v-model="roomSchedule" disabled>
                                    <option selected value="0"></option>
                                    <option :value="room" v-for=" room in roomList">{{ room }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center danger-input mt-3" v-if="checkValidate.subject">
                            <Icon name="ph:warning-circle-bold" class="mt-1 me-1" />
                            <p>กรุณากรอกข้อมูลให้ครบถ้วน</p>
                        </div>

                        <div class="modal-footer-pwks mt-3" align="center">
                            <button class="btn btn-warning rounded-pill fm-kanit me-2" @click="editForm()">
                                <Icon name="material-symbols:edit-outline" style="margin-top: -3%; font-size: 1.2rem;" />
                                แก้ไข
                            </button>
                        </div>

                    </div>

                    <div class="box-add-consult mt-3 mb-3" v-else-if="switchEdit">

                        <div class="mt-3">
                            <div class="input-group me-3 input-class">
                                <label class="input-group-text" for="class-add">ระดับชั้น</label>
                                <select class="form-select" id="class-add" v-model="classSchedule" @change="vcCheck()">
                                    <option value="1">ม.1</option>
                                    <option value="2">ม.2</option>
                                    <option value="3">ม.3</option>
                                    <option value="4">ม.4</option>
                                    <option value="5">ม.5</option>
                                    <option value="6">ม.6</option>
                                    <option value="vc">ปวช.</option>
                                </select>
                            </div>

                            <div class=" mt-3 input-group input-class">
                                <label class="input-group-text" for="room-add">{{ vcGrade ? 'ปี' : 'ห้อง' }}</label>
                                <select class="form-select" id="room-add" v-model="roomSchedule">
                                    <option selected value="0"></option>
                                    <option :value="room" v-for=" room in roomList">{{ room }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center danger-input mt-3" v-if="checkValidate.subject">
                            <Icon name="ph:warning-circle-bold" class="mt-1 me-1" />
                            <p>กรุณากรอกข้อมูลให้ครบถ้วน</p>
                        </div>

                        <div class="modal-footer-pwks mt-3" align="center">
                            <button class="btn btn-main rounded-pill fm-kanit me-2" @click="submitEdit()">
                                <Icon name="humbleicons:save" style="margin-top: -3%; font-size: 1.2rem;" />
                                บันทึก
                            </button>
                            <button class="btn btn-danger rounded-pill fm-kanit" @click="cancelEdit()">
                                ยกเลิก
                            </button>
                        </div>

                    </div>

                    <div class="p-table-teacher-consult mt-1">
                        <table class="table table-striped" align="center">
                            <thead class="fs-head" align="center">
                                <tr>
                                    <th scope="col" class="th-color-main fm-kanit fw-500"
                                        style="border-radius: 8px 0 0 0;">
                                        ปีการศึกษา</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500">ระดับชั้น</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500"
                                        style="border-radius: 0 8px 0 0;">
                                        ห้อง/ปี</th>
                                </tr>
                            </thead>
                            <tbody align="center">
                                <tr v-if="dataConsult.length > 0" v-for="consult in dataConsult">
                                    <td class="fm-kanit fw-500">{{ consult.year }}</td>
                                    <td class="fm-kanit fw-500" v-if="consult.class == 'vc'">ปวช.</td>
                                    <td class="fm-kanit fw-500" v-else>ม.{{ consult.class }}</td>
                                    <td class="fm-kanit fw-500">{{ consult.room }}</td>
                                </tr>

                                <tr v-if="dataConsult.length == 0">
                                    <td class="fm-kanit fw-500" colspan="3">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <Modal v-if="isModal" :type="typeModal" />

</template>

<script>
import callApi from '../api/callApi'

export default {
    setup() {
        const swal = getCurrentInstance().appContext.config.globalProperties;
        return {swal}
    },

    data() {
        return {
            t_id: this.getStore().setAuth() ? this.getStore().setAuth().id : 1,
            year: this.getStore().setAuth() ? this.getStore().setAuth().year : 2566,
            checkValidate: {
                subject: false
            },
            roomList: [1, 2, 3, 4, 5, 6],
            classSchedule: '',
            roomSchedule: '',
            dataConsult: [],
            switchEdit: false,

            typeModal: '',
            isModal: false,
        }
    },

    mounted() {
        this.getConsult()
    },

    methods: {
        async getConsult () {

            let data = {
                t_id: this.t_id,
            }

            await callApi.getConsult(data).then( res => {
                if(res.code == 0){
                    console.log(res.result);
                    this.classSchedule = res.result[0].class
                    this.roomSchedule = res.result[0].room
                    this.dataConsult = res.result
                }
            }).catch( err => {
                
            })
        },

        async submitEdit(){
            this.typeModal = 'loading'
            this.isModal = true

            let data = {
                t_id: this.t_id,
                class: this.classSchedule,
                room: this.roomSchedule,
                year: this.year
            }

            await callApi.editConsult(data).then( res => {
                this.typeModal = ''
                this.isModal = false

                setTimeout(() => {
                    if(res.code == 0){
                        this.alertModal('success', 'สำเร็จ', 'แก้ไขชั้นเรียนและห้องเรียบร้อยแล้ว')
                    }else{
                        this.alertModal('error', 'ข้อผิดพลาด', 'พบข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
                    }
                }, 100);
                
            }).catch( err => {
                this.typeModal = ''
                this.isModal = false

                setTimeout(() => {
                    this.alertModal('error', 'ข้อผิดพลาด', 'พบข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
                },100)
                
            })
        },

        editForm(){
            this.switchEdit = true
        },

        cancelEdit(){
            this.switchEdit = false
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
    },
}
</script>

<style lang="scss" scoped>
.box-add-consult {
    width: 300px;
    padding: 10px;
    border: 1px solid #bd72ff;
    border-radius: 8px;
}

.p-table-teacher-consult {
    padding: 1rem;
}
</style>