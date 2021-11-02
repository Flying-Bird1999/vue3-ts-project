<template>
    <div class="user">
        <xc-Form v-bind="searchFormConfig" />
        <div class="content">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import XcForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
    components: {
        XcForm
    },
    name: 'user',
    setup() {
        return {
            searchFormConfig
        }
    }
})
</script>

<style scoped></style>
