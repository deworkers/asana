<template>
    <div class="message-list">
        <div v-for="message in messages">
            <span v-html="message.type"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Message-list',
        data: function() {
            return {
                show: false
            }
        },
        props: {
            messages: Array
        },
        components: {

        },
        computed: {
        },
        methods: {
            
        },
        mounted() {
            
        }
    }
</script>
