<template>
    <transition name="slideRight">
        <div class="card-detail" v-if="showDetail" v-click-outside="hide">
            <div class="card-detail-top">Выполнено / ссылка на задачу / закрыть</div>
            <div class="card-detail-body">
                <div class="card-detail-title">
                    <div class="shadow">{{title}}</div>
                    <textarea name="" v-model="title"></textarea>
                </div>
                <div class="card-detail-info">
                    Исполнитель: {{cardDetail.performer.name}}<br>
                    Срок выполнения: {{cardDetail.dueDate}}<br>
                    Проекты: <br>
                </div>
                <div class="card-editor">
                    <vue-editor 
                        v-model="content" 
                        :editor-toolbar="customToolbar">
                    </vue-editor>
                </div>
                <div>
                    
                </div>
                
            </div>
            <div class="card-detail-footer">тут будет отправка сообщений</div>             
        </div>
    </transition>
</template>

<script>
    import ClickOutside from 'v-click-outside';
    import { VueEditor } from "vue2-editor";

    export default {
        name: 'Card-detail',
        data: function() {
            return {
                content: null,
                title: null,
                customToolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["image", "code-block", "blockquote", "link"]
                ]
            }
        },
        components: {
            VueEditor
        },
        directives: {
            clickOutside: ClickOutside.directive
        },
        computed: {
            showDetail() {
                return this.$store.state.showDetail;
            },
            cardDetail() {
                return this.$store.state.cardDetail;
            }
        },
        methods: {
            hide(event) {
                console.log(event.target.className);
                if (event.target.className !== 'card-title' && event.target.className !== 'card-bottom' && event.target.className !== 'board-card item') {
                    this.$store.commit('hideDetail');
                }
            }
        },
        watch: {
            cardDetail(newValue, oldValue) {
                this.title = this.$store.state.cardDetail.title;
                this.content = this.$store.state.cardDetail.description;
            }
        },
        mounted() {
            
        }
    }
</script>
