export default {
  path: "/test",
  meta: {
    title: "测试",
    showLink: false
  },
  children: [
    {
      path: "/test/excel",
      name: "excelDisplay",
      component: () => import("@/views/test/excel.vue"),
      meta: {
        title: "excel表展示",
        showParent: true
      }
    }
  ]
};
