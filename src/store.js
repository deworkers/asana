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
        cardDetail: null,
        showDetail: false
    },
    mutations: {
        toogleSide: function(state, payload) {
            state.showSide = !state.showSide;
        },
        showDetail: function(state, payload) {
            state.cardDetail =payload;
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