<template>
    <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }" v-for="(item, index) in list" :key='index'>{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    name:'crumbs',
    components: {
        
    },
    props: ['list'],
    data(){
        return{
            
        }
    },
    methods:{

    }
}
</script>
<style lang="scss">
.crumbs{
    .el-breadcrumb{
        height:14px;
        line-height:14px;
        span{
            .el-breadcrumb__inner{
                font-size:12px;
                font-family:Helvetica;
                color:rgba(102,102,102,1);
                font-weight: 100;
            }
            &:last-child{
                span{
                    font-weight:bold;
                }
            }
        }
    }
}
</style>