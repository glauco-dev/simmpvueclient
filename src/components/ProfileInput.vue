<script setup lang="ts">
import InputText from 'primevue/inputtext';

defineProps<{
  onChange: any,
  field: any,
  initialValueSource:any
}>()
</script>
<template>
    <div :class="'flex flex-column gap-2 col s'+((parseInt(field[6]))*4)">
        <label :for="field[1]">{{ field[0] }}</label>
        <InputText
            class="form-control"
            :type="field[2]"
            :value="initialValueSource[field[1]]"
            v-on:change="onChange"
            :placeholder="field[0]"
        />  
    </div>
</template>