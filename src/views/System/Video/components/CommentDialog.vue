<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="60%"
      append-to-body
      :close-on-click-modal="false"
      @close="handleDialogClose"
      :before-close="handleBeforeClose"
    >
      <div class="dialog-content comment-api">
        <el-tree
          v-loading="loading"
          ref="treeRef"
          :data="commentList"
          show-checkbox
          node-key="id"
          :props="{ label: 'content' }"
          @check="handleCheckChange"
        >
          <template #default="{ data }">
            <span class="custom-tree-node">
              <span>{{ data.content }}</span>
              <span>
                <a>{{ data.username }}</a>
                <a style="margin-left: 8px">{{ data.createdAt }}</a>
              </span>
            </span>
          </template>
        </el-tree>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDialogClose">取消</el-button>
          <el-button type="primary" @click="deleteHandler">一键删除</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { VideoService } from '@/services';
  import { getTreeList } from '@/utils';
  const dialogVisible = ref(false);
  const title = ref('');
  const loading = ref(false);
  const videoData = ref({});
  const emits = defineEmits(['updateTable']);
  const openDialog = async (rowData = {}) => {
    dialogVisible.value = true;
    videoData.value = rowData;
    try {
      await getCommentPage({ videoId: rowData.id });
    } finally {
      setCheckedKeys(initCheckedNodeKey.value);
    }
  };

  const handleDialogClose = () => {
    treeRef.value?.setCheckedKeys([]);
    commentList.value = [];
    dialogVisible.value = false;
  };
  // 一键删除
  const deleteHandler = async () => {
    console.log('选择的评论', allCheckedNodes.value);
    await VideoService.batchDeleteCommentByIdListApi(allCheckedNodes.value);
    ElMessage.success('删除成功');
    handleDialogClose();
    emits('updateTable');
  };

  // 全部的资源
  const commentList = ref([]);
  // 获取选择的key
  const treeRef = ref(null);
  // 最后选中的
  const allCheckedNodes = ref([]);
  // 当前选中的
  const initCheckedNodeKey = ref([]);
  // 选择节点
  const handleCheckChange = () => {
    // 获取所有实际选中的节点（不包含半选父节点）
    const checkedKeys = treeRef.value.getCheckedKeys(true); // 参数true表示只获取叶子节点

    // 获取所有半选中的父节点ID（需要过滤掉）
    const halfCheckedKeys = treeRef.value.getHalfCheckedKeys();

    // 最终有效ID = 实际选中的叶子节点 - 半选父节点下的子节点
    allCheckedNodes.value = checkedKeys.filter(
      (key) => !halfCheckedKeys.some((parentKey) => key.startsWith(`${parentKey}-`))
    );
  };
  // 处理树半选
  const findTreeCheckedNodeKey = (checkedNodeList, treeData) => {
    console.log(checkedNodeList, '选中的', treeData);
    let isExit = false;
    for (let item of treeData) {
      if (item?.children?.length > 0) {
        // 如果有children，那么说明它是父级
        isExit = false;
        findTreeCheckedNodeKey(checkedNodeList, item.children);
      } else {
        // 当它是子级时再进行匹配
        for (let it of checkedNodeList) {
          if (item.id == it) {
            // 菜单权限匹配
            initCheckedNodeKey.value.push(item.id);
          } else {
            // 且没有匹配成功
            isExit = true;
          }
        }
      }
    }
    if (isExit) {
      // 循环完成后进行判断
      return false;
    }
  };

  const setCheckedKeys = (defaultChecked = []) => {
    treeRef.value && treeRef.value.setCheckedKeys(defaultChecked);
  };
  // 获取全部的资源
  const getCommentPage = async (data) => {
    const { result } = await VideoService.getCommentPageApi(data);
    const list = result.data.map((item) => {
      let time = item.createdAt.split('T');
      return {
        ...item,
        createdAt: time[0] + ' ' + time[1].substring(0, 5),
        isPenultimate: item.parentId ? true : false,
      };
    });
    const treeData = getTreeList(list, 'id', 'parentId');
    console.log('el-tree：', treeData);
    commentList.value = treeData;
  };

  const customNodeClass = (data, node) => {
    if (data.isPenultimate) {
      return 'is-penultimate';
    }
    return null;
  };

  // 对外暴露出去的
  defineExpose({
    openDialog,
  });
</script>

<style lang="scss">
  .comment-api {
    .el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
</style>
