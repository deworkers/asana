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
            <div class="board-col" v-if="activeBoardType == 'project' && archive.length > 0">
                <h3 class="board-col-title">Архив</h3>
                <div class="board-group">
                    <Card
                        v-for="(card, index) in archive"
                        :key="card.id"
                        :listName="'archive'"
                        :card="card"
                    ></Card>
                </div>
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
            },
            archive() {
                return this.$store.state.archive;
            },
            activeBoardType() {
                return this.$store.state.activeBoardType;
            }
        },
        methods: {
            getNewColumn(column) {
                let list;
                this.column.forEach((element, index) => {
                    if (element.listName == column) {
                        list = element.cards;
                    }
                });
                return list;
            },
            getNextIssue(list, index) {
                return list[index + 1] != undefined ? {id: list[index + 1].id} : null;
            },
            getPrevNextIssue(list, index) {
                return list[index - 1] != undefined ? {id: list[index - 1].id} : null;
            },
            log: function(evt, payload) {
                let list = this.getNewColumn(payload);
                console.log(evt);
                if ('added' in evt) {
                    let index = evt.added.newIndex;

                    this.$store.commit('moveCard', {
                        moveTo: payload,
                        cardId: evt.added.element.id,
                        prev_issue: this.getPrevNextIssue(list, index),
                        next_issue: this.getNextIssue(list, index)
                    });
                }

                if ('moved' in evt) {
                    let index = evt.moved.newIndex;
                    this.$store.commit('moveCard', {
                        moveTo: payload,
                        cardId: evt.moved.element.id,
                        prev_issue: this.getPrevNextIssue(list, index),
                        next_issue: this.getNextIssue(list, index)
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
