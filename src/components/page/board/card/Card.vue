<template>
    <div class="board-card item" @click.self="select">
        <div class="card-remove" @click="removeCard">
            <i class="fa-regular fa-trash-can"></i>
        </div>
        <div class="card-body" @click="select">
            <div class="card-title">{{card.title}}</div>
            <div 
                :class="['card-compleet', card.compleet ? 'compleet': compleet]"
                @click="compleet">
            </div>
        </div>
        <div class="card-bottom" @click.self="select">
            <Calendar 
                :updateDate="updateDate"
                :dueDate="card.dueDate">
            </Calendar>
        </div>
    </div>
</template>

<script>
    import Calendar from './../card-detail/calendar/Calendar.vue';

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
            Calendar
        },
        computed: {
        },
        methods: {
            compleet() {
                this.card.compleet = !this.card.compleet;
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
            updateDate(newDate) {
                this.card.dueDate = newDate;
            }
        },
        mounted() {
            
        }
    }
</script>
