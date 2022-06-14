<template>
    <div class="comment-editor">
        <vue-editor 
            v-model="text" 
            :editor-toolbar="customToolbar">
        </vue-editor>
        <button class="comment-send-button" @click="send">Комментировать</button>
    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor";
    import moment from 'moment';

    export default {
        name: 'MessageSend',
        data() {
            return {
                text: '',
                customToolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["image", "code-block", "blockquote", "link"]
                ]
            }
        },
        props: {
            
        },
        components: {
            VueEditor
        },
        computed: {
            cardDetail() {
                return this.$store.state.cardDetail;
            }
        },
        methods: {
            send() {
                if (this.text.length > 0) {
                    this.$store.commit('addComment', {
                        id: this.cardDetail.id,
                        text: this.text
                    });
                    this.text = '';
                }
            }
        },
        mounted() {
            
        }
    }
</script>
