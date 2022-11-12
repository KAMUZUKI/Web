<script>
import {defineComponent} from 'vue'
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
export default defineComponent({
    name: 'EmojiComp',
    components: {
        V3Emoji,
    },
    })
</script>
<template>
    <div>
        <V3Emoji
          :textArea="true"
          size="big"
        />
    </div>
</template>