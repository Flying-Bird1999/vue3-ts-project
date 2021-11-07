<template>
    <div class="page-modal">
        <el-dialog
            title="新建用户"
            v-model="dialogVisible"
            width="30%"
            center
            destroy-on-close
        >
            <xc-form v-bind="modalConfig" v-model="formData"></xc-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button 
                        type="primary" 
                        @click="handleConfirmClick"
                    >确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import XcForm from '@/base-ui/form'
import { useStore } from 'vuex';

export default defineComponent({
    components: {
        XcForm
    },
    props: {
        modalConfig: {
            type: Object,
            required: true
        },
        defaultInfo: {
            type: Object,
            default: () => ({})
        },
        pageName: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const dialogVisible = ref(false)
        const formData = ref<any>({})

        watch(() => props.defaultInfo, (newVal) => {
            for(const item of props.modalConfig.formItems) {
                formData.value[`${item.field}`] = newVal[`${item.field}`]
            }
        })

        // 点击确定按钮的逻辑
        const store = useStore()
        const handleConfirmClick = () => {
            dialogVisible.value = false
            if(Object.keys(props.defaultInfo).length) {
                // 编辑
                store.dispatch('system/editPageDataAction', {
                    pageName: props.pageName,
                    editData: { ...formData.value },
                    id: props.defaultInfo.id
                })
            }else {
                console.log(222)
                store.dispatch('system/createPageDataAction', {
                    pageName: props.pageName,
                    newData: { ...formData.value }
                })
            }
        }

        return {
            dialogVisible,
            formData,
            handleConfirmClick
        }
    }
});
</script>

<style scoped lang='less'>
</style>