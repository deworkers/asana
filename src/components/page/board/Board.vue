<template>
    <div class="board">
        <div class="board-body">
            <div class="board-col" v-for="col in column">
                <h3 class="board-col-title">{{col.title}}</h3>
                <draggable class="board-group" draggable=".item" :list="col.cards" group="group" @change="log($event, col.listName)">
                    <Card
                        v-for="(card, index) in col.cards"
                        :key="card.id"
                        :listName="col.listName"
                        :card="card"
                    ></Card>
                    <AddCard 
                        slot="footer" 
                        key="footer"
                        :listName="col.listName">
                    </AddCard>
                </draggable>
            </div>
        </div>
        <CardDetail></CardDetail>
    </div>
</template>

<script>
    import draggable from "vuedraggable";
    import Card from "./card/Card.vue";
    import AddCard from "./add-card/Add-card.vue";
    import CardDetail from './card-detail/Card-detail.vue';

    export default {
        name: 'Board',
        data: function() {
            return {
                
            }
        },
        components: {
            draggable,
            Card,
            AddCard,
            CardDetail
        },
        computed: {
            cards() {
                return this.$store.state.cards;
            },
            column() {
                return this.$store.state.column;
            }
        },
        methods: {
            log: function(evt, payload) {
                if ('added' in evt) {
                    this.$store.commit('moveCard', {
                        moveTo: payload,
                        cardId: evt.added.element.id
                    });
                }
            }
        },
        mounted() {
            
        },
        watch: {
            cards: {
                immediate: true,
                deep: true,
                handler(newValue, oldValue) {
                    this.$store.commit('updateColumn');
                }
            }
        },
    }
</script>
