<template>
    <div class="comment-one">
        <Avatar :user="message.logged_by"></Avatar>
        <div class="comment-one-top">
            <div class="">
                <strong>{{message.logged_by.name}}</strong> {{date}}
            </div>
            <div class="comment-edit">
                <button uk-icon="icon: pencil" @click="edit"></button>
                <button uk-icon="icon: close" @click="remove"></button>
            </div>
        </div>
        <div v-if="!editing" class="comment-one-bottom" v-html="transformHtml(message.data.text)"></div>
        <vue-editor 
            v-if="editing"
            v-model="message.data.text" 
            :editor-toolbar="customToolbar">
        </vue-editor>
        <button v-if="editing" class="comment-send-button" @click="save">Сохранить</button>
    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor";
    import moment from 'moment';
    import Avatar from '@/avatar/Avatar.vue';
    import axios from 'axios';

    export default {
        name: 'Comment',
        data() {
            return {
                editing: false,
                customToolbar: [
                    ["bold", "italic", "underline", 'strike'],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["image", "code-block", "blockquote", "link"]
                ]
            }
        },
        props: {
            message: Object
        },
        components: {
            Avatar,
            VueEditor
        },
        computed: {
            date() {
                let date = moment(this.message.timestamp);
                return  date.locale("ru").fromNow();
            },
            cardId() {
                return this.$store.state.cardDetail.id;
            }
        },
        methods: {
            remove() {
                axios({
                    method: 'delete',
                    url: BASE_URL + '/issue/' + this.cardId + '/comment/' + this.message.id,
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                })
                .then((response) => {
                    this.$store.dispatch('getJournal', this.cardId);
                });
            }, 
            edit() {
                this.editing = !this.editing;
            },
            save() {
                this.edit();
                axios({
                    method: 'put',
                    url: BASE_URL + '/issue/' + this.cardId + '/comment/' + this.message.id,
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true,
                    data: {
                        text: this.message.data.text
                    }
                })
                .then((response) => {
                    this.$store.dispatch('getJournal', this.cardId);
                });
            },
            transformHtml(html) {
                let regexp = /((https?:\/\/|(www\.))[^\s<>";]+)/gim;
                return html.replaceAll(regexp, (match, p1, p2, p3, offset, input) => {
                    if (input.slice(offset - 1, offset) != '"' ) {
                        return `<a  href="${match}" rel="noopener noreferrer" target="_blank">${match}</a>`
                    } else {
                        return `${match}`;
                    }
                })
            }
        },
        mounted() {
            
        }
    }
</script>
