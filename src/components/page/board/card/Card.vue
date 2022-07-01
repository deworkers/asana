<template>
    <div class="board-card item" @click.self="select">
        <button v-if="column != 'archive'" class="card-remove" @click="removeCard">
            <span class="uk-icon" uk-icon="trash"></span>
        </button>
        <div class="card-body">
            <div @click="select" class="card-title">{{card.title}}</div>
            <div 
                :class="['card-compleet', card.ready ? 'compleet': compleet]"
                @click="compleet">
            </div>
        </div>
        <div class="card-bottom" @click.self="select">
            <Assignee
                :assignee="card.assignee"
                :updateParam="updateParam">
            </Assignee>
            <Calendar 
                :updateParam="updateParam"
                :deadline="card.deadline">
            </Calendar>
        </div>
    </div>
</template>

<script>
    import Calendar from './../card-detail/calendar/Calendar.vue';
    import Assignee from './../card-detail/assignee/Assignee.vue';

    export default {
        name: 'Card',
        data: function() {
            return {
                show: false
            }
        },
        props: {
            card: Object,
            column: String
        },
        components: {
            Calendar,
            Assignee
        },
        computed: {
        },
        methods: {
            compleet() {
                this.card.ready = !this.card.ready;
                this.$store.commit('setCompleet', {
                    id: this.card.id,
                    ready: this.card.ready
                });
            },
            showCalendar() {
                this.show = !this.show;
            },
            removeCard() {
                this.$store.commit('removeCard', {
                    id: this.card.id
                });
            },
            select() {
                this.card.isArchive = this.column == 'archive' ? true : false;
                this.$store.commit('showDetail', this.card);
            },
            updateParam(newValue, param) {
                this.card[param] = newValue;
                this.$store.commit('updateCard', this.card);
            }
        },
        mounted() {
            
        },
        watch: {
            card: {
                deep: true,
                handler(newValue, oldValue) {
                }
            }
        }
    }
</script>
