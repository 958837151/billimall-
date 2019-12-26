<template>
    <div class="chose-list">
            <el-row class="tac">
                <el-col unique-opened="true">
                    <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <span>Related Categories</span>
                        </template>
                        <div v-for="(item, index) in goodsData.categories" :key="index" style="text-align: left;padding-left: 12px;line-height: 30px;" @click.prevent.stop="one(item)">
                            {{ item.name }}
                            <div v-for="(two_item, index) in item.children" :key="index" style="padding-left: 20px;line-height: 30px;" @click.prevent.stop="two(two_item)">
                                {{ two_item.name }}
                                <div v-for="(three_item, index) in two_item.children" :key="index" style="padding-left: 20px;line-height: 30px;" @click.prevent.stop="three(three_item)">{{ three_item.name }}</div>
                            </div>
                        </div>
                        <!-- <el-menu-item-group>
                            <el-menu-item :index="index" v-for="(item, index) in goodsData.categories" :key="index">{{ item.name }}</el-menu-item>
                        </el-menu-item-group> -->
                        <!-- <el-submenu index="1-4" class="view-more">
                            <template slot="title">View More</template>
                            <el-menu-item index="1-4-1">aaa</el-menu-item>
                            <el-menu-item index="1-4-2">aaa</el-menu-item>
                            <el-menu-item index="1-4-3">aaa</el-menu-item>
                            <el-menu-item index="1-4-4">aaa</el-menu-item>
                        </el-submenu>     -->
                    </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>   
            
            <!-- <el-row class="tac tac-size">
                <div class="chose-alert" v-show="isAlert">
                    <div class="alert-content">
                        <el-checkbox-group v-model="checkList">
                            <p>
                                <el-checkbox label="复选框 B"></el-checkbox>
                            </p>
                            <p>
                                <el-checkbox label="复选框 C"></el-checkbox>
                            </p>
                            <p>
                                <el-checkbox label="复选框 d"></el-checkbox>
                            </p>
                            <p>
                                <el-checkbox label="复选框 e"></el-checkbox>
                            </p>
                            <p>
                                <el-checkbox label="复选框 f"></el-checkbox>
                            </p>
                            <p>
                                <el-checkbox label="复选框 g"></el-checkbox>
                            </p>
                            <p>
                                <el-checkbox label="复选框 h"></el-checkbox>
                            </p>

                        </el-checkbox-group>
                    </div>
                    <div class="alert-btn">
                        <span class="alert-ok" @click.stop="choseMoreYes">OK</span>
                        <span class="alert-cancel" @click.stop="choseMore">Cancel</span>
                    </div>
                </div>
                <el-col unique-opened="true">
                    <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                        <span>Size</span> <span class="chose-more" @click.stop="choseMore">Choose More</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1">Dresses</el-menu-item>
                        <el-menu-item index="1-2">Blouses & Shirts</el-menu-item>
                        <el-menu-item index="1-3">Blouses & Shirts</el-menu-item>
                        <el-menu-item index="1-4">Blouses & Shirts</el-menu-item>
                        <el-menu-item index="1-5">Blouses & Shirts</el-menu-item>
                        <el-menu-item index="1-6">Blouses & Shirts</el-menu-item>
                        </el-menu-item-group>
                         <el-submenu index="1-4" class="view-more">
                        <template slot="title">View More</template>
                        <el-menu-item index="1-4-1">aaa</el-menu-item>
                        <el-menu-item index="1-4-2">aaa</el-menu-item>
                        <el-menu-item index="1-4-3">aaa</el-menu-item>
                        <el-menu-item index="1-4-4">aaa</el-menu-item>
                        </el-submenu>    
                    </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>    -->
    </div>
</template>
<script>
export default {
    props: ["goodsData"],
    data(){
        return{
            isAlert:false,
            checkList: [],
            clickCategories:""
        }   
    },
    watch: {
        clickCategories(val){
            this.$emit("clickCategoriesVal",val)
        }
    },
    created() {
        
    },
    methods: {
        one(val){
            this.clickCategories=val.id
        },
        two(val){
            this.clickCategories=val.id
        },
        three(val){
            this.clickCategories=val.id
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        choseMore(){
            this.isAlert = !this.isAlert
            console.log(this.checkList)
        },
        choseMoreYes(){
            this.isAlert = !this.isAlert
            // 发送请求
        }
    }
}
</script>
<style lang="scss" scoped>
    .chose-list{
        width: 240px;
        color: #333;
        background-color: #fff;
    }
    .tac{
        border-bottom: 1px solid #DEDEDE;
        padding-bottom: 20px;
        
    }
  .chose-list /deep/ .el-submenu__icon-arrow{
       right: 90%;
       font-weight: bolder;
       color: #000;
   }
   .chose-list /deep/ .el-menu-item{
        font-size: 12px;
        color: #333;
        height: 30px;
        line-height: 30px;
        text-align: left;
    }
    .chose-list /deep/ .el-submenu__title{
        font-size: 12px;
        font-weight: bold;
        height: 30px;
        line-height: 30px;
        text-align: left;
        padding-left: 40px!important;
    }
    .chose-list /deep/ .el-menu-item-group__title{
        display: none;
    }
    .chose-list /deep/ .el-menu{
        border: none;
    }
    .view-more /deep/ .el-submenu__icon-arrow{
        right: 50%;
        color: #999;
    }
    .view-more /deep/ .el-submenu__title{
        font-weight:normal;
        color: #999;
    }
    .view-more /deep/ .el-menu-item{
        padding-left: 40px!important;
    }
    .tac-size{
        margin-top: 12px;
        position: relative;
    }
    .chose-more{
        color:#999;
        display:inline-block;
        width:78px;
        position: relative;
        right: -85px;
        z-index: 1000;
    }
   .chose-alert{
       position: absolute;
        top: 32px;
        left: 10px;
       width: 216px;
       height: 219px;
       border: 1px solid #DEDEDE;
       box-sizing: border-box;
       z-index: 100;
       background-color: #fff;
       .alert-content{
            height: 170px;
            text-align: left;
            font-size: 12px;
            border-bottom: 1px solid #DEDEDE;  
            overflow: hidden; 
            overflow-y: scroll;
            &::-webkit-scrollbar{
                width: 1px;
            }
            &::-webkit-scrollbar-thumb{
                border-radius: 10px;
                background: rgba(0,0,0,0.2);
            }
            p{
                padding: 12px 0 0 12px;
            }
       }
       .alert-btn{
           height: 44px;
           span{
               margin-top: 10px;
               display: inline-block;
               height: 24px;
               width: 88px;
               line-height: 24px;
               font-size: 12px;
               background-color: #FEB610;
               border-radius: 4px;
               margin-right: 7px;
               cursor: pointer;
           }
           .alert-cancel{
               background-color: #DEDEDE;
           }
       }
   }
</style>

