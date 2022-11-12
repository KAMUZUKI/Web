<template>
    <a-card bordered style="width: 200px;height: 290px;border-radius: 20px;margin: 60px 0 0 68px;" hoverable>
        <div style="width: 100%" v-for="(item, index) in data" :key="index">
            <div class="list-item" v-if="index == 0">
                <router-link @click.prevent="showContentBycategory(item)" to="/">
                    <a-list-item class="a-list-item">
                        <a-tag color="red">Top{{ index }}</a-tag>{{ item }}
                    </a-list-item>
                </router-link><br />
            </div>
            <div class="list-item" v-else-if="index == 1">
                <router-link @click.prevent="showContentBycategory(item)" to="/">
                    <a-list-item class="a-list-item">
                        <a-tag color="cyan">Top{{ index }}</a-tag>{{ item }}
                    </a-list-item><br />
                </router-link>
            </div>
            <div class="list-item" v-else>
                <router-link @click.prevent="showContentBycategory(item)" to="/">
                    <a-list-item class="a-list-item">
                        <a-tag color="green">Top{{ index }}</a-tag>{{ item }}
                    </a-list-item>
                </router-link><br />
            </div>
        </div>
    </a-card>
</template>

<style>
.list-item {
    width: 100%;
    height: 40px;
    text-align: left;
    border-radius: 10px;
}

</style>


<script>
import { defineComponent } from 'vue';
const data = ['JAVA技术', '.NET技术', '数据库技术', 'GO', 'PYTHON', 'C#'];
const data1 = [{ '1': 'JAVA技术' },
{ '2': '.NET技术' },
{ '3': '数据库技术' },
{ '4': 'GO' },
{ '5': 'PYTHON' },
{ '6': 'C#' }];

export default defineComponent({
    name: 'MenuComponent',
    setup(props) {
        const showContentBycategory = (type)=>{
            console.log(type);
            props.showContentByCategory(type);
        }

        return {
            data,
            data1,
            showContentBycategory
        };
    },
    props: {
        showContentByCategory: {
            type: Function,
        }
    }
});
</script>