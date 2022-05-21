<template>
    <div class="board-card item">
        <div class="card-remove" @click="removeCard">
            <i class="fa-regular fa-trash-can"></i>
        </div>
        <div class="card-body">
            <div class="card-title">{{card.title}}</div>
            <div 
                :class="['card-compleet', card.compleet ? 'compleet': compleet]"
                @click="compleet">
            </div>
        </div>
        <div class="card-bottom">
            <div class="cart-dueDate" v-if="card.dueDate != null">{{card.dueDate}}</div>
            <div class="cart-dueDate cart-dueDate--add" v-if="card.dueDate == null"@click="showCalendar"><i class="fa-regular fa-calendar"></i></div>
        </div>
    </div>
</template>

<script>
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
            }
        },
        mounted() {
            
        }
    }
</script>
