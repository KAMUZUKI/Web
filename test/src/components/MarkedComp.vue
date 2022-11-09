<template>
	<v-md-preview :text="str"></v-md-preview>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    name:'MarkedComp',
    data() {
        return {
            str: '# Marked in the browser\n\nRendered by **marked**.'
        }
    }
})
</script>