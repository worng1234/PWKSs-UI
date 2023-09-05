<template>
    <div align="center">
        <div class="block-profile">
            <div class="block-bg-profile">
                <div class="box-head-profile">
                    <div align="left" class="ms-5 d-flex">
                        <img src="../assets/img/user-img/user-profile.png" alt="profile" class="img-profile" >
                        <div class="ms-3 mt-1">
                            <h1 class="fw-700" style="padding: 0 0 0 0; margin: 0 0 0 0;">กิตติกรณ์ อรุณภพ</h1>
                            <h2 class="fw-700" style="opacity: 0.4;">Kittikorn Arunpop</h2>
                        </div>
                    </div>
                    <div class="mt-3 me-3">
                        <button class="btn btn-main btn-edit-profile">
                            <Icon name="material-symbols:settings-account-box-outline"/>
                        </button>
                    </div>
                </div>
                
                <div class="block-main-detail-profile">
                    <div class="divider-solid"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="css" scoped>

.block-profile{
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

.block-bg-profile {
    width: 1020px;
    background-color: white;
    border-radius: 10px;
}

.block-main-detail-profile {
    width: 956px;
    padding: 20px 20px;
}

.box-head-profile{
    display: flex;
    justify-content: space-between;
}

.btn-edit-profile{
    padding: 0 7px;
    margin: 0 0 0 0;
    font-size: 24px;
}
</style>