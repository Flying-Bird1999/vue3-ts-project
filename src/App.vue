<template>
    <router-link to='/login'>登陆</router-link>
    <router-link to='/main'>首页</router-link>
    <router-view></router-view>
    <el-button>hahaha</el-button>
    <el-button type="primary">hahaha</el-button>
    <el-button type="mini">hahaha</el-button>
</template>

<script lang="ts">
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "App",
    })
</script>

<style lang="less">

</style>
