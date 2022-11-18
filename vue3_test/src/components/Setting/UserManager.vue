<template>
    <div class="container">
    <a-table :columns="columns" :data-source="data" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="['id','name', 'account', 'phone','email','createTime','status','type'].includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record.id]"
              v-model:value="editableData[record.id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'modify'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.id]">
              <a-typography-link @click="save(record)">Save</a-typography-link>
              <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.id)">Edit</a>
            </span>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'delete'">
          <div class="editable-row-operations">
            <span>
              <a-popconfirm title="Sure to delete?" ok-text="删除" cancel-text="取消"
                        @confirm="deleteById(record.id)">
                <a>Delete</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </template>
    </a-table>
</div>
  </template>
  <script>
  import { cloneDeep } from 'lodash-es';
  import { defineComponent, reactive, ref,onMounted } from 'vue';
  import axios from 'axios'
  export default defineComponent({
    name:'ManagerTest',
    setup() {
    const columns = [{
              title: 'Id',
              width: 15,
              dataIndex: 'id',
          }, {
              title: 'Name',
              width: 25,
              dataIndex: 'name',
          }, {
              title: 'Account',
              dataIndex: 'account',
              width: 35,
          }, {
              title: 'Phone',
              dataIndex: 'phone',
              width: 40,
          }, {
              title: 'Email',
              dataIndex: 'email',
              width: 60,
          }, {
              title: 'CreateTime',
              dataIndex: 'createTime',
              width: 50,
          }, {
              title: 'Status',
              dataIndex: 'status',
              width: 25,
          }, {
              title: '用户类型',
              dataIndex: 'type',
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
    const dataSource = ref([]);
      const initDataSource = () => {
        //TODO:获取数据
        //dataSource.value.push()
        var params = new URLSearchParams();
        params.append('op', 'getAllUser');
        axios.post('http://localhost:8081/demo/info.action', params)
        .then(res => {
            if (res.data.code == 1) {
                dataSource.value = res.data.data
            } else {
              console.log('获取用户信息列表失败');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
      } 

      const editableData = reactive({});

      const edit = key => {
        editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.id)[0]);
      }

      const save = user => {
        Object.assign(dataSource.value.filter(item => user.id === item.id)[0], editableData[user.id]);
        delete editableData[user.id];
        //TODO:通过userid修改后台用户数据
        alert(user)
      }

      const cancel = key => {
        delete editableData[key];
      }

      const deleteById = key => {
        dataSource.value = dataSource.value.filter(item => key !== item.id);
        //TODO:通过userid删除后台用户数据
      }

      onMounted(() => {
        initDataSource()
      })

      return {
        dataSource,
        columns,
        editingKey: '',
        editableData,
        edit,
        save,
        cancel,
        deleteById,
      };
    },
  });
  </script>
  <style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }

  .container{
    min-width: 1100px;
  }
  </style>