<template>
    <div class="attachment-body">
        <div class="attachment-list" uk-grid >
            <div v-for="attachment in attachments">
                <a class="uk-inline" :href="'https://task.sbtest.ru' + attachment.url">
                    <img :src="'https://task.sbtest.ru' + attachment.url" width="100" alt="">
                </a>
            </div>
        </div>
        <Upload :id="id"></Upload>
    </div>
</template>
   
<script>
    import Upload from './file-upload/File-upload.vue';

    export default {
        name: 'attachments',
        data() {
            return {

            }
        },
         props: {
            id: Number
        },
        components: {
            Upload
        },
        computed: {
            attachments() {
                return this.$store.state.attachments;
            }
        },
        methods: {
            
        },
        mounted () {
        },
    }
</script>