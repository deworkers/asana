<template>
    <div class="message-list">
        <div class="message-list-title">
            Комментарии и уведомления
        </div> 
        <div v-for="message in messages" class="message-list-one">
            <Comment v-if="message.type == 'comment'" :message="message"></Comment>
            <Change v-if="message.type == 'change_column'" :message="message"></Change>
            <Ready v-if="message.type == 'mark_ready'" :message="message"></Ready>
            <Unready v-if="message.type == 'unmark_ready'" :message="message"></Unready>
            <Create v-if="message.type == 'create_issue'" :message="message"></Create>
        </div>
    </div>
</template>

<script>
    import Comment from './comment/Comment.vue';
    import Change from './change/Change.vue';
    import Ready from './ready/Ready.vue';
    import Unready from './unready/Unready.vue';
    import Create from './create/Create.vue';

    export default {
        name: 'Message-list',
        data: function() {
            return {
                
            }
        },
        props: {
            messages: Array
        },
        components: {
            Comment,
            Change,
            Ready,
            Unready,
            Create
        },
        computed: {
            cardDetail() {
                return this.$store.state.cardDetail;
            }
        },
        methods: {
            
        },
        mounted() {
            
        }
    }
</script>
