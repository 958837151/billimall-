<template>
    <!-- 分类页面组件 -->

    <div class="allCategories">
        <div class="titleContainer">
            <div>
                <span>ALL CATEGORIES</span>
                <span>Everything Safe and Saving</span>
            </div>
        </div>
        <div class="contentContainer">
            <div class="navigation">
                <span>Home</span>
                <span>></span>
                <span>All Categories</span>
            </div>
            <div class="wrappList" :class="{isFixed:listIsfixed}" id="wrappList">
                <!-- <div v-for="(item,index) in wrappListdata" @click="goAnchor('#wrapp'+index,index)" :key="item.id" :class="[{activeList:index==current},'wrappitem']">
                    <img :src="item.image" class="listimg">
                    <p class="iconsCont" :class="{lessMargin:index==2}">{{ item.name }}</p>
                </div> -->
                <div v-for="(item,index) in wrappListdata" @click="jump(index)" :key="item.id" :class="[{activeList:index==current},'wrappitem']">
                    <img :src="item.image" class="listimg">
                    <p class="iconsCont" :class="{lessMargin:index==2}">{{ item.name }}</p>
                </div>
            </div>
            <div class="cateList">
                <div class="cateListLeft">
                    <div class="cateConter section" v-for="(list,index) in cateListdata" :key="list.id" :id="'wrapp'+index">
                        <div class="cateTitle" :class="{active:index==current}" @click="toDirectSearch(list.id)">{{list.name}}</div>
                        <div class="allList">
                            <ul>
                                <li v-for="(listchildren,index) in list.children" :key="index" :class="{marRigLi:index%3==2}" @click="toDirectSearch(listchildren.id)">{{listchildren.name}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="cateListRight"></div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'allcategories',
    props:['allCategoriesdata'],
    data() {
        return {
            scroll: "",
            current: 0,
            total: "",
            listIsfixed: false,
            alldata:{},
            wrappListdata:[],//二级列表
            cateListdata:[]//三级列表
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("scroll", this.handleScrollList);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("scroll", this.handleScrollList);
    },
    watch: {
        allCategoriesdata(val){
            this.getallCategoriesdata(val)
        }
    },
    methods: {
        goAnchor(selector,index) {
            var anchor = this.$el.querySelector(selector)
            if(this.listIsfixed){
                document.documentElement.scrollTop = anchor.offsetTop-100
            }else{
                document.documentElement.scrollTop = anchor.offsetTop
            }
        },
        getallCategoriesdata(data){
            this.alldata=data.category
            for (const key in data.category) {
                this.wrappListdata.push({'name':data.category[key].name,'image':data.category[key].image,'id':data.category[key].id})
                this.cateListdata.push(data.category[key])
            }
            this.wrappListdata=this.wrappListdata.slice(0,11)
            this.wrappListdata.push({'name':'More Categories','image':'','id':''})
        },
        jump(index) {
            var jump = document.getElementsByClassName("section");
            // 获取需要滚动的距离
            var total = jump[index].offsetTop - 200;
            // Chrome
            document.body.scrollTop = total;
            // // Firefox
            document.documentElement.scrollTop = total;
            // // Safari
            window.pageYOffset = total;
            this.current = index;
        },
        handleScroll() {
            //  jump点击只触发一次，手动滚动触发多次
            var index = this.current;
            var scrollTop = window.scrollY + 200;
            var offsetEle = document.getElementsByClassName("section");
            var offsetTop = offsetEle[index].offsetTop;
            // console.log(index,scrollTop,offsetTop);
            if (scrollTop != offsetTop) {
                for (var i = 0; i < offsetEle.length; i++) {
                    var offsetTop = offsetEle[i].offsetTop;
                    if (scrollTop > offsetTop - 200) {
                        this.current = i;
                        // this.customerIsfixed = true
                    } else {
                        // this.customerIsfixed = false
                    }
                }
            } else {
                return;
            }
        },
        handleScrollList() {
            var scrollTop = window.scrollY;
            var offsetTop = document.querySelector("#wrappList").offsetTop;
            if (scrollTop > offsetTop) {
                this.listIsfixed = true;
            } else {
                this.listIsfixed = false;
            }
            if (scrollTop < 200) {
                this.listIsfixed = false;
            }
        },
        toDirectSearch(cat_id){//跳转到商品分类页
            // this.$router.push({ name: 'DirectSearch', params: { cat_id:cat_id }})
            this.$router.push({ name: "DirectSearch", query: { Title: "" ,cat_id :cat_id} });
        },
    }
};
</script>
   
<style lang="scss" scoped>
.titleContainer {
    background: url("../../assets/images/allcat.png") no-repeat;
    background-size: 100%;
    div {
        height: 148px;
        width: 1200px;
        color: #fff;
        margin: 0 auto;
        text-align: left;
        line-height: 148px;
    }
    span {
        font-size: 36px;
        font-weight: bold;
    }
    span:last-child {
        font-size: 14px;
        font-weight: 100;
        margin-left: 16px;
    }
}
.contentContainer {
    width: 1200px;
    margin: 0 auto;
    .navigation {
        height: 45px;
        line-height: 45px;
        font-size: 12px;
        color: #666;
        text-align: left;
        span {
            margin-right: 3px;
            cursor: pointer;
            &:hover {
                color: #1974a1;
            }
        }
    }
    .wrappList {
        height: 104px;
        background-color: #fff;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 24px;
        div {
            flex: 0 0 196px;
            height: 48px;
            color: #333;
            font-size: 12px;
            text-align: left;
            border: 2px solid #fff;
            cursor: pointer;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .listimg{
                display: none;
                width: 20px;
                height: 20px;
                margin-left: 18px;
                margin-right: 10px;
            }
            &:hover {
                border: 2px solid #ff7804;
                color: #ff7804;
            }
            .iconsCont{
                margin-left: 30px;
            }
        }
        .activeList {
            border: 2px solid #ff7804;
            color: #ff7804;
        }
    }
    .isFixed {
        position: fixed;
        width: 1200px;
        top: 0;
        border-bottom: 1px solid #ededed;
    }
    .moreMargin {
        padding-top: 13px;
    }
    .lessMargin {
        padding-top: 10px;
    }
}
.cateList {
    width: 1200px;
    margin: 0 auto;
    text-align: left;
    overflow: hidden;
    .cateListLeft {
        width: 908px;
        background-color: #fff;
        float: left;
        .cateConter {
            padding: 32px 76px 20px;
            overflow: hidden;
            border-bottom: 1px solid #ededed;
            .cateTitle {
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
            }
            .allList {
                margin-top: 23px;
                ul{
                    column-count: 3;
                    li {
                        break-inside: avoid;
                        width: 200px;
                        margin-right: 78px;
                        font-size: 12px;
                        color: #333;
                        height: 28px;
                        line-height: 28px;
                        cursor: pointer;
                        &:hover {
                            color: #ff7804;
                        }
                    }
                    .marRigLi {
                        margin-right: 0;
                    }
                }
            }
        }
    }
    .active {
        color: #ff7804;
    }
}
</style>