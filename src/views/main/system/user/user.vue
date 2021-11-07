<template>
    <div class="user">
        <page-search 
            :searchFormConfig="searchFormConfig" 
            @resetBtnClick="handleResetClick"
            @queryBtnClick="handleQueryClick"
        />
        <page-content 
            ref="pageContentRef"
            :contentTableConfig='contentTableConfig' 
            pageName="users" 
            @newBtnClick="handleNewData"
            @editBtnClick="handleEditData"
        />
        <page-modal
            ref="pageModalRef"
            :defaultInfo='defaultInfo'
            :modalConfig="modalConfig"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
    name: 'user',
    components: {
        PageSearch,
        PageContent,
        PageModal
    },
    setup() {
        const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

        // pageModal相关的hook逻辑
        const newCallback = () => {
            const passwordItem = modalConfig.formItems.find(item => {
                return item.field === 'password'
            })
            passwordItem!.isHidden = false
        }
        const editCallback = () => {
            const passwordItem = modalConfig.formItems.find(item => {
                return item.field === 'password'
            })
            passwordItem!.isHidden = true
        }

        const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(newCallback, editCallback)
        
        return {
            searchFormConfig,
            contentTableConfig,
            handleResetClick,
            handleQueryClick,
            pageContentRef,
            modalConfig,
            pageModalRef,
            handleNewData,
            handleEditData,
            defaultInfo
        }
    }
})
</script>

<style scoped lang="less"></style>
