<template>
    <div class="page-content">
        <xc-table 
            :listData='dataList' 
            :listCount='dataCount' 
            v-bind="contentTableConfig"
            v-model:page="pageInfo"
        >
            <!-- header中的插槽 -->
            <!-- <template #header>
                <h2>hahah</h2>
            </template> -->
            <template #header-handler>
                <el-button type="primary" size="medium">新建用户</el-button>
            </template>

            <!-- 列中的插槽 -->
            <template #status='scope'>
                <el-button plain size="mini" :type="scope.enable?'danger':'success'">
                    {{ scope.row.enable ? '启用' : '禁用' }}
                </el-button>
            </template>
            <template #createAt="scope">
                <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
            </template>
            <template #updateAt="scope">
                <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
            </template>
            <template #handler>
                <div class="handle-btns">
                    <el-button icon="el-icon-edit" size="mini" type="text">编辑</el-button>
                    <el-button icon="el-icon-delete" size="mini" type="text">删除</el-button>
                </div>
            </template>
        </xc-table>
    </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'

import XcTable from '@/base-ui/table'

export default defineComponent({
    components: {
        XcTable
    },
    props: {
        contentTableConfig: {
            type: Object,
            required: true
        },
        pageName: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const store = useStore()

        // 双向绑定pageInfo
        const pageInfo = ref({ currentPage: 0, pageSize: 10 })
        watch(pageInfo, () => getPageData())

        // 发送网络请求
        const getPageData = (queryInfo: any = []) => {
            store.dispatch('system/getPageListAction', {
                pageName: props.pageName,
                queryInfo: {
                    offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
                    size: pageInfo.value.pageSize,
                    ...queryInfo
                }
            })
        }
        getPageData()

        // 从vuex中获取数据
        const dataList = computed(() => {
            return store.getters[`system/pageListData`](props.pageName)
        })
        const dataCount = computed(() => {
            return store.getters[`system/pageCountData`](props.pageName)
        })


        return {
            dataList,
            dataCount,
            getPageData,
            pageInfo
        }
    }
});
</script>

<style scoped lang='less'>
.page-content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
}
</style>