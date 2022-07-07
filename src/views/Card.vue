<template>
    <div class="mainLayer">
        <Sidebar></Sidebar>
        <div class="page">
            <CardDetail :isCard="true"></CardDetail>
        </div>
    </div>
</template>

<script>
    import Sidebar from './../components/sidebar/Sidebar.vue';
    import CardDetail from './../components/page/board/card-detail/Card-detail.vue';

    export default {
        name: 'app',
        components: {
            Sidebar,
            CardDetail
        },
        computed: {
            showSide() {
                return this.$store.state.showSide
            },
            activeBoard() {
                return this.$store.state.activeBoard
            },
            
        },
        methods: {
            toogleSide() {
                this.$store.commit('toogleSide');
            },
            initials(str) {
                return str.split(/\s+/).map((item,i) => item[0].toUpperCase()).join('');
            }
        }
    }
</script>