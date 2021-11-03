<template>
    <div class="user">
        <xc-Form v-bind="searchFormConfig" v-model='formData' />
        <div class="content">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import XcForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
    components: {
        XcForm
    },
    name: 'user',
    setup() {
        const formData = ref({
            id: '',
            name: '',
            password: '',
            sport: '',
            createTime: ''
        })

        return {
            searchFormConfig,
            formData
        }
    }
})
</script>

<style scoped></style>
