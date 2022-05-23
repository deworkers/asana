<template>
    <transition name="slideRight">
        <div class="card-detail" v-if="showDetail" v-click-outside="hide">
            <div class="card-detail-top">Выполнено / ссылка на задачу / закрыть</div>
            <div class="card-detail-body">Тут будет описание</div>
            <div class="card-detail-footer">тут будет отправка сообщений</div>             
        </div>
    </transition>
</template>

<script>
    import ClickOutside from 'v-click-outside';

    export default {
        name: 'Card-detail',
        data: function() {
            return {
                
            }
        },
        components: {
        },
        directives: {
            clickOutside: ClickOutside.directive
        },
        computed: {
            showDetail() {
                return this.$store.state.showDetail;
            }
        },
        methods: {
            hide(event) {
                console.log(event.target.className);
                if (event.target.className !== 'card-title' && event.target.className !== 'card-bottom') {
                    this.$store.commit('hideDetail');
                }
            }
        },
        mounted() {
            
        }
    }
</script>
