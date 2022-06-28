<template>
    <div class="attachment-body">
        <LightBox :id="id" :images="attachments"></LightBox>
        <Upload :id="id"></Upload>
    </div>
</template>
   
<script>
    import Upload from './file-upload/File-upload.vue';
    import LightBox from './light-box/Light-box.vue';

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
            Upload,
            LightBox
        },
        computed: {
            attachments() {
                return this.$store.state.attachments;
            }
        },
        methods: {
            showLightbox: function(imageName) {
                this.$refs.lightbox.show(imageName);
            }
        },
        mounted () {
        },
    }
</script>