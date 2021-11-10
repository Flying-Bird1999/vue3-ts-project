<template>
    <div class="dashboard">
        <el-row :gutter="10">
            <el-col :span="7">
                <xc-card title="分类商品数量(饼图)"></xc-card>
            </el-col>
            <el-col :span="10">
                <xc-card title="不同城市商品销量"></xc-card>
            </el-col>
            <el-col :span="7">
                <xc-card title="分类商品数量(玫瑰图)"></xc-card>
            </el-col>
        </el-row>

        <el-row :gutter="10" class="content-row">
            <el-col :span="12">
                <xc-card title="分类商品的销量"></xc-card>
            </el-col>
            <el-col :span="12">
                <xc-card title="分类商品的收藏"></xc-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import XcCard from '@/base-ui/card'

export default defineComponent({
    name: 'dashboard',
    components: {
        XcCard
    },
    setup() {
        const store = useStore()
        store.dispatch('dashboard/getDashboardDataAction')

        return {}
    }
})
</script>

<style scoped>
.content-row {
    margin-top: 20px;
}
</style>
