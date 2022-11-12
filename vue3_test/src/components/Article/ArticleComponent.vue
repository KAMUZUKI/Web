<template>
  <div style="text-align:left;">
    <PageHeader :details="details"></PageHeader>
    <v-md-preview :text="details.content"></v-md-preview>
    <CommentComponent :articleId="articleId"></CommentComponent>
  </div>
</template>

<script>
import {defineComponent,ref} from "vue"
import { useStore } from 'vuex' // 引入useStore 方法
import CommentComponent from "@/components/Comment/CommentComponent.vue"
import PageHeader from "@/components/Article/PageHeader.vue"
export default defineComponent({
    name:'ArticleComponent',
    setup(){
      const store = useStore()  // 该方法用于返回store 实例
      const detail = ref()
      const articleId = ref()
      
      //刷新页面时，store无数据从sessionStorage中获取数据
      if (typeof(store.state.detail) == "undefined") {
        detail.value = JSON.parse(sessionStorage.getItem("articleDetail"))
      }else {
        detail.value = JSON.parse(store.state.detail);
      }

      const details = detail.value
      articleId.value = details.id

      return {
        details,
        articleId
      }
    },
    components: {
      CommentComponent,
      PageHeader
    }
})
</script>