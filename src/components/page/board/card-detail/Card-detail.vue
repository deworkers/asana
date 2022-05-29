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
                    <div class="card-detail-info__title">Исполнитель</div>
                    <div class="card-detail-info__text">{{cardDetail.performer.name}}</div>
                </div>
                <div class="card-detail-info">
                    <div class="card-detail-info__title">Срок выполнения</div>
                    <div class="card-detail-info__text">
                        <Calendar 
                            :updateDate="updateDate"
                            :dueDate="cardDetail.dueDate">
                        </Calendar>
                    </div>
                </div>
                <div class="card-detail-info">
                    <div class="card-detail-info__title">Проекты</div>
                    <div class="card-detail-info__text">//список проектов//</div>
                </div>

                <div class="card-detail-info">
                    <div class="card-detail-info__title">Описание</div>
                </div>
                <div class="card-editor">
                    <vue-editor 
                        v-model="content" 
                        :editor-toolbar="customToolbar">
                    </vue-editor>
                </div>

                <MessageList :messages="cardDetail.messages"></MessageList>
                
            </div>
            <div class="card-detail-footer">тут будет отправка сообщений</div>             
        </div>
    </transition>
</template>

<script>
    import ClickOutside from 'v-click-outside';
    import { VueEditor } from "vue2-editor";
    import MessageList from './Message-list/Message-list.vue';
    import Calendar from './calendar/Calendar.vue';

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
            VueEditor,
            MessageList,
            Calendar
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
                if (event.target.className !== 'card-title' && event.target.className !== 'card-bottom' && event.target.className !== 'board-card item') {
                    this.$store.commit('hideDetail');
                }
            },
            updateDate(newDate) {
                this.cardDetail.dueDate = newDate;
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
