<template>
    <div class="mainLayer">
        <Sidebar></Sidebar>
        <Page></Page>
    </div>
</template>

<script>
    import Sidebar from './components/sidebar/Sidebar.vue';
    import Page from './components/page/Page.vue';

    export default {
        name: 'App',
        data: function() {
            return {
                
            }
        },
        components: {
            Sidebar,
            Page
        },
        computed: {
        },
        methods: {
            
        },
        mounted() {
            
        }
    }
</script>
