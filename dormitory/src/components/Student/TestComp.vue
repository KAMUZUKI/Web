<template>
  <div class="container">
      <a-table :columns="columns" :data-source="dataSource" bordered>

          <template #bodyCell="{ column, text, record }">
              <template v-if="['sname', 'age'].includes(column.dataIndex)">
                  <div>
                      <a-input v-if="editableData[record.id]"
                          v-model:value="editableData[record.id][column.dataIndex]" style="margin: -5px 0" />
                          
                      <template v-else>
                          {{ text }}{{ record.id }}
                      </template>
                  </div>
              </template>
              <template v-else-if="column.dataIndex === 'modify'">
                  <div class="editable-row-operations">
                      <span v-if="editableData[record.id]">
                          <a-typography-link @click="save(record)">保存</a-typography-link>
                          <a-popconfirm title="确认取消?" @confirm="cancel(record.id)">
                              <a>取消</a>
                          </a-popconfirm>
                      </span>
                      <span v-else>
                          <a @click="edit(record.id)">编辑</a>
                      </span>
                  </div>
              </template>
              <template v-else-if="column.dataIndex === 'delete'">
                  <div class="editable-row-operations">
                      <span>
                          <a-popconfirm title="确认删除?" ok-text="删除" cancel-text="取消" @confirm="deleteById(record.id)">
                              <a>删除</a>
                          </a-popconfirm>
                      </span>
                  </div>
              </template>
          </template>
      </a-table>
  </div>
</template>

<script>
import { onMounted, defineComponent, ref } from 'vue';
import axios from 'axios'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
export default defineComponent({
  name: "BaseInfo",
  setup() {
      const columns = [{
          title: '学号',
          width: 15,
          dataIndex: 'id',
      }, {
          title: '名字',
          width: 25,
          dataIndex: 'sname',
      }, {
          title: '年龄',
          dataIndex: 'age',
          width: 35,
      }, {
          title: '学院',
          dataIndex: 'academy',
          width: 40,
      }, {
          title: '班级',
          dataIndex: 'classname',
          width: 60,
      }, {
          title: '住址',
          dataIndex: 'address',
          width: 50,
      }, {
          title: 'Status',
          dataIndex: 'status',
          width: 25,
      }, {
          title: '电话',
          dataIndex: 'phone',
          width: 30,
      }, {
          title: 'Action',
          dataIndex: 'modify',
          width: 25,
      }, {
          title: 'Action',
          dataIndex: 'delete',
          width: 25,
      }];

      const store = useStore()
      const listDataTmp = ref([])
      const dataSource = ref([])
      const initData = () => {
          var params = new URLSearchParams()
          params.append('op', 'getAllStudent')
          axios.post(store.state.path + '/info.action', params)
              .then(res => {
                  if (res.data.code == 1) {
                      listDataTmp.value = res.data.data
                      for (const [key, item] of Object.entries(listDataTmp.value)) {
                          console.log(key)
                          dataSource.value.push(item);
                      }
                      message.success('获取学生信息成功')
                  } else {
                      message.success('获取学生信息失败')
                  }
              })
              .catch(function (error) {
                  console.log(error);
              });
      }

      onMounted(() => {
          initData()
      });
      return {
          columns,
          dataSource
      }
  },
})
</script>

<style>
.container {
  min-height: 80vh;
  max-width: 1000px;
}
</style>