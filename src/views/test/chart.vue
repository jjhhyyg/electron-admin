<template>
  <div>
    <div v-for="chart in chartList" :id="chart.id" :key="chart.id" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { EChartsType } from "echarts";
import { http } from "@/utils/http";
import { ElMessage } from "element-plus";
import Echarts from "@/plugins/echarts";

defineOptions({
  name: "echartsDisplay"
});

// 保存所有图表的实例
const echartsInstances = {};

// 改变图标背景（主动上传图片）
// const changeEchartsBg = (chartId: string, myChart: EChartsType) => {
const changeEchartsBg = (chartId: string) => {
  // 获取当前图表的id
  // 获取当前图表的echarts实例
  const myChart = echartsInstances[chartId];

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/jpeg, image/png, image/jpg";
  input.onchange = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (!file) return;
    if (!input.accept.includes(file.type)) {
      ElMessage.error("请选择图片文件，仅支持jpg, jpeg和png！");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    const img = new Image();
    img.onload = () => {
      const tmpCanvas = document.createElement("canvas");
      const tmpCanvasCtx = tmpCanvas.getContext("2d");
      if (!tmpCanvasCtx) {
        ElMessage.error("无法创建画布上下文");
        return;
      }
      // 使用updateBackgroundImage函数更新图表背景
      updateBackgroundImage(myChart, tmpCanvas, tmpCanvasCtx, img);

      tmpCanvas.toBlob(blob => {
        if (!blob) {
          ElMessage.error("无法将画布转换为Blob对象");
          return;
        }
        const formData = new FormData();
        formData.append("file", blob);
        formData.append("fileName", `${chartId}.png`);
        // 上传到服务器
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
          .then(_ => {
            ElMessage.success("背景上传成功");
          })
          .catch(_ => {
            ElMessage.error("背景上传失败");
          });
      }, "image/png");
    };
  };
  input.click();
};

// Function to create the custom toolbox feature with the correct chartId
const createCustomToolbox = (chartId: string) => {
  return {
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
        onclick: function () {
          // Pass the chartId when calling the changeEchartsBg function
          changeEchartsBg(chartId);
        }
      }
    }
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
  toolbox: createCustomToolbox("chart1"),
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
const option2 = {
  title: {
    text: "多折线图",
    id: "chart2"
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
  toolbox: createCustomToolbox("chart2"),
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
    option: option2,
    style: {
      height: "400px"
    }
  }
];

// 更新图表背景（当图表大小发生变化时）
const updateBackgroundImage = (
  myChart: EChartsType,
  tmpCanvas: HTMLCanvasElement,
  tmpCanvasCtx: CanvasRenderingContext2D,
  img: HTMLImageElement
) => {
  const rect = getGridDimensions(myChart);
  console.log(rect);
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
};

// 请求图表背景
const requestBackgroundImage = (myChart: any, chartId: string): Boolean => {
  http.get(`/file/getEchartBg/${chartId}.png`).then((res: any) => {
    const img = new Image();
    const tmpCanvas = document.createElement("canvas");
    const tmpCanvasCtx = tmpCanvas.getContext("2d");
    img.src = `http://localhost:8080/file/getEchartBg/${chartId}.png`;
    img.onload = () => {
      // 更新图表背景
      updateBackgroundImage(myChart, tmpCanvas, tmpCanvasCtx, img);
      window.addEventListener("resize", function () {
        updateBackgroundImage(myChart, tmpCanvas, tmpCanvasCtx, img);
      });
    };
    return !!res.data;
  });
  return false;
};

// 获取图表的边界
function getGridDimensions(echartInstance: any) {
  // Directly access the coordinate system to get the grid dimensions
  const grid = echartInstance._coordSysMgr.getCoordinateSystems()[0].getRect();
  return {
    x: grid.x,
    y: grid.y,
    width: grid.width,
    height: grid.height
  };
}

const initChart = (chartConfig: any) => {
  const chartDom = document.getElementById(chartConfig.id);
  if (chartDom) {
    chartDom.style.height = chartConfig.style.height;
    const myEChart = Echarts.init(chartDom);
    myEChart.setOption(chartConfig.option);
    echartsInstances[chartConfig.id] = myEChart; // Store the instance
    return myEChart;
  }
  return null;
};

onMounted(() => {
  chartList.forEach(chartConfig => {
    const myEChart = initChart(chartConfig);
    // Make sure the chart instance is valid before adding resize listener
    if (myEChart) {
      requestBackgroundImage(myEChart, chartConfig.id);
      window.addEventListener("resize", () => {
        // Check if the chart instance is still valid during resize
        if (myEChart && myEChart.resize) {
          myEChart.resize();
        }
      });
    }
  });
});
</script>
