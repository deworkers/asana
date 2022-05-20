<template>
    <div class="board-card">
        <div class="card-body">
            <div class="card-title">{{card.title}}</div>
            <div 
                :class="['card-compleet', card.compleet ? 'compleet': compleet]"
                @click="compleet">
            </div>
        </div>
        <div class="card-bottom">
            <div class="cart-dueDate" v-if="card.dueDate != null">{{card.dueDate}}</div>
            <div class="cart-dueDate cart-dueDate--add" v-if="card.dueDate == null"><i class="fa-regular fa-calendar"></i></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Page',
        data: function() {
            return {
                
            }
        },
        props: {
            card: Object
        },
        components: {

        },
        computed: {
        },
        methods: {
            compleet() {
                this.card.compleet = !this.card.compleet;
            }
        },
        mounted() {
            
        }
    }
</script>
