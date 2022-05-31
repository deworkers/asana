import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        showSide: true,
        board: [
            {
                id: 0,
                listName:'pause',
                title: 'На паузе',
                list: [
                    {
                        id: '1',
                        title: 'Простая задача',
                        description: '',
                        compleet: true,
                        dueDate: null,
                        performer: {
                            id: '',
                            name: 'Беляев Евгений',
                            avatar: {
                                letters: 'eb',
                                background: '#8d84e8'
                            }
                        },
                        messages: [{
                            id: 0,
                            period: '2 дня назад',
                            text: '<a class="MiniStory-actor BaseLink" href="#">evgenii belyaev</a> <span class="MiniStoryActionSentence-content">переместил(а) эту задачу из столбца «В работе» в столбец «Обсуждение/Пауза» проекта «⚠️ Евгений Беляев».</span>',
                            autor: {
                                id: '',
                                name: 'Беляев Евгений',
                                avatar: {
                                    letters: 'eb',
                                    background: '#8d84e8'
                                }
                            }
                        }]
                    },
                    {
                        id: '2',
                        title: 'Пример задачи с очень длинным названием. Настолько длинным что пока я это писал я устал и лег спать. Но она все равно влазит в карточку. Оказывается карточка безразмерная =)',
                        description: '<p>Тут будет описание в виде html кода</p>',
                        compleet: false,
                        dueDate: '2022-05-31 14:30',
                        performer: {
                            id: '',
                            name: 'Беляев Евгений',
                            avatar: {
                                letters: 'eb',
                                background: '#8d84e8'
                            }
                        },
                        messages: null
                    }
                ]
            },
            {
                id: 1,
                listName:'inprogerss',
                title: 'В работе',
                list: []
            },
            {
                id: 2,
                listName:'done',
                title: 'Выполнено',
                list: []
            }
        ],
        projects: [
            {
                "id": 1,
                "name": "Госсталь"
            },
            {
                "id": 2,
                "name": "Асана"
            },
            {
                "id": 3,
                "name": "Газпромнефть"
            },
           
        ],
        users: [
            {
                "id": 1,
                "name": "Fjodor Wolf",
                "login": "email@example.com",
                "avatar": {
                    "id": 1, // IDшник файла
                    "url": "https://hostname/link/to/file.jpg?sign=hash"
                }
            }
        ],
        cardDetail: null,
        showDetail: false
    },
    mutations: {
        toogleSide: function(state, payload) {
            state.showSide = !state.showSide;
        },
        showDetail: function(state, payload) {
            state.cardDetail = payload;
            state.showDetail = true;
        },
        hideDetail: function(state, payload) {
            state.showDetail = false;
        },
        addCard: function(state, payload) {
            state.board.find((col, indexCol)=> {
                if (col.listName === payload.listName) {
                    state.board[indexCol].list.push(payload.card);
                    return true;
                }
            });
        },
        removeCard: function(state, payload) {
            state.board.find((col, indexCol)=> {
                if (col.listName === payload.listName) {
                    col.list.forEach((card, indexCard, list)=> {
                        if (card.id == payload.id) {
                            list.splice(indexCard, 1);
                        }
                    });
                }
            });
        }
    },
    actions: {
        
    }
});

export {store};