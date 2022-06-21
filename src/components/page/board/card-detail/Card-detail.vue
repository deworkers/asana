<template>
    <transition name="slideRight" v-if="cardDetail">
        <div :class="['card-detail', isCard ? 'card-detail--veiw':'']" v-if="showDetail || isCard" v-click-outside="hide">
            <Top 
                :hide="hide"
                :updateParam="updateParam"
                :id="cardDetail.id"
                :isCard="isCard"
                :ready="cardDetail.ready">
            </Top>
            <div class="card-detail-body">
                <div class="card-detail-title">
                    <div class="shadow">{{title}}</div>
                    <textarea v-model="$store.state.cardDetail.title"></textarea>
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
                            :project="cardDetail.project != undefined ? cardDetail.project : null"
                            :updateParam="updateParam">
                        </Projects>
                    </div>
                </div>

                
                <div class="card-tab-list">
                    <div @click="setActiveTab('description')" :class="['card-tab-list__one', tabActive == 'description'? 'active' : '']">Описание</div>
                    <div @click="setActiveTab('time')" :class="['card-tab-list__one', tabActive == 'time'? 'active' : '']">Тайм-трекер</div>
                    <div @click="setActiveTab('attachments')" :class="['card-tab-list__one', tabActive == 'attachments'? 'active' : '']">Вложения</div>
                </div>
                <div class="card-tab-body">
                    <div class="card-editor" v-show="tabActive == 'description'">
                        <vue-editor
                            v-model="$store.state.cardDetail.description" 
                            :editor-toolbar="customToolbar">
                        </vue-editor>
                    </div>
                    <div class="time-tracker"  v-show="tabActive == 'time'">
                        <Timer :id="cardDetail.id"></Timer>
                        <TimeSpent :id="cardDetail.id"></TimeSpent>                    
                    </div>
                    <div class="attachments"  v-show="tabActive == 'attachments'">
                        <Attachments :id="cardDetail.id"></Attachments> 
                    </div>
                </div>


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

    export default {
        name: 'Card-detail',
        data: function() {
            return {
                content: null,
                title: '',
                customToolbar: [
                    ["bold", "italic", "underline"],
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
            Attachments
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
            }
        },
        methods: {
            hide(event) {
                if (event.target.className !== 'card-title' && event.target.className !== 'card-bottom' && event.target.className !== 'board-card item') {
                    this.updateCard();
                    this.$store.commit('hideDetail');
                }
            },
            updateParam(newValue, param) {
                this.cardDetail[param] = newValue;
            },
            updateCard() {
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
            }
        },
        watch: {
            cardDetail(newValue, oldValue) {
                this.title = this.$store.state.cardDetail.title;
                this.content = this.$store.state.cardDetail.description;
            }
        }
    }
</script>
