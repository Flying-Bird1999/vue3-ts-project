<template>
    <div class="role">
        <page-search :searchFormConfig="searchFormConfig" />
        <page-content 
            :contentTableConfig="contentTableConfig" 
            pageName="role" 
            @newBtnClick="handleNewData"
            @editBtnClick="handleEditData"
        />
        <page-modal
            ref="pageModalRef"
            :defaultInfo="defaultInfo"
            :otherInfo="otherInfo"
            :modalConfig="modalConfig" 
            pageName="role"
        >
            <div class="menu-tree">
                <!-- 菜单树的展示 -->
                <el-tree
                    ref="elTreeRef"
                    :data="menus"
                    show-checkbox
                    node-key="id"
                    :props="{ children: 'children', label: 'name' }"
                    @check="handleCheckChange"
                >
                </el-tree>
            </div>
        </page-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { menuMapLeafKeys } from '@/utils/map-menus'

import { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
    name: 'role',
    components: {
        PageSearch,
        PageContent,
        PageModal
    },
    setup() {
        const elTreeRef = ref<InstanceType<typeof ElTree>>()
        const editCallback = (item: any) => {
            const leafKeys = menuMapLeafKeys(item.menuList)
            nextTick(() => {
                console.log(elTreeRef.value)
                elTreeRef.value?.setCheckedKeys(leafKeys, false)
            })
        }
        const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(undefined, editCallback)

        const store = useStore()
        const menus = computed(() => store.state.entireMenu)

        // 将菜单树的数据进行保存在otherInfo中
        const otherInfo = ref({})
        const handleCheckChange = (data1: any, data2: any) => {
            const checkedKeys = data2.checkedKeys
            const halfCheckedKeys = data2.halfCheckedKeys
            const menuList = [...checkedKeys, ...halfCheckedKeys]
            otherInfo.value = { menuList }
        }


        return {
            searchFormConfig,
            contentTableConfig,
            modalConfig,
            pageModalRef,
            defaultInfo,
            handleNewData,
            handleEditData,
            menus,
            otherInfo,
            handleCheckChange,
            elTreeRef
        }
    }
})
</script>

<style scoped>
.menu-tree {
    margin-left: 25px;
}
</style>
