<template>
    <div class="board">
        <div class="board-body">
            <div class="board-col">
                <h3 class="board-col-title">На паузе</h3>
                <draggable class="board-group" :list="list1" group="group" @change="log">
                    <Card
                        v-for="(card, index) in list1"
                        :key="card.id"
                        :card="card"
                    ></Card>
                    <div class="board-add-card"><i class="fa-solid fa-plus"></i>Добавить задачу</div>
                </draggable>
            </div>
          
            <div class="board-col">
                <h3 class="board-col-title">В работе</h3>
                <draggable class="board-group" :list="list2" group="group" @change="log">
                    <Card
                        v-for="(card, index) in list2"
                        :key="card.id"
                        :card="card"
                    ></Card>
                    <div class="board-add-card"><i class="fa-solid fa-plus"></i>Добавить задачу</div>
                </draggable>
            </div>

            <div class="board-col">
                <h3 class="board-col-title">Выполнено</h3>
                <draggable class="board-group" :list="list3" group="group" @change="log">
                    <Card
                        v-for="(card, index) in list3"
                        :key="card.id"
                        :card="card"
                    ></Card>
                    <div class="board-add-card"><i class="fa-solid fa-plus"></i>Добавить задачу</div>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from "vuedraggable";
    import Card from "./card/Card.vue";

    export default {
        name: 'Board',
        data: function() {
            return {
                list1: [
                    {
                        id: '1',
                        title: 'Простая задача',
                        description: '<p>Тут будет описание в виде html кода</p>',
                        compleet: true,
                        dueDate: null,
                        performer: {
                            id: '',
                            name: 'Беляев Евгений',
                            avatar: {
                                letters: 'eb',
                                background: '#8d84e8'
                            }
                        }
                    },
                    {
                        id: '2',
                        title: 'Пример задачи с очень длинным названием. Настолько длинным что пока я это писал я устал и лег спать. Но она все равно влазит в карточку. Оказывается карточка безразмерная =)',
                        description: '<p>Тут будет описание в виде html кода</p>',
                        compleet: false,
                        dueDate: '28 мая',
                        performer: {
                            id: '',
                            name: 'Беляев Евгений',
                            avatar: {
                                letters: 'eb',
                                background: '#8d84e8'
                            }
                        }
                    }
                ],
                list2: [
                    
                ],
                list3: [
                    
                ],
            }
        },
        components: {
            draggable,
            Card
        },
        computed: {
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
