<template>
  <a-card style="width: 300px;border-radius: 20px;background-color:lightblue" hoverable>
    <div>
      <a-tag style="margin-top:10px" v-for="item of tags" :key="item.color" class="item-tag" :color="item.color">
        <router-link @click.prevent="showContentBykeyword(item.tag)" to="/">
          {{ item.tag }}
        </router-link>
      </a-tag>
    </div>
  </a-card>
</template>

<script>
import { defineComponent, reactive } from 'vue'
const colors = ['pink', 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple']
const items = ['JAVA技术', '.NET技术', '数据库技术', 'GO', 'PYTHON', 'C#', 'JavaScript', 'TypeScript']

const tags = reactive([
])

const initTags = () => {
  for (let i = 0; i < items.length; i++) {
    let j = Math.floor(Math.random() * 7);
    tags.push({ color: colors[j], tag: items[i] })
  }
}

const destroyTags = () => {
  tags.splice(0, tags.length)
}

export default defineComponent({
  name: 'SiderTag',
  setup(props) {
    const showContentBykeyword = (type) => {
      props.showContentByKeyword(type);
    }
    return {
      tags,
      showContentBykeyword
    }
  },
  props: {
    showContentByKeyword: {
      type: Function,
    }
  },
  mounted() {
    initTags()
  },
  beforeUnmount() {
    destroyTags()
  }
})
</script>

<style>

</style>