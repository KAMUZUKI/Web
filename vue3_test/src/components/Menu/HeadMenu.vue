<template>
  <div style="float:right;">
    <a-space size="small" align="end" direction="horizontal">
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
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          Hover me
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      </a-space>
  </div>
</template>

<style scoped>
.link {
  margin-right: 20px;
  display: inline-block;
  font-size: 16px;
  color: #08c;
}
</style>

<script>
import { MessageOutlined, CommentOutlined,DownOutlined } from '@ant-design/icons-vue';
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
    CommentOutlined,
    DownOutlined
  },
  setup() {
    return {
      gotoEditor,
    };
  },
});
</script>