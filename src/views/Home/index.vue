<template>
  <div class="home">
    <div class="box">
      {{ value }}==
      <TreeSelect v-model="value" :options="options" placeholder="请选择" isMultiple />
    </div>
    <br />
    <br />
  </div>
</template>

<script setup>
  const options = ref([
    {
      id: '1',
      label: 'a',
    },
    {
      id: '2',
      label: 'aa',
      parentId: '1',
    },
    {
      id: '3',
      label: 'ab',
      parentId: '1',
    },
    {
      id: '4',
      label: 'b',
    },
    {
      id: '5',
      label: 'c',
    },
    {
      id: '6',
      label: 'd',
      parentId: '5',
    },
    {
      id: '7',
      label: 'e',
      parentId: '5',
    },
    {
      id: '8',
      label: 'f',
      parentId: '5',
    },
  ]);
  const value = ref(['1']);
</script>
<style scoped lang="scss"></style>
