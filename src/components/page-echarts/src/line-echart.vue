<template>
    <div class="line-echart">
        <base-echart :options="options"></base-echart>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import BaseEchart from '@/base-ui/echart'

const props = withDefaults(
    defineProps<{
        title: string
        xLabels: string[]
        values: any[]
    }>(), {
        title: '折线图标题'
    }
)

const options = computed(() => {
    return {
        title: {
            text: props.title
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: props.xLabels
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '分类销量',
                data: props.values,
                type: 'line',
                areaStyle: {}
            }
        ]
    };
})

</script>

<style lang="scss" scoped>

</style>