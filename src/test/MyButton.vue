<script setup lang="ts">
import type{ButtonProps} from 'element-plus'
import { useAttrs } from 'vue';
const props=defineProps<Partial<Omit<ButtonProps,'loading'>>>();
const attrs=useAttrs();
console.log(attrs)
console.log(props)
</script>
<template>
    <div>
        <el-button v-bind="props">
            <slot></slot>
        </el-button>
    </div>
</template>