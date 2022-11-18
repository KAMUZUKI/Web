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
          <span v-for="{ type, flag, id } in actions" :key="type">
              <component :is="type[hasExisted(item.id)]" style="margin-right: 8px" @click="clickModel(item.id, id);console.log(flag)" />
              {{ item.colCnt[id]}}
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
import { defineComponent, onMounted, ref, toRaw, onBeforeUnmount, watch } from 'vue';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex' // 引入useStore 方法
import { useRouter } from 'vue-router'
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
    const router = useRouter()
    const listData = ref([])
    const clickLimitCount = ref()
    const initDataList = ref([])
    const newData = ref([])
    const store = useStore()  // 该方法用于返回store 实例
    const likeList = ref([1,5,6,13])
    const set = new Set(likeList.value)

    const initData = () => {
      // TODO:获取文章列表   listData
      var params = new URLSearchParams();
      params.append('op', 'getAllArticle');
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

    // 1.建立链接 -- 携带cookie参数
    var ws = new WebSocket(
      `ws://localhost:8081/demo/websocket`
    );

    // 3.服务器每次返回信息都会执行一次onmessage方法
    ws.onmessage = function (res) {
      console.log("服务器返回的信息: " + res.data);
      //获取最新数据
      if (res.data !== null) {
        initDataList.value = []
        newData.value = JSON.parse(res.data)
        listData.value.unshift(newData.value)
        initDataByCategory('all')
      } else {
        return
      }
    };

    // var i = 1
    onMounted(() => {
      initData()
      initDataByCategory('all')
      //用于清除用户当前时间段点击次数
      setInterval(() => {
        clickLimitCount.value = 0
        console.log("clickLimitCount清空" + clickLimitCount.value)
      }, 3000)
    });

    watch(clickLimitCount, (newValue) => {
      //监听用户点击次数
      if (newValue > 4) {
        message.warning('请不要频繁点击');
      }
    })

    onBeforeUnmount(() => {
      initDataList.value = [];
      ws.onclose = function () {
        console.log("Connection closed.");
      };
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
      flag: 0,
      type: ['StarOutlined', 'StarFilled'],
      method: 'clickStar',
    }, {
      id: 1,
      flag: 0,
      type: ['LikeOutlined', 'LikeFilled'],
      method: 'clickLike',
    }, {
      id: 2,
      flag: 0,
      type: ['MessageOutlined'],
      method: 'clickMessage',
    }]);

    const clickModel = (articleId, mode) => {
      if (sessionStorage.getItem("user")) {
        //登录执行点击事件
        clickLimitCount.value++
        if (clickLimitCount.value > 4) {
          return
        }
        if (mode == 0 || mode == 1) {
          initDataList.value.forEach((item) => {
            if (item.id === articleId) {
              if (actions.value[mode].flag === 0) {
                set.add(item.id)
                item.colCnt[mode] += 1;
              } else {
                item.colCnt[mode] -= 1;
                set.delete(item.id)
              }
              actions.value[mode].flag ^= 1
              // alert("点赞成功" + item.colCnt[mode])
            }
          })
        } else {
          router.push({
            path: '/article/' + articleId,
            query: {
              mode: 1
            }
          })
        }
      } else {
        message.warning('请先登录');
        return
      }
    }

    const handleStar = () => {
      actions.value[0].type = 'StarFilled';
    }

    const handleLike = () => {
      actions.value[2].type = 'LikeFiller';
    }

    const hasExisted = (id) => {
      if (set.has(id)) {
        return 1
      }else{
        return 0
      }
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
      clickModel,
      likeList,
      hasExisted,  //判断文章是否被用户点赞
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