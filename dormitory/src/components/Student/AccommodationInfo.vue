<template>
  <div class="container">
    <a-table :columns="columns" :data-source="dataSource" bordered>
      <template #bodyCell="{ column, text, record }">
        <template
          v-if="['status', 'type'].includes(column.dataIndex)">
          <div>
            <a-input v-if="editableData[record.id]" v-model:value="editableData[record.id][column.dataIndex]"
              style="margin: -5px 0" />
            <template v-else>
              {{ text }}
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
import { onUnmounted,onMounted,defineComponent} from 'vue';
export default defineComponent({
    name: "AccommodationInfo",
    setup(){
      const columns = [{
            title: 'Id',
            width: 15,
            dataIndex: 'id',
        }, {
            title: 'Name',
            width: 25,
            dataIndex: 'username',
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
        onMounted(() => {
            console.log('LeaveInfo mounted');
        });
        onUnmounted(() => {
            console.log('LeaveInfo unmounted');
        });
        return {
          columns,
        }
    }
})
</script>

<style>
.container {
    min-height: 80vh;
    max-width: 1000px;
}
</style>