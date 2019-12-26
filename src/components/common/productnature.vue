<template>
    <div class="specifications">
        <div v-for="item in productNv">
            <span class="productNature">{{item.name}}</span>
            <span class="productVal">{{item.value}}</span>
        </div>
       
    </div>
</template>

<script>
    export default{
        data(){
            return{
                productNv:[
                    {name:"Brand Name",value:"Rear mirror"},
                    {name:"Type",value:"UV Gel"},
                    {name:"Ingredient",value:"Resin"},
                    {name:"Feature 2",value:"Fast Builder Gel polygel"},
                    {name:"Feature 2",value:"Fast Builder Gel polygel"},
                    {name:"Feature 2",value:"Fast Builder Gel polygel"},
                    {name:"Feature 2",value:"Fast Builder Gel polygel"},
                    {name:"Item",value:"UV/LED Soak off Builder gel"},
                    {name:"Item",value:"UV/LED Soak off Builder gel"},
                    {name:"Item",value:"UV/LED Soak off Builder gel"},
                    {name:"Item",value:"UV/LED Soak off Builder gel"},
                    {name:"Item",value:"UV/LED Soak off Builder gel"},
                    {name:"Item",value:"UV/LED Soak off Builder gel"},
                     {name:"Feature 2",value:"Fast Builder Gel polygel"},
                    {name:"Item",value:"UV/LED Soak off Builder gel"},
                    {name:"Item",value:"UV/LED Soak off Builder gel"},
                    {name:"Item",value:"UV/LED Soak off Builder gel"},
                    {name:"Item",value:"UV/LED Soak off Builder gel"},
                ]
            }
        }
    }
</script>

<style lang='scss' scoped>
    .specifications{
        overflow: hidden;
        padding-left: 26px;
        margin-top: 16px;
        padding-bottom: 20px;
        div{
            float: left;
            width: 50%;
            text-align: left;
        }
        .productNature,.productVal{
            font-size: 12px;
            color: #666;
            display: inline-block;
            padding: 8px 0;
        }
        .productNature{
            width: 120px;
        }
        .productVal{
            color: #333;
            width: 200px;
        }
    }
</style>
