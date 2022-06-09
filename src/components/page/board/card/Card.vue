<template>
    <div class="board-card item" @click.self="select">
        <div class="card-remove" @click="removeCard">
            <i class="fa-regular fa-trash-can"></i>
        </div>
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
            listName: String
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
            },
            showCalendar() {
                this.show = !this.show;
            },
            removeCard() {
                this.$store.commit('removeCard', {
                    listName: this.listName,
                    id: this.card.id
                });
            },
            select() {
                this.$store.commit('showDetail', this.card);
            },
            updateParam(newValue, param) {
                this.card[param] = newValue;
                this.$store.commit('updateCard', this.card.id);
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
