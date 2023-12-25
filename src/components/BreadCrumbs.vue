<!-- Breadcrumbs.vue -->

<template>
    <div class="breadcrumbs-nav">
      <router-link
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        :to="crumb.to"
      >
        {{ crumb.text }}
      </router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  import {router} from '@/main';
import { computed } from 'vue';
  
  const breadcrumbs = computed(() => {

    const matchedRoutes = router.currentRoute.value.matched;
  
    const result = matchedRoutes
      .filter((route) => route.meta && route.meta.title)
      .map((route) => ({
        text: route.meta.title,
        to: route.path,
      }));
    
  
    return result;
  });
  </script>
  
  <style lang="scss" scoped>
    .breadcrumbs-nav{
      height: 50px;
    }
  </style>
  