<template>
    <div class="comment-one">
        <Avatar :user="message.logged_by"></Avatar>
        <div class="comment-one-top">
            <strong>{{message.logged_by.name}}</strong> {{date}}
        </div>
        <div class="comment-one-bottom" v-html="message.data.text"></div>
    </div>
</template>

<script>
    import moment from 'moment';
    import Avatar from '@/avatar/Avatar.vue';

    export default {
        name: 'Comment',
        data() {
            return {
                show: false
            }
        },
        props: {
            message: Object
        },
        components: {
            Avatar
        },
        computed: {
            date() {
                let date = moment(this.message.timestamp);
                return  date.locale("ru").fromNow();
            }
        },
        methods: {
            
        },
        mounted() {
            
        }
    }
</script>
