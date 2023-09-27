import { addIcon } from "@iconify/vue/dist/offline";

/**
 * 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
 */

// 本地菜单图标，后端在路由的icon中返回对应的图标字符串并且前端在此处使用addIcon添加即可渲染菜单图标
import HomeFilled from "@iconify-icons/ep/home-filled";
import InformationLine from "@iconify-icons/ri/information-line";
import Lollipop from "@iconify-icons/ep/lollipop";
import FileExcel2Fill from "@iconify-icons/ri/file-excel-2-fill";
import EditBoxLine from "@iconify-icons/ri/edit-box-line";
import ModelAlt from "@iconify-icons/carbon/model-alt";
import ClusterManagement from "@iconify-icons/eos-icons/cluster-management";
import AccountManagement from "@iconify-icons/fluent-mdl2/account-management";
import Import from "@iconify-icons/mdi/import";
import Analysis from "@iconify-icons/icon-park-outline/analysis";
import ImportOutlined from "@iconify-icons/ant-design/import-outlined";
import CubeFill from "@iconify-icons/ph/cube-fill";

addIcon("homeFilled", HomeFilled);
addIcon("informationLine", InformationLine);
addIcon("lollipop", Lollipop);
addIcon("fileExcel2Fill", FileExcel2Fill);
addIcon("editBoxLine", EditBoxLine);
addIcon("modelAlt", ModelAlt);
addIcon("clusterManagement", ClusterManagement);
addIcon("accountManagement", AccountManagement);
addIcon("import", Import);
addIcon("analysis", Analysis);
addIcon("importOutlined", ImportOutlined);
addIcon("cubeFill", CubeFill);
