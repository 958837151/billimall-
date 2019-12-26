<template>
    <div class="step">
        <el-steps :active="active" finish-status="success">
            <el-step title="Verify identity"></el-step>
            <el-step :title="msgFather"></el-step>
            <el-step title="Finished"></el-step>
        </el-steps>
        <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    </div>
</template>
<script>
export default {
    name:'step',
    props: ['msgFather'],
    data(){
        return{
            active: 0,
        }
    },
    methods:{
        next() {
            if (this.active++ > 2) this.active = 0;
        },
    }
}
</script>
<style lang="scss">
.step{
    .el-step{
        .el-step__head.is-wait{
            left: 36px;
            color: #DEDEDE;
            border-color: #DEDEDE;
        }
        .el-step__head.is-process{
            left: 36px;
            color: #FF7805;
            border-color: #FF7805;
            .el-step__icon{
                background-color: #FF7805;
            }
            .el-step__icon-inner{
                color: #fff;
            }
        }
        .el-step__head.is-success{
            left: 36px;
            color: #FF7805;
            border-color: #FF7805;
            .el-step__icon.is-text{
                color: #FF7805;
                border-color: #FF7805;
            }
            .el-step__line{
                background-color: #FF7805;
            }
            .el-step__icon{
                background-color: #FF7805;
            }
            .el-step__icon-inner{
                color: #fff;
            }
        }
        .el-step__title.is-success{
            color: #FF7805;
            border-color: #FF7805;
        }
        .el-step__title.is-process{
            color: #FF7805;
            border-color: #FF7805;
        }
        .el-step__icon{
            width: 32px;
            height: 32px;
            background-color: #DEDEDE;
            color: #fff;
        }
    }
    .el-step.is-horizontal .el-step__line{
        top: 15px;
        width: 200px;
        left: 85px;
    }
}
</style>