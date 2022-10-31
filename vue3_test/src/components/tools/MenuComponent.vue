<template>
    <a-list size="small" bordered :data-source="data">
        <template #renderItem="{ item }">
            <a-tag color="cyan">cyan</a-tag><a href="https://www.baidu.com">
                <a-list-item>{{ item }}</a-list-item>
            </a>
        </template>
    </a-list>
</template>
<script>
import { defineComponent } from 'vue';
const data = ['JAVA技术', '.NET技术', '数据库技术', 'GO', 'PYTHON', 'C#'];
export default defineComponent({
    name:'MenuComponent',
    setup() {
        return {
            data,
        };
    },

});
</script>