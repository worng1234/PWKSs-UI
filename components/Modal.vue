<template>
    <div>
        <div class="bg-modal">

            <div align="center" class="modal-main-pwks" v-if="typeModal == 'add-schedule'" v-click-outside="closeModal">
                <div align="right">
                    <Icon name="material-symbols:close-rounded" class="close-modal-icon cursor-main" @click="closeModal" />
                </div>
                <div class="modal-title-pwks" align="center">
                    <h2>เพิ่มตารางเรียน</h2>
                </div>
                <div class="modal-content-pwks mt-3" align="left">
                    <div>
                        <p>วัน : {{ daySchedule }}</p>
                        <p>คาบที่ : {{ periodArray[period] }}</p>
                        <p>ช่วงเวลา : {{ timePeriod[period] }}</p>
                        <div class="d-flex">
                            <div class="input-group me-3">
                                <span class="input-group-text" id="basic-addon1">ชั้นเรียน</span>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div class="input-group ">
                                <span class="input-group-text" id="basic-addon1">ห้องเรียน</span>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer-pwks mt-4" align="center">
                    <button class="btn btn-main rounded-pill fm-kanit" style="padding: 3px 25px ;">บันทึก</button>
                </div>
            </div>

            <div align="center" class="modal-main-pwks" v-else-if="typeModal == 'edit-schedule'"
                v-click-outside="closeModal">
                <div align="right">
                    <Icon name="material-symbols:close-rounded" class="close-modal-icon cursor-main" @click="closeModal" />
                </div>
                <div class="modal-title-pwks" align="center">
                    <h2>แก้ไขตารางเรียน</h2>
                </div>
                <div class="modal-content-pwks mt-3" align="left">
                    <div>
                        <p>วัน : {{ daySchedule }}</p>
                        <p>คาบที่ : {{ periodArray[period] }}</p>
                        <p>ช่วงเวลา : {{ timePeriod[period] }}</p>
                        <div class="d-flex">
                            <div class="input-group me-3">
                                <span class="input-group-text" id="basic-addon1">ชั้นเรียน</span>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div class="input-group ">
                                <span class="input-group-text" id="basic-addon1">ห้องเรียน</span>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer-pwks mt-4" align="center">
                    <button class="btn btn-main rounded-pill fm-kanit" style="padding: 3px 25px ;">บันทึก</button>
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
    props: {
        typeModal: {
            type: String,
            default: 'schedule'
        },
        closeModal: {
            type: Function
        },
        daySchedule: {
            type: String,
        },
        period: {
            type: Number
        }
    },
    data() {
        return {
            periodArray: [ 1,2,3,4,5,6,7,8,9],
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
            ]
        }
    },
    mounted() {
        console.log(this.daySchedule);
        console.log(this.period);
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
    margin: 30vh auto;
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
</style>