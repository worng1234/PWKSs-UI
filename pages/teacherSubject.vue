<template>
    <div align="center">
        <div class="block-main" id="to-top-subject">
            <div class="block-bg-main">
                <div class="p-teacher-subject">

                    <div class="mt-3 mb-3">
                        <h3>{{ textHead }}</h3>
                    </div>

                    <div class="box-add-subject mt-3 mb-3">

                        <div class="input-group me-3 mt-3 input-detail">
                            <label class="input-group-text" for="class-add">รหัสวิชา</label>
                            <input type="text" class="form-control" id="class-add" placeholder="กรอกรหัสวิชา"
                                v-model="subjectCode">
                        </div>

                        <div class="input-group me-3 mt-3 input-detail">
                            <label class="input-group-text" for="class-add">ชื่อวิชา</label>
                            <input type="text" class="form-control" id="class-add" placeholder="กรอกชื่อวิชา"
                                v-model="subjectName">
                        </div>

                        <div class="d-flex justify-content-center danger-input mt-3" v-if="checkValidate.subject">
                            <Icon name="ph:warning-circle-bold" class="mt-1 me-1" />
                            <p>กรุณากรอกข้อมูลให้ครบถ้วน</p>
                        </div>

                        <div class="modal-footer-pwks mt-3" align="center" v-if="!editForm">
                            <button class="btn btn-main rounded-pill fm-kanit me-2" @click="submitForm()">
                                <Icon name="humbleicons:save" style="margin-top: -3%; font-size: 1.2rem;" />
                                บันทึก
                            </button>
                        </div>

                        <div class="modal-footer-pwks mt-3" align="center" v-else-if="editForm">
                            <button class="btn btn-main rounded-pill fm-kanit me-2" @click="submitForm()">
                                <Icon name="humbleicons:save" style="margin-top: -3%; font-size: 1.2rem;" />
                                แก้ไข
                            </button>
                            <button class="btn btn-danger rounded-pill fm-kanit" @click="resetForm()">
                                ยกเลิก
                            </button>
                        </div>

                    </div>

                    <div class="p-table-teacher-subject mt-1">
                        <table class="table table-striped" align="center">
                            <thead class="fs-head" align="center">
                                <tr>
                                    <th scope="col" class="th-color-main fm-kanit fw-500"
                                        style="border-radius: 8px 0 0 0;">
                                        รหัสวิชา</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500">ชื่อวิชา</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500">เทอม/ปีการศึกษา</th>
                                    <th scope="col" class="th-color-main fm-kanit fw-500"
                                        style="border-radius: 0 8px 0 0;">
                                        จัดการ</th>
                                </tr>
                            </thead>
                            <tbody align="center">
                                <tr v-if="dataSubject.length > 0" v-for="subject in dataSubject">
                                    <td class="fm-kanit fw-500">{{ subject.subject_code }}</td>
                                    <td class="fm-kanit fw-500">{{ subject.subject_name }}</td>
                                    <td class="fm-kanit fw-500">{{ subject.term }}/{{ subject.year }}</td>
                                    <td class="fm-kanit fw-500">
                                        <button class="btn btn-main me-2" style="padding: 1px 10px !important;"
                                            @click="preEdit(subject)">
                                            <Icon name="material-symbols:edit-document-outline"
                                                style="padding: 0 0; margin: 0 0; font-size: 1.5rem;"
                                                class="fm-kanit" />
                                        </button>
                                        <button class="btn btn-danger" style="padding: 1px 10px !important;"
                                            @click="removeSubject(subject)">
                                            <Icon name="material-symbols:delete-outline"
                                                style="padding: 0 0; margin: 0 0; font-size: 1.5rem;"
                                                class="fm-kanit" />
                                        </button>
                                    </td>
                                </tr>

                                <tr v-if="dataSubject.length == 0">
                                    <td class="fm-kanit fw-500" colspan="4">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    </div>

    <Modal v-if="isModal" :closeModal="closeModal" :type="typeModal" :textWarningHead="textWarningHead" :textWarningContent="textWarningContent"/>

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
            term: this.getStore().setAuth() ? this.getStore().setAuth().term : 1,
            year: this.getStore().setAuth() ? this.getStore().setAuth().year : 2566,
            id: 0,
            subjectCode: "",
            subjectName: "",
            checkValidate: {
                subject: false
            },
            dataSubject:[

            ],

            isModal: false,
            typeModal: '',
            textWarningHead: 'ไม่สำเร็จ',
            textWarningContent: 'มีรายวิชานี้อยู่แล้ว',
            textHead: 'เพิ่มรายวิชา',
            editForm: false
        }
    },

    mounted() {
        this.getSubject()
    },

    methods: {

        async getSubject() {
            await callApi.getSubjectByTId({t_id: this.t_id}).then( res => {
                if(res.code == 0){
                    this.dataSubject = res.result;
                }
            }).catch( err => {

            })
        },

        async submitForm() {
            let check = this.validateForm()

            if (!check) {
                this.checkValidate.subject = true
                return false
            }

            if(this.id != 0){
                await this.editSubject()
            }else{
                await this.addSubject()
            }
        },

        preEdit(data){
            this.id = data.id,
            this.subjectCode = data.subject_code
            this.subjectName = data.subject_name

            this.textHead = 'แก้ไขรายวิชา'
            this.editForm = true

            document.getElementById('to-top-subject').scrollIntoView({ behavior: "smooth", block: "start" });
        },

        async addSubject() {

            let data = {
                t_id: this.t_id,
                subject_code: this.subjectCode,
                subject_name: this.subjectName,
                term: this.term,
                year: this.year,
            }

            this.typeModal = 'loading'
            this.isModal = true

            await callApi.addTeacherSubject(data).then( res => {
                this.typeModal = ''
                this.isModal = false
                
                setTimeout(() => {
                    if(res.code == 0){
                        this.alertModal('success', 'สำเร็จ', 'เพิ่มรายวิชาสำเร็จ')
                    }else if (res.code == 204){
                        this.alertModal('warning', 'ไม่สำเร็จ', 'มีรายวิชานี้อยู่แล้ว')
                    }else if (res.code == 400) {
                        this.alertModal('error', 'ไม่สำเร็จ', 'ไม่สามารถเพิ่มรายวิชาได้')
                    }
                }, 500);
                
            }).catch( err => {
                this.typeModal = ''
                this.isModal = false
                
                setTimeout(() => {
                    this.alertModal('error', 'ไม่สำเร็จ', 'ไม่สามารถเพิ่มรายวิชาได้')
                }, 500);
            })

            this.resetForm()
        },

        async editSubject() {

            let data = {
                id: this.id,
                subject_code: this.subjectCode,
                subject_name: this.subjectName,
            }

            this.typeModal = 'loading'
            this.isModal = true

            await callApi.editTeacherSubject(data).then( res => {
                this.typeModal = ''
                this.isModal = false
                
                setTimeout(() => {
                    if(res.code == 0){
                        this.alertModal('success', 'สำเร็จ', 'แก้ไขรายวิชาสำเร็จ')
                    }else if (res.code == 204){
                        this.alertModal('warning', 'ไม่สำเร็จ', 'ไม่พบรายวิชาที่แก้ไข')
                    }else if (res.code == 400) {
                        this.alertModal('error', 'ไม่สำเร็จ', 'ไม่สามารถเพิ่มรายวิชาได้')
                    }
                }, 500);

            }).catch( err => {
                this.typeModal = ''
                this.isModal = false
                
                setTimeout(() => {
                    this.alertModal('error', 'ไม่สำเร็จ', 'ไม่สามารถเพิ่มรายวิชาได้')
                }, 500);
                
            })

            this.resetForm()
        },

        async removeSubject(data) {
            await this.swal.$swal.fire({
                title: 'ลบข้อมูล',
                text: 'ต้องการลบรายวิชานี้หรือไม่',
                icon: 'question',
                allowOutsideClick: false,
                confirmButtonText: 'ลบ',
                confirmButtonColor: '#fbce02',
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก'
            }).then( async res => {
                console.log(res);
                if(res && res.isConfirmed){
                    await callApi.removeTeacherSubject({ id: data.id}).then( res => {
                        if(res.code == 0){
                            this.alertModal('success', 'สำเร็จ', 'ดำเนินการลบข้อมูลเรียบร้อยแล้ว')
                        }else{
                            throw Error('')
                        }
                    }).carch( err => {
                        this.alertModal('error', 'ผิดพลาด', 'เกิดข้อผิดพลาดไม่สามารถลบข้อมูลได้')
                    })
                }
            })
            
        },

        validateForm() {

            if (this.subjectCode == '' || this.subjectName == '') {
                return false
            }

            return true
        },

        closeModal() {
            this.isModal = false
            this.typeModal = ''

            window.location.reload()
        },

        resetForm(){
            this.id = 0
            this.subjectCode = ''
            this.subjectName = ''

            this.textHead = 'เพิ่มรายวิชา'
            this.editForm = false
        }
    },
}
</script>

<style lang="scss" scoped>
.p-teacher-subject {
    padding: 0.25rem 3rem;
}

.box-add-subject {
    width: 300px;
    padding: 10px;
    border: 1px solid #bd72ff;
    border-radius: 8px;
}

.p-table-teacher-subject{
    padding: 1rem;
}
</style>