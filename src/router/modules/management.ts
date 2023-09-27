export default {
  path: "/management",
  meta: {
    title: "数据管理",
    rank: 2,
    icon: "accountManagement"
  },
  children: [
    {
      path: "/management/experiment",
      name: "experimentManagement",
      component: () => import("@/views/management/experimentManagement.vue"),
      meta: {
        title: "试验管理",
        showParent: true,
        icon: "clusterManagement"
      }
    },
    {
      path: "/management/evaluationModel",
      name: "evaluationModelManagement",
      component: () =>
        import("@/views/management/evaluationModelManagement.vue"),
      meta: {
        title: "评价模型管理",
        showParent: true,
        icon: "cubeFill"
      }
    }
  ]
};
