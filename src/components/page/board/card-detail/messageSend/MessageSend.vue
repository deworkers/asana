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
            messages: Array
        },
        components: {
            VueEditor
        },
        computed: {
            maker() {
                return this.$store.state.maker;
            },
            cardDetail() {
                return this.$store.state.cardDetail;
            }
        },
        methods: {
            send() {
                let comment = {
                    id: Math.floor(Math.random() * 100000),
                    type: 'comment',
                    logged_by: this.maker,
                    timestamp: "2022-06-04T10:20:30+05:00",
                    data: {
                        text: this.text
                    }
                }
                if (this.text.length > 0) {
                    this.$store.commit('addComment', {
                        id: this.cardDetail.id,
                        comment: comment
                    });
                    this.text = '';
                }
            }
        },
        mounted() {
            
        }
    }
</script>
