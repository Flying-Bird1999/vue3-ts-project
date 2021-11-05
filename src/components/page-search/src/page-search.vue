<template>
    <div class="page-search">
        <xc-Form v-bind="searchFormConfig" v-model='formData'>
            <template #header>
                <h1 class="header">高级检索</h1>
            </template>
            <template #footer>
                <div class="handle-btns">
                    <el-button icon="el-icon-refresh" @click="handleResetClick">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="handleQueryClick">搜索</el-button>
                </div>
            </template>
        </xc-Form>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import XcForm from '@/base-ui/form'

export default defineComponent({
    components: {
        XcForm
    },
    props: {
        searchFormConfig: {
            type: Object,
            required: true
        }
    },
    emits: ['resetBtnClick', 'queryBtnClick'],
    setup(props, {emit}) {

        // 双向绑定的属性应该是由配置文件的field来决定
        // 优化1. formData中的属性应该动态决定
        const formItems = props.searchFormConfig?.formItems ?? []
        const formOriginData: any = {}
        for (const item of formItems) {
            formOriginData[item.field] = ''
        }
        const formData = ref(formOriginData)

        // 优化2. 用户点击重置时
        const handleResetClick = () => { 
            for(const key in formOriginData) {
                formData.value[`${key}`] = formOriginData[key]
            }
            emit('resetBtnClick')
        }

        // 优化3. 点击搜索
        const handleQueryClick = () => {
            emit('queryBtnClick', formData.value)
        }

        return {
            formData,
            handleResetClick,
            handleQueryClick
        }
    }
});
</script>

<style scoped lang='less'>
    .header {
        color: red;
    }
    .handle-btns {
        text-align: right;
        padding: 0 50px 20px 0;
    }
</style>