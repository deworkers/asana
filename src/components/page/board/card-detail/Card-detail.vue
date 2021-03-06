<template>
    <transition name="slideRight" v-if="cardDetail">
        <div :class="['card-detail', isCard ? 'card-detail--view':'']" v-if="showDetail || isCard" v-click-outside="hide">
            <Top 
                :hide="hide"
                :updateParam="updateParam"
                :card="cardDetail"
                :isCard="isCard">
            </Top>
            <div class="card-detail-body">
                <div class="card-detail-title">
                    <div class="shadow">{{$store.state.cardDetail.title}}</div>
                    <textarea v-model="$store.state.cardDetail.title"></textarea>
                </div>

                <div class="card-detail-info">
                    <div class="card-detail-info__title">Автор задачи</div>
                    <div class="card-detail-info__text">
                        <div class="assignee-select">
                            <Avatar :user="cardDetail.created_by"></Avatar>
                            {{cardDetail.created_by.name}}
                        </div>
                    </div>
                </div>
                <div class="card-detail-info">
                    <div class="card-detail-info__title">Исполнитель</div>
                    <div class="card-detail-info__text">
                        <Assignee 
                            :assignee="cardDetail.assignee"
                            :updateParam="updateParam">
                        </Assignee>
                    </div>
                </div>
                <div class="card-detail-info">
                    <div class="card-detail-info__title">Срок выполнения</div>
                    <div class="card-detail-info__text">
                        <Calendar 
                            :deadline="cardDetail.deadline"
                            :updateParam="updateParam">
                        </Calendar>
                    </div>
                </div>
                <div class="card-detail-info">
                    <div class="card-detail-info__title">Проекты</div>
                    <div class="card-detail-info__text">
                        <Projects 
                            :project="cardDetail.project !== undefined ? cardDetail.project : null"
                            :updateParam="updateParam">
                        </Projects>
                    </div>
                </div>

                <div class="card-tab-list">
                    <div @click="setActiveTab('description')" :class="['card-tab-list__one', tabActive === 'description'? 'active' : '']">Описание</div>
                    <div @click="setActiveTab('time')" :class="['card-tab-list__one', tabActive === 'time'? 'active' : '']">Тайм-трекер {{timeSpentTotal}}</div>
                </div>
                <div class="card-tab-body">
                    <div class="card-editor" v-show="tabActive === 'description'">
                        <vue-editor
                            v-model="$store.state.cardDetail.description" 
                            :editor-toolbar="customToolbar">
                        </vue-editor>
                    </div>
                    <div class="time-tracker"  v-show="tabActive === 'time'">
                        <Timer 
                            :title="cardDetail.title" 
                            :id="cardDetail.id">
                        </Timer>
                        <TimeSpent :id="cardDetail.id"></TimeSpent>                    
                    </div>
                </div>
                
                <Attachments :id="cardDetail.id"></Attachments> 

                <MessageList v-if="journal" :messages="journal"></MessageList>
            </div>
            <div class="card-detail-footer">
                <MessageSend></MessageSend>
            </div>             
        </div>
    </transition>
</template>

<script>
    import ClickOutside from 'v-click-outside';
    import { VueEditor } from "vue2-editor";
    import MessageList from './message-list/Message-list.vue';
    import Calendar from './calendar/Calendar.vue';
    import Top from './top/Top.vue';
    import Assignee from './assignee/Assignee.vue';
    import Projects from './projects/Projects.vue';
    import MessageSend from './message-send/MessageSend.vue';
    import Timer from './timer/Timer.vue';
    import TimeSpent from './time-spent/TimeSpent.vue';
    import Attachments from './attachments/Attachments.vue';
    import Avatar from '@/avatar/Avatar.vue';
    import moment from 'moment';

    export default {
        name: 'Card-detail',
        data: function() {
            return {
                content: null,
                title: '',
                customToolbar: [
                    ["bold", "italic", "underline", 'strike'],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["image", "code-block", "blockquote", "link"]
                ],
                tabActive: 'description'
            }
        },
        props: {
            isCard: {
                type: Boolean,
                default: false
            }
        },
        components: {
            VueEditor,
            MessageList,
            Calendar,
            Top,
            Assignee,
            Projects,
            MessageSend,
            Timer,
            TimeSpent,
            Attachments,
            Avatar
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
            },
            journal() {
                return this.$store.state.journal;
            },
            timeSpentTotal() {
                return moment.utc(this.$store.state.timeSpentTotal*1000).format('HH:mm:ss');
            },
            id() {
                return this.$store.state.cardDetail ? this.$store.state.cardDetail.id : null;
            }
        },
        methods: {
            hide(event) {
                if (event.target.className !== 'card-title' && event.target.className !== 'card-bottom' && event.target.className !== 'board-card item' && !event.target.classList.contains('card-timer-button')) {
                    this.updateCard();
                    this.$store.commit('hideDetail');
                }
            },
            updateParam(newValue, param) {
                this.cardDetail[param] = newValue;
            },
            updateCard() {
                this.cardDetail.description = this.transformHtml(this.cardDetail.description);
                this.$store.commit('updateCard', this.cardDetail);
            },
            setActiveTab(tab) {
                this.tabActive = tab;
            },
            deepEqual(a, b) {
                if (a === b) {
                    return true;
                }
            
                if (a == null || typeof(a) != "object" ||
                    b == null || typeof(b) != "object")
                {
                    return false;
                }
            
                var propertiesInA = 0, propertiesInB = 0;
                for (var property in a) {
                    propertiesInA += 1;
                }
                for (var property in b) {
                    propertiesInB += 1;
                    if (!(property in a) || !deepEqual(a[property], b[property])) {
                        return false;        
                    }
                }        
                return propertiesInA == propertiesInB;
            },
            transformHtml(html) {
                if (html != null) {
                    let regexp = /((https?:\/\/|(www\.))[^\s<>";]+)/gim;
                    return html.replaceAll(regexp, (match, p1, p2, p3, offset, input) => {
                        if (input.slice(offset - 1, offset) !== '"' ) {
                            return `<a  href="${match}" rel="noopener noreferrer" target="_blank">${match}</a>`
                        } else {
                            return `${match}`;
                        }
                    })
                } else {
                    return html;
                }
            },
        },
        
        watch: {
            cardDetail(newValue, oldValue) {
                this.title = this.$store.state.cardDetail.title;
                this.content = this.$store.state.cardDetail.description;
            },
            id() {
                this.updateCard();
            }
        }
    }
</script>
