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
        },
        watch: {
            $route(to, from) {
                let needUpdate = to.name == from.name;
                if (to.path != '/') {
                    if (needUpdate) {
                        this.$store.dispatch('getCards', to.path);
                        this.$store.dispatch('getArchive', to.params.id);
                    }
                } else {
                    if (needUpdate) {
                        this.$store.dispatch('getCards', '/user/issues');
                    }
                }
                
            }
        },
        mounted () {
            this.$store.dispatch('openWebSocket');
        },
    }
</script>