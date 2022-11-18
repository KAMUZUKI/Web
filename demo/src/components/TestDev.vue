<template>
    <div>
        <h1>TestDev</h1>
        <template v-for="item in list" :key="item.id">
            {{item}}
        </template>
    </div>
</template>

<script>
import { defineComponent,ref} from "vue";
export default defineComponent({
    name: "TestDev",
    setup() {
        const list = ref([])
        const data = ref([
            {id: 1, name: 'a'},
            {id: 2, name: 'b'},
            {id: 3, name: 'c'},
        ])
        list.value = data.value.concat([...new Array(3)].map(() => ({
            id:Number,
            name: String
        })));
        list.value = data.value.concat([...new Array(3)].map(() => ({
            id:Number,
            name: String
        })));
        console.log(list.value)
        return {
            list
        };
    },
})
</script>

<style>

</style>