<template>
  <div style="float:left;">
    <a-space style="margin-top:30px" size="small" align="end" direction="horizontal">
      <div class="link">
        <router-link class="nav-link" to="/">
          <message-outlined :style="{ fontSize: '26px', color: '#08c' }" /><span>首页</span>
        </router-link>
      </div>
      <div class="link">
        <router-link class="nav-link" to="/about">
          <comment-outlined :style="{ fontSize: '26px', color: '#08c' }" /><span>关于</span>
        </router-link>
      </div>
      <div class="link">
        <router-link class="nav-link" to="/editor">
          <comment-outlined :style="{ fontSize: '26px', color: '#08c' }" /><span>编辑</span>
        </router-link>
      </div>
      <div class="link">
        <router-link class="nav-link" to="/flink">
          <comment-outlined :style="{ fontSize: '26px', color: '#08c' }" /><span>友链</span>
        </router-link>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
.link {
  float: right;
  margin-right: 20px;
  display: inline-block;
  font-size: 16px;
  color: #08c;
}
</style>

<script>
import { MessageOutlined, CommentOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const gotoEditor = () => {
  router.push({
    name: 'editor',
    params: {

    }
  })
};

export default defineComponent({
  name: 'BarDemo',
  components: {
    MessageOutlined,
    CommentOutlined
  },
  setup() {
    return {
      gotoEditor,
    };
  },
});
</script>