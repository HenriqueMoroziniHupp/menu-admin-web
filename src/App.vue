<script setup>
const isDesktop = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  return !/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
};

if (isDesktop()) document.documentElement.classList.add('desktop');
</script>

<template>
    <router-view />
</template>

<style scoped></style>
