<template>
    <div class="mainLayer">
        <Sidebar></Sidebar>
        <Page></Page>
    </div>
</template>

<script>
    import Sidebar from './../components/sidebar/Sidebar.vue';
    import Page from './../components/page/Page.vue';
    export default {
        name: 'app',
        components: {
            Sidebar,
            Page
        },
        data() {
            return {
                
            }
        }
    }
</script>