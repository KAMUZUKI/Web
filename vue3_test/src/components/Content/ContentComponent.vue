<template>
  <a-list style="max-width:1000px;min-width: 700px" item-layout="vertical" size="large" :pagination="pagination"
    :data-source="initDataList">
    <template #footer>
      <div>
        <b></b>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="{ type, id } in actions" :key="type">
            <component :is="type" style="margin-right: 8px" />
            {{ item.colCnt[id] }}
          </span>
        </template>
        <template #extra>
          <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            <router-link class="nav-link" :to="'/article/' + item.id" @click="pushToDetail(item)">{{ item.title }}
            </router-link>
          </template>
          <template #avatar>
            <a-avatar src="http://q1.qlogo.cn/g?b=qq&nk=1437487442&s=100" />
          </template>
        </a-list-item-meta>
        {{ item.content.replace(/#*.*#/g, '').replace(/[^(\u4e00-\u9fa5)(，。（）【】{}！,\-!)]/g, '').substring(0, 200) +
    "....."
        }}
      </a-list-item>
    </template>
  </a-list>
</template>
<script>
import { StarOutlined, StarFilled, LikeOutlined, LikeFilled, MessageOutlined } from '@ant-design/icons-vue';
import { defineComponent, onMounted, ref, toRaw, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex' // 引入useStore 方法
import axios from 'axios'
export default defineComponent({
  setup() {

    const listDataTmp = [
      {
        id: 1,
        author: 'zhangsan',
        title: `zhangsan part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'GO JAVA',
        content: '# 111111Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['GO', 'JAVA'],
        category: ['GO', 'PYTHON', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [234, 34, 43],
      },
      {
        id: 2,
        author: 'lisi',
        title: `lisi part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'GO PYTHON.',
        content: '# 222222Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['GO', 'PYTHON'],
        category: ['GO', 'PYTHON', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [423, 153, 98],
      },
      {
        id: 3,
        author: 'wangwu',
        title: `wangwu part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'PYTHON JAVA.',
        content: '# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['PYTHON', 'JAVA'],
        category: ['GO', 'PYTHON', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [365, 433, 43],
      },
      {
        id: 4,
        author: 'zhaoliu',
        title: `zhaoliu part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'GO PYTHON JAVA.',
        content: '# 444444Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['GO', 'PYTHON', 'JAVA'],
        category: ['GO', 'PYTHON', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [432, 64, 876],
      },
      {
        id: 5,
        author: 'zhaoliu',
        title: `zhaoliu part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'JAVA技术 .NET技术 JAVA.',
        content: '# 555555Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['JAVA技术', '.NET技术', 'JAVA'],
        category: ['JAVA技术', '.NET技术', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [432, 64, 876],
      },
      {
        id: 6,
        author: 'zhaoliu',
        title: `zhaoliu part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'C# 数据库技术 JAVA.',
        content: '# 666666Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['C#', '数据库技术', 'JAVA'],
        category: ['C#', '数据库技术', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [432, 64, 876],
      },
    ];

    // const tempListData = []
    const listData = ref([])
    const initDataList = ref([]);
    const newData = ref([]);
    const store = useStore()  // 该方法用于返回store 实例

    const initData = () => {
      // TODO:获取文章列表   listData
      var params = new URLSearchParams();
      params.append('op', 'getAllArticle');
      //TODO: Login
      axios.post('http://localhost:8081/demo/info.action', params)
        .then(res => {
          console.log(res)
          if (res.data.code == 1) {
            listDataTmp.value = res.data.data
            for (const [key, value] of Object.entries(listDataTmp.value)) {
              console.log(key)
              value.colCnt = [123, 456, 789]
              listData.value.push(value);
            }
            // listData.value = toRaw(listDataTmp)
            // console.log("listData.value"+toRaw(listData.value)[2])
            initDataByCategory('all')
          } else {
            console.log(res.data.msg)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const pushToDetail = (item) => {
      store.state.detail = JSON.stringify(item)
      sessionStorage.setItem("articleDetail", JSON.stringify(item));
    }

    const initDataByCategory = (type) => {
      if (type === 'all') {
        for (let i = 0; i < listData.value.length; i++) {
          initDataList.value.push(listData.value[i]);
        }
      } else {
        for (let i = 0; i < listData.value.length; i++) {
          if (listData[i].category.includes(type)) {
            initDataList.value.push(listData[i]);
          }
        }
      }
    }

    const initDataByKeyword = (type) => {
      for (let i = 0; i < listData.value.length; i++) {
        if (listData[i].keywords.includes(type)) {
          initDataList.value.push(listData[i]);
        }
      }
    }

    const pagination = {
      onChange: page => {
        console.log("pages" + page);
      },
      simple: true,
      pageSize: 5,
    };
    // var i = 1
    onMounted(() => {
      initData()
      initDataByCategory('all')
      setInterval(() => {
        //TODO:获取最新数据 若有则更新 List的数据 无则跳过

        var params = new URLSearchParams();
        params.append('op', 'getArticleById');
        params.append('id', 1);
        axios.post('http://localhost:8081/demo/info.action', params).then(res => {
          console.log(res)
          if (res.data.code == 1) {
            initDataList.value = []
            newData.value = res.data.data
            listData.value.unshift(newData.value)
            initDataByCategory('all')
          } else {
            return
          }
        })
      }, 3000)
    });

    onBeforeUnmount(() => {
      initDataList.value = [];
      clearInterval(newData.value)
    });

    const changeContenByCategory = (type) => {
      initDataList.value = [];
      initDataByCategory(type);
    }

    const changeContenByKeyword = (type) => {
      initDataList.value = [];
      initDataByKeyword(type);
    }

    const actions = ref([{
      id: 0,
      type: 'StarOutlined',
    }, {
      id: 1,
      type: 'LikeOutlined',
    }, {
      id: 2,
      type: 'MessageOutlined',
    }]);

    const handleStar = () => {
      actions.value[0].type = 'StarFilled';
    }

    const handleLike = () => {
      actions.value[2].type = 'LikeFiller';
    }

    return {
      toRaw,
      listData,
      pagination,
      actions,
      initDataList,
      pushToDetail,
      initDataByKeyword,
      initDataByCategory,
      changeContenByCategory,
      changeContenByKeyword,
      handleStar,
      handleLike,
    };
  },
  components: {
    StarOutlined,
    StarFilled,
    LikeOutlined,
    LikeFilled,
    MessageOutlined,
  },
});
</script>