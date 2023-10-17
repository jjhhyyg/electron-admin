<template>
  <div>
    <div v-for="chart in chartList" :id="chart.id" :key="chart.id" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import echarts from "@/plugins/echarts";
import { EChartsType } from "echarts";
import { http } from "@/utils/http";
import { ElMessage } from "element-plus";

defineOptions({
  name: "echartsDisplay"
});

// 保存所有图表的实例
const echartsInstances = {};

function updateBackgroundImage(
  myChart: EChartsType,
  tmpCanvas: HTMLCanvasElement,
  tmpCanvasCtx: CanvasRenderingContext2D,
  img: HTMLImageElement
) {
  const rect = getRectBounding(myChart);
  if (!tmpCanvas) {
    tmpCanvas = document.createElement("canvas");
    tmpCanvasCtx = tmpCanvas.getContext("2d");
  }
  tmpCanvas.width = rect.width + rect.x;
  tmpCanvas.height = rect.height + rect.y;
  tmpCanvasCtx.drawImage(img, rect.x, rect.y, rect.width, rect.height);
  myChart.setOption({
    grid: {
      backgroundColor: {
        image: tmpCanvas,
        repeat: "no-repeat"
      }
    }
  });
}

// 保存背景到后端
const storeBackground = function (img: HTMLImageElement, fileName: string) {
  const formData = new FormData();

  // 绘制背景，用于保存
  const tmpCanvas = document.createElement("canvas");
  const tmpCanvasCtx = tmpCanvas.getContext("2d");
  tmpCanvas.width = img.width;
  tmpCanvas.height = img.height;
  tmpCanvasCtx.drawImage(img, 0, 0, img.width, img.height);

  // 将canvas转为blob，添加到formData中
  tmpCanvas.toBlob(blob => {
    formData.append("file", blob);
  }, "image/png");
  // 添加文件名
  formData.append("fileName", fileName);

  // 保存到后端
  http
    .post(
      "/file/uploadEchartBg",
      { data: formData },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
    .then(response => {
      ElMessage.success("背景上传成功");
      console.log(response);
    })
    .catch(error => {
      ElMessage.error("背景上传失败");
      console.log(error);
    });

  return { tmpCanvas, tmpCanvasCtx };
};

// 获取图表的边界
const getRectBounding = function (myChart: EChartsType) {
  return myChart._api.getCoordinateSystems()[0].getRect();
};

// 更换echarts图的背景
const changeEchartsBg = (params: any) => {
  // 获取当前图表的id
  const chartId = params.option.title[0].id;
  // 获取当前图表的echarts实例
  const myChart = echartsInstances[chartId];

  // 获取img对象
  const img = new Image();
  img.src = `http://localhost:8080/file/getEchartBg/${chartId}`;

  // 获取并保存背景
  const { tmpCanvas, tmpCanvasCtx } = storeBackground(img, chartId);

  // 更新背景 & 监听窗口变化
  img.onload = function () {
    updateBackgroundImage(myChart, tmpCanvas, tmpCanvasCtx, img);
    window.addEventListener("resize", function () {
      myChart.resize();
      updateBackgroundImage(myChart, tmpCanvas, tmpCanvasCtx, img);
    });
  };
};

// 多条折线图配置项
const option1 = {
  title: {
    text: "多折线图",
    id: "chart1"
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"]
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
    show: true
  },
  toolbox: {
    feature: {
      saveAsImage: {
        title: "保存图片"
      },
      dataView: {
        title: "数据视图"
      },
      myChangeBackground: {
        show: true,
        title: "更换背景",
        icon: "path://M37,37a4,4,0,0,0,4-4c0-1.473-1.333-3.473-4-6c-2.667,2.527-4,4.527-4,6a4,4,0,0,0,4,4ZM20.854,5.504l3.535,3.536M23.682,8.333L8.125,23.889L19.44,35.203l15.556-15.557L23.682,8.333ZM12,20.073l16.961,5.577M4,43h40\n",
        onclick: changeEchartsBg
      }
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: "Union Ads",
      type: "line",
      stack: "Total",
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};

// 每个图表的配置项
const chartList = [
  {
    id: "chart1",
    option: option1,
    style: {
      height: "400px"
    }
  },
  {
    id: "chart2",
    option: option1,
    style: {
      height: "400px"
    }
  }
];

onMounted(() => {
  // 初始化echarts实例
  for (let i = 0; i < chartList.length; i++) {
    const chart = chartList[i];
    const myChart = document.getElementById(chart.id);
    myChart.style.height = chart.style.height;
    const myEChart = echarts.init(myChart);
    myEChart.setOption(chart.option);
    echartsInstances[chart.id] = myEChart;
  }
});
</script>
