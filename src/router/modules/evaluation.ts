export default {
  path: "/evaluation",
  meta: {
    title: "试验评估",
    rank: 3,
    icon: "analysis"
  },
  children: [
    {
      path: "/evaluation/index",
      name: "evaluationIndex",
      component: () => import("@/views/evaluation/index.vue"),
      meta: {
        title: "试验评估"
      }
    }
  ]
};
