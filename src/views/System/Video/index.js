export const tableOptions = [
  {
    align: 'center',
    width: 50,
    type: 'selection',
    fixed: 'left',
  },
  {
    prop: 'title',
    label: '视频名称',
    width: 180,
  },
  {
    prop: 'status',
    label: '状态',
  },
  {
    prop: 'accountUsername',
    label: '发布者',
    width: 100,
  },
  {
    prop: 'description',
    label: '视频描述',
    width: 180,
  },
  {
    prop: 'videoUrl',
    label: '视频地址',
    width: 180,
  },
  {
    prop: 'coverUrl',
    label: '封面地址',
    width: 180,
  },
  {
    prop: 'tags',
    label: '视频分类',
    width: 180,
  },
  {
    prop: 'duration',
    label: '时长',
    width: 180,
  },
  {
    prop: 'fileSize',
    label: '文件大小',
    width: 180,
  },

  {
    prop: 'createdAt',
    label: '发布时间',
    align: 'center',
    width: 180,
  },
  // {
  //   label: '操作',
  //   action: true,
  //   align: 'center',
  //   width: 300,
  //   fixed: 'right',
  // },
];
export const queryFormOption = [
  {
    type: 'input',
    label: '视频标题',
    prop: 'title',
  },
  {
    type: 'input',
    label: '发布者',
    prop: 'accountUsername',
  },
  {
    type: 'select',
    prop: 'status',
    label: '状态',
    children: [
      {
        type: 'option',
        label: '正常',
        value: '0',
      },
      {
        type: 'option',
        label: '下架',
        value: '1',
      },
      {
        type: 'option',
        label: '待审核',
        value: '2',
      },
    ],
  },
];

export const formOption = [
  {
    type: 'input',
    label: '视频标题',
    prop: 'title',
    required: true,
  },
  {
    type: 'input',
    label: '描述',
    prop: 'description',
    attrs: {
      type: 'textarea',
    },
  },
  {
    type: 'input',
    label: '视频地址',
    prop: 'videoUrl',
    required: true,
    disabled: true,
  },
  {
    type: 'input',
    label: '分类',
    prop: 'tags',
    required: true,
  },
  {
    type: 'select',
    prop: 'status',
    label: '状态',
    children: [
      {
        type: 'option',
        label: '正常',
        value: '0',
      },
      {
        type: 'option',
        label: '下架',
        value: '1',
      },
      {
        type: 'option',
        label: '待审核',
        value: '2',
      },
    ],
  },
];
