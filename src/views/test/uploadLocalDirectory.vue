<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";
import { ipcRenderer } from "electron";

onBeforeMount(() => {
  ipcRenderer.on("selected-dir", (event, arg) => {
    console.log(arg);
  });
});

onMounted(() => {
  document.getElementById("dirs").addEventListener("click", () => {
    window.postMessage(
      {
        type: "select-dirs"
      },
      "*"
    );
  });
});

defineOptions({
  name: "dirsSelect"
});
</script>

<template>
  <div>
    <button id="dirs">Select Directory</button>
  </div>
</template>
