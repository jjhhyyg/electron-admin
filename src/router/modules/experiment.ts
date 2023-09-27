export default {
  path: "/experiment",
  meta: {
    title: "导入数据",
    rank: 1,
    icon: "importOutlined"
  },
  children: [
    {
      path: "/experiment/import-form",
      name: "experimentImportForm",
      component: () => import("@/views/experiment/importForm.vue"),
      meta: {
        title: "信息录入-表单",
        showParent: true,
        icon: "editBoxLine"
      }
    },
    {
      path: "/experiment/import-excel",
      name: "experimentImportExcel",
      component: () => import("@/views/experiment/importExcel.vue"),
      meta: {
        title: "信息录入-Excel",
        showParent: true,
        icon: "fileExcel2Fill"
      }
    }
  ]
};
