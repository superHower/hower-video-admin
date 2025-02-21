<template>
  <div class="video">
    <!-- 搜索区域 -->
    <CustomForm :options="queryFormOption" @queryHandler="queryHandler"></CustomForm>

    <!-- 表格区域 -->
    <CustomTable
      :options="tableOptions"
      :data="tableData"
      :total="pageTotal"
      border
      style="margin-top: 20px"
      @changePageHandler="changePageHandler"
      @selection-change="handleSelectionChange"
    >
      <template #tableHeader>
        <!-- <el-button type="primary" @click="addNewHandler">新增</el-button> -->
        <el-button type="primary" @click="editRowHandler">编辑</el-button>
        <el-button type="primary" @click="commentHandler">审核评论</el-button>
        <el-button type="danger" @click="modifyStatusHandler">状态</el-button>
        <el-button type="danger" @click="deleteRowHandler">删除</el-button>
      </template>
    </CustomTable>
    <FormDialog
      :title="title"
      v-model:visible="isVisibleDialog"
      :options="formOption"
      :formData="formData"
      @getFormData="getFormData"
    ></FormDialog>
    <CommentDialog ref="commentDialogRef" @updateTable="initTableData"></CommentDialog>
  </div>
</template>

<script setup>
  import { tableOptions, queryFormOption, formOption } from './index.js';
  import { VideoService, AccountService } from '@/services/index.js';
  import { useRoute } from 'vue-router';
  import CommentDialog from './components/CommentDialog.vue';

  const route = useRoute();

  const tableData = ref([]);
  const pageTotal = ref(0);
  // 搜索
  const queryHandler = (queryData) => {
    initTableData({ ...queryData, pageSize: 10, pageNumber: 1 });
  };

  // 多选操作
  const multipleSelection = ref([]);
  const handleSelectionChange = (val) => {
    multipleSelection.value = val;
  };

  // 获取表格数据
  const initTableData = async (queryOption = {}) => {
    const {
      result: { data, total },
    } = await VideoService.getPageApi({ ...queryOption, tenantId: route.query.tenantId });
    tableData.value = data;
    pageTotal.value = total;
    multipleSelection.value = [];
  };
  // 分页操作
  const changePageHandler = ({ pageSize, pageNumber }) => {
    initTableData({ pageSize: pageSize, pageNumber: pageNumber });
  };

  const title = ref('新增视频');
  const isVisibleDialog = ref(false);
  const formData = ref({
    tags: '',
    title: '',
    videoUrl: '',
    description: '',
    status: '',
  });
  const addNewHandler = async () => {
    title.value = '新增视频';
    isVisibleDialog.value = true;
    multipleSelection.value = [];
    formData.value = {
      tags: null,
      title: null,
      videoUrl: null,
      description: null,
      status: null,
    };
  };
  const editRowHandler = async () => {
    if (multipleSelection.value.length) {
      title.value = '编辑视频';
      formData.value = multipleSelection.value[0];
      isVisibleDialog.value = true;
    } else {
      ElMessage.warning('请先选择行');
    }
  };
  // 提交
  const getFormData = async (formData) => {
    console.log(formData);
    if (multipleSelection.value.length) {
      await VideoService.modifyByIdApi(multipleSelection.value[0].id, formData);
    } else {
      await VideoService.createApi(formData);
    }
    isVisibleDialog.value = false;
    initTableData();
    formData.value = {
      tags: null,
      title: null,
      videoUrl: null,
      description: null,
      status: null,
    };
  };
  // 审核评论
  const commentDialogRef = ref();
  const commentHandler = async () => {
    if (multipleSelection.value.length) {
      commentDialogRef.value.openDialog(multipleSelection.value[0]);
    } else {
      ElMessage.warning('请先选择行');
    }
  };
  // 修改状态
  const modifyStatusHandler = async () => {
    if (multipleSelection.value.length) {
      await VideoService.batchStatusByIdListApi(multipleSelection.value.map((item) => item.id));
      initTableData();
    } else {
      ElMessage.warning('请先选择行');
    }
  };
  // 删除行
  const deleteRowHandler = async () => {
    if (multipleSelection.value.length) {
      await VideoService.batchDeleteByIdListApi(multipleSelection.value.map((item) => item.id));
      initTableData();
    } else {
      ElMessage.warning('请先选择行');
    }
  };
  onMounted(() => {
    initTableData();
  });
</script>

<style lang="scss" scoped></style>
