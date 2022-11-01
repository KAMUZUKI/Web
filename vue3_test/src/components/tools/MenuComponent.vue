<template>
    <!-- <a-list size="small" bordered :data-source="data"> -->
        <!-- <template #renderItem="{ item,i }"> -->
            <div style="width: 100%" v-for="(item,index) in data" :key="index">
                <div class="list-item" v-if="index==0">
                    <a href="#">
                        <a-list-item class="a-list-item"><a-tag color="red">Top{{index}}</a-tag>{{ item }}</a-list-item>
                    </a><br/>
                </div>
                <div class="list-item" v-else-if="index==1">
                    <a href="#">
                        <a-list-item class="a-list-item"><a-tag color="cyan">Top{{index}}</a-tag>{{ item }}</a-list-item>
                    </a><br/>
                </div>
                <div class="list-item" v-else>
                    <a href="#">
                        <a-list-item class="a-list-item"><a-tag color="green">Top{{index}}</a-tag>{{ item }}</a-list-item>
                    </a><br/>
                </div>
            </div>
        <!-- </template> -->
    <!-- </a-list> -->
</template>

<style>
    .list-item {
        width: 100%;
        height: 40px;
        border:1px solid lightblue;
        text-align:left;
        border-radius:10px;
    }

    .a-list-item{
        margin-left: 20px;
    }

</style>


<script>
import { defineComponent } from 'vue';
const data = ['JAVA技术', '.NET技术', '数据库技术', 'GO', 'PYTHON', 'C#'];
const data1 = [{'1':'JAVA技术'},
    {'2':'.NET技术'},
    {'3':'数据库技术'},
    {'4':'GO'},
    {'5':'PYTHON'},
    {'6':'C#'}];

export default defineComponent({
    name:'MenuComponent',
    setup() {
        return {
            data,
            data1
            
        };
    },

});
</script>