<template>
    <div class="uploadphoto">
        <HeaderHtml></HeaderHtml>
        <div>
            <Search id="searchBar" :fixedMsg="searchBarFixed"></Search>
        </div>
        <div class="content">
            <h3 class="uploadphototit">Upload Photo</h3>
            <div class="tips">
                <img src="../assets/images/uploadphototips.png" alt="">
                Your Photo will be displayed within 24 hours.
            </div>
            <div class="uploadphoto">
                <div class="uploadphoto_left">
                    <div class="block"><el-avatar shape="square"  :src="squareUrl"></el-avatar></div>
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :limit="1"
                        :on-exceed="handleExceed">
                        <el-button size="small" type="primary">Upload Photo</el-button>
                    </el-upload>
                </div>
                <div class="uploadphoto_right">
                    <div class="righttit">Upload Rules</div>
                    <div>· Please upload a photo that matches the gender, age and status details in your personal profile.</div>
                    <div>· Use a photo that is appropriate for a business setting. Group	photos are not allowed.</div>
                    <div>· Photos violating the rules stated in the <span>Terms of User</span>  will be removed without notice.</div>
                </div>
            </div>
        </div>  
    </div>
</template>
<script>
import HeaderHtml from '@/components/common/headerhtml'
import Search from '@/components/common/search'

export default {
    name:'uploadphoto',
    components: {
        HeaderHtml,
        Search
    },
    data(){
        return{
            searchBarFixed:{
                isfixed:false,
                isshow:false
            },
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            // fileList: []
        }
    },
    methods:{
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    }
}
</script>
<style lang="scss" scoped>
.uploadphoto{
    .content{
        margin: 0 auto;
        width:1440px;
        h3.uploadphototit{
            height:20px;
            font-size:18px;
            font-family:Helvetica;
            color:rgba(51,51,51,1);
            line-height:20px;
            text-align: left;
            padding-left: 123px;
            margin-top: 24px;
        }
        .tips{
            margin: 0 auto;
            width:1200px;
            height:42px;
            line-height: 42px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(251,210,176,1);
            margin-top: 16px;
            position: relative;
            text-align: left;
            padding-left: 52px;
            box-sizing: border-box;
            img{
                position: absolute;
                width: 16px;
                height: 16px;
                display: block;
                left: 24px;
                top: 13px;
            }
        }
        .uploadphoto{
            margin: 0 auto;
            margin-top: 24px;
            width:1200px;
            .uploadphoto_left{
                width:823px;
                height:220px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(222,222,222,1);
                float: left;
                overflow: hidden;
                .block{
                    padding: 24px 0 0 24px;
                    width:120px;
                    height:120px;
                    .el-avatar{
                        width: 100%;
                        height: 100%;
                    }
                }
                .upload-demo{
                    width:120px;
                    height:36px;
                    line-height: 36px;
                    background:rgba(254,182,16,1);
                    border-radius:2px;
                    margin: 16px 0 0 24px;
                    .el-button--small{
                        width:120px;
                        height:36px;
                    }
                }
            }
            .uploadphoto_right{
                width:363px;
                height:220px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(222,222,222,1);
                float: right;
                position: relative;
                div.righttit{ 
                    width: 150px;
                    height:17px;
                    line-height:17px;
                    margin-bottom: 25px;
                    font-size:14px;
                    font-family:HelveticaNeue-Medium;
                    font-weight:700;
                    color:rgba(51,51,51,1);
                    text-align: left;
                    position: absolute;
                    left: 24px;
                    top: 12px;
                    box-sizing: border-box;
                }
                div{
                    width:330px;
                    height:32px;
                    font-size:14px;
                    font-family:HelveticaNeue;
                    color:rgba(51,51,51,1);
                    line-height:16px;
                    margin: 0 auto;
                    text-align: left;
                    &:nth-child(2){
                        margin-top: 54px;
                        margin-bottom: 18px;
                    }
                    &:nth-child(3){
                        margin-bottom: 18px;
                    }
                    &:nth-child(4) span{
                        color: #1974A1;
                    }
                }
            }
        }
    }
}
</style>
<style>
.uploadphoto .el-upload-list__item {
    top: 200px;
}
</style>