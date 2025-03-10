<template>
  <div>
    <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="title"
      width="50%"
      append-to-body
    >
      <div class="dialog-content">
        <el-form
          label-position="right"
          label-width="100"
          :rules="formRule"
          :model="formData"
          ref="formRef"
        >
          <el-form-item label="类型" prop="resourcesType">
            <el-select
              v-model="formData.resourcesType"
              placeholder="请选择"
              style="width: 100%"
              @change="resourcesTypeChangeHandler"
            >
              <el-option label="模块" :value="0"></el-option>
              <el-option label="菜单" :value="1"></el-option>
              <el-option label="按钮" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="title">
            <el-input v-model="formData.title" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item
            label="父级"
            prop="parentId"
            v-if="isShowParentItem && formData.resourcesType != 0"
          >
            <el-tree-select
              v-model="formData.parentId"
              :data="treeDataList"
              check-strictly
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="URL地址" prop="url">
            <el-input v-model="formData.url" placeholder="请输入URL地址" />
          </el-form-item>
          <el-form-item label="请求方式" prop="method" v-if="formData.resourcesType == 2">
            <el-select
              v-model="formData.method"
              placeholder="请选择请求方式"
              style="width: 100%"
              clearable
            >
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST"></el-option>
              <el-option label="PUT" value="PUT"></el-option>
              <el-option label="DELETE" value="DELETE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="ICON图标" prop="icon" v-else>
            <el-input v-model="formData.icon" placeholder="请输入ICON图标" />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <InputNumber v-model.number="formData.sort" placeholder="请输入排序" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="formData.description" type="textarea" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelHandler">取消</el-button>
          <el-button type="primary" @click="confirmHandler">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { ResourcesService } from '@/services';
  import { formatDate, getTreeList } from '@/utils';
  const dialogVisible = ref(false);
  const title = ref('创建资源');
  const treeDataList = ref([]);
  const formData = ref({
    resourcesType: null,
    name: null,
    parentId: null,
    url: null,
    icon: null,
    sort: null,
    method: '',
    description: null,
  });
  const cancelHandler = () => {
    formData.value = {
      resourcesType: null,
      title: null,
      parentId: null,
      url: null,
      icon: null,
      sort: null,
      method: null,
      description: null,
    };
    dialogVisible.value = false;
  };
  const newRowDate = ref(null);
  const openDialog = (rowData = {}) => {
    console.log(rowData, '数据');
    if (!Object.keys(rowData).length) {
      newRowDate.value = null;
      title.value = '创建资源';
    } else {
      newRowDate.value = rowData;
      title.value = '编辑商户';
      formData.value = {
        resourcesType: rowData.resourcesType,
        title: rowData.title,
        parentId: rowData.parentId,
        url: rowData.url,
        icon: rowData.icon,
        sort: rowData.sort,
        description: rowData.description,
        method: rowData.method,
      };
    }
    dialogVisible.value = true;
  };
  const formRule = ref({
    resourcesType: [
      {
        required: true,
        message: `类型必填`,
        trigger: ['change', 'blur'],
      },
    ],
    title: [
      {
        required: true,
        message: `名称必填`,
        trigger: ['change', 'blur'],
      },
    ],
  });
  const isShowParentItem = ref(false);
  const resourcesTypeChangeHandler = async (value) => {
    if (!value) return;
    isShowParentItem.value = false;
    formData.value.parentId = null;
    const { result } = await ResourcesService.getCatalogApi({ catalogType: value });
    const list = result.map((item) => {
      return {
        ...item,
        label: item.title,
        value: item.id,
      };
    });
    treeDataList.value = getTreeList(list, 'id', 'parentId');
    isShowParentItem.value = true;
  };
  const formRef = ref(null);
  const emit = defineEmits(['updateTable']);
  const confirmHandler = async () => {
    await formRef.value.validate(async (valid) => {
      if (valid) {
        const postData = {
          ...formData.value,
          sort: formData.value.sort ?? 1,
        };
        console.log(postData);
        if (newRowDate.value && Object.keys(newRowDate.value).length) {
          console.log('编辑');
          await ResourcesService.modifyByIdApi(newRowDate.value.id, postData);
          ElMessage.success('修改成功');
        } else {
          await ResourcesService.createApi(postData);
          ElMessage.success('创建成功');
        }
        emit('updateTable');
        cancelHandler();
      } else {
        ElMessage.error('请补充数据');
      }
    });
  };

  // 对外暴露出去的
  defineExpose({
    openDialog,
  });
</script>

<style lang="scss" scoped></style>
