<template>
    <div class="board">
        <div class="board-body">
            <div class="board-col" v-for="col in board">
                <h3 class="board-col-title">{{col.title}}</h3>
                <draggable class="board-group" draggable=".item" :list="col.list" group="group" @change="log">
                    <Card
                        v-for="(card, index) in col.list"
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
    </div>
</template>

<script>
    import draggable from "vuedraggable";
    import Card from "./card/Card.vue";
    import AddCard from "./add-card/Add-card.vue";

    export default {
        name: 'Board',
        data: function() {
            return {
                
            }
        },
        components: {
            draggable,
            Card,
            AddCard
        },
        computed: {
            board() {
                return this.$store.state.board;
            }
        },
        methods: {
            log: function(evt) {
                window.console.log(evt);
            }
        },
        mounted() {
            
        }
    }
</script>
