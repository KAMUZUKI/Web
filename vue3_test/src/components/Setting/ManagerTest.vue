<template>
    <div class="container">
    <a-table :columns="columns" :data-source="dataSource" bordered>
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
              <a-typography-link @click="save(record.id)">Save</a-typography-link>
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
  import { defineComponent, reactive, ref } from 'vue';
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
  const data = [{
            id: 1,
            name: '张三',
            account: '10001',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        },
        {
            id: 2,
            name: '李四',
            account: '10002',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        },
        {
            id: 3,
            name: '王五',
            account: '10003',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        },
        {
            id: 4,
            name: '赵六',
            account: '10004',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        }, {
            id: 5,
            name: '田七',
            account: '10005',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        }, {
            id: 6,
            name: '张三',
            account: '10001',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        },
        {
            id: 7,
            name: '李四',
            account: '10002',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        },
        {
            id: 8,
            name: '王五',
            account: '10003',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        },
        {
            id: 9,
            name: '赵六',
            account: '10004',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        }, {
            id: 10,
            name: '田七',
            account: '10005',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        }, {
            id: 11,
            name: '田七',
            account: '10005',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        }];
  export default defineComponent({
    name:'ManagerTest',
    setup() {
      const dataSource = ref(data);
      const editableData = reactive({});

      const edit = key => {
        editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.id)[0]);
      }

      const save = key => {
        Object.assign(dataSource.value.filter(item => key === item.id)[0], editableData[key]);
        delete editableData[key];
      }

      const cancel = key => {
        delete editableData[key];
      }

      const deleteById = key => {
        alert(key);
        dataSource.value = dataSource.value.filter(item => key !== item.id);
      }
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