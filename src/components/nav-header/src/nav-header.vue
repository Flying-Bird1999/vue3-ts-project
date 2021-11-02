<template>
    <div class="nav-header">
        <i
            class="fold-menu"
            :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="handleFoldClick"
        ></i>
        <div class="content">
            <xc-breadcrumb :breadcrumbs="breadcrumbs" />
            <user-info />
        </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
import XcBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
    components: {
        UserInfo,
        XcBreadcrumb
    },
    emits: ['foldChange'],
    setup(props, { emit }) {
        const isFold = ref(false)
        const handleFoldClick = () => {
            isFold.value = !isFold.value
            emit('foldChange', isFold.value)
        }

        // 面包屑数据
        const store = useStore()
        const breadcrumbs = computed(() => {
            const userMenus = store.state.login.userMenus
            const route = useRoute()
            const currentPath = route.path
            return pathMapBreadcrumbs(userMenus, currentPath)
        })


        return {
            isFold,
            breadcrumbs,
            handleFoldClick
        }
    }
});
</script>

<style scoped lang='less'>
    .nav-header {
        display: flex;
        width: 100%;

        .fold-menu {
            font-size: 30px;
            cursor: pointer;
        }

        .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            padding: 0 20px;
        }
    }
</style>