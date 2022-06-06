import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        showSide: true,
        cards: [
            {
                "id": 100,
                "title": "Заголовок задачи",
                "project": {
                  "id": 1,
                  "name": "Госсталь"
                },
                "created_by": {
                    "id": 1,
                    "name": "Fjodor Wolf",
                    "login": "email@example.com",
                    "avatar": {
                        "id": 1,
                        "url": "https://hostname/link/to/file.jpg?sign=hash"
                    }
                },
                "assignee": {
                    "id": 1,
                    "name": "Fjodor Wolf",
                    "login": "email@example.com",
                    "avatar": {
                        "id": 1,
                        "url": "https://s3.amazonaws.com/profile_photos/1200085450420248.1200085487319217.FQ8CAPul7KOdVKnFlrVR_27x27.png"
                    }
                },
                "deadline": "2022-05-30T10:20:30+05:00",
                "column": "wait", // wait - на паузе, in_progress - в работе, done - выполнено
                "ready": false, // флажок готовности задачи
                "description": "Описание задачи",
                "journal": {
                    "items": [
                        {
                            "id": 10,
                            "type": "create_issue",
                            "logged_by": {
                                "id": 1,
                                "name": "Fjodor Wolf",
                                "login": "email@example.com",
                                "avatar": {
                                    "id": 1,
                                    "url": "https://s3.amazonaws.com/profile_photos/1200085450420248.1200085487319217.FQ8CAPul7KOdVKnFlrVR_27x27.png"
                                }
                            },
                            "timestamp": "2022-05-31T10:20:30+05:00",
                            "data": null
                            // здесь нужно писать - <Пользователь> создал задачу <дата и время>, подставляя в <Пользователь> - чувака из logged_by, дата и время - timestamp
                        },
                        {
                            "id": 11,
                            "type": "mark_ready",
                            "logged_by": {
                                "id": 1,
                                "name": "Fjodor Wolf",
                                "login": "email@example.com",
                                "avatar": {
                                    "id": 1,
                                    "url": "https://s3.amazonaws.com/profile_photos/1200085450420248.1200085487319217.FQ8CAPul7KOdVKnFlrVR_27x27.png"
                                }
                            },
                            "timestamp": "2022-05-31T10:20:30+05:00",
                            "data": null
                            // здесь нужно писать - <Пользователь> отметил задачу “выполнена” <дата и время>
                        },
                        {
                            "id": 14,
                            "type": "comment",
                            "logged_by": {
                                "id": 1,
                                "name": "Fjodor Wolf",
                                "login": "email@example.com",
                                "avatar": {
                                    "id": 1,
                                    "url": "https://s3.amazonaws.com/profile_photos/1200085450420248.1200085487319217.FQ8CAPul7KOdVKnFlrVR_27x27.png"
                                }
                            },
                            "timestamp": "2022-05-31T10:20:30+05:00",
                            "data": {
                                "text": "Текст комментария",
                                "attachments": [ // список прикрепленных к комментарию файлов
                                    {
                                        "id": 1,
                                        "name": "file",
                                        "extension": "jpg",
                                        "size": 100500,
                                        "url": "https://hostname/link/to/file.jpg?sign=hash",
                                        "uploaded_by": {
                                            "id": 1,
                                            "name": "Fjodor Wolf",
                                            "login": "email@example.com",
                                            "avatar": {
                                                "id": 1,
                                                "url": "https://s3.amazonaws.com/profile_photos/1200085450420248.1200085487319217.FQ8CAPul7KOdVKnFlrVR_27x27.png"
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "id": 12,
                            "type": "unmark_ready",
                            "logged_by": {
                                "id": 1,
                                "name": "Fjodor Wolf",
                                "login": "email@example.com",
                                "avatar": {
                                    "id": 1,
                                    "url": "https://s3.amazonaws.com/profile_photos/1200085450420248.1200085487319217.FQ8CAPul7KOdVKnFlrVR_27x27.png"
                                }
                            },
                            "timestamp": "2022-05-31T10:20:30+05:00",
                            "data": null
                            // здесь нужно писать - <Пользователь> отметил что задача не завершена <дата и время>
                        },
                        {
                            "id": 13,
                            "type": "change_column",
                            "logged_by": {
                                "id": 1,
                                "name": "Fjodor Wolf",
                                "login": "email@example.com",
                                "avatar": {
                                    "id": 1,
                                    "url": "https://s3.amazonaws.com/profile_photos/1200085450420248.1200085487319217.FQ8CAPul7KOdVKnFlrVR_27x27.png"
                                }
                            },
                            "timestamp": "2022-06-03T10:20:30+05:00",
                            "data": {
                                "from": "in_progress",
                                "to": "wait"
                            }
                            // здесь нужно писать - <Пользователь> переместил задачу из колонки <> в колонку <> <дата и время>, колонки надо подставлять из "data"
                        },
                        {
                            "id": 14,
                            "type": "comment",
                            "logged_by": {
                                "id": 1,
                                "name": "Fjodor Wolf",
                                "login": "email@example.com",
                                "avatar": {
                                    "id": 1,
                                    "url": "https://s3.amazonaws.com/profile_photos/1200085450420248.1200085487319217.FQ8CAPul7KOdVKnFlrVR_27x27.png"
                                }
                            },
                            "timestamp": "2022-05-31T10:20:30+05:00",
                            "data": {
                                "text": "Текст комментария",
                                "attachments": [ // список прикрепленных к комментарию файлов
                                    {
                                        "id": 1,
                                        "name": "file",
                                        "extension": "jpg",
                                        "size": 100500,
                                        "url": "https://hostname/link/to/file.jpg?sign=hash",
                                        "uploaded_by": {
                                            "id": 1,
                                            "name": "Fjodor Wolf",
                                            "login": "email@example.com",
                                            "avatar": {
                                                "id": 1,
                                                "url": "https://s3.amazonaws.com/profile_photos/1200085450420248.1200085487319217.FQ8CAPul7KOdVKnFlrVR_27x27.png"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
               
        ],
        column: [
            {
                listName:'wait',
                title: 'На паузе',
                cards: []
            },
            {
                listName:'in_progress',
                title: 'В работе',
                cards: []
            },
            {
                listName:'done',
                title: 'Выполнено',
                cards: []
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
            }
           
        ],
        users: [
            {
                "id": 1,
                "name": "Fjodor Wolf",
                "login": "email@example.com",
                "avatar": {
                    "id": 1, // IDшник файла
                    "url": "https://s3.amazonaws.com/profile_photos/1200085450420248.1200085487319217.FQ8CAPul7KOdVKnFlrVR_27x27.png"
                }
            },
            {
                "id": 2,
                "name": "Evgeniy Belyaev",
                "login": "email@example.com",
                "avatar": null
            },
            {
                "id": 3,
                "name": "Mary Sue",
                "login": "email@example.com",
                "avatar": null
            }
        ],
        maker: {
            "id": 2,
            "name": "Evgeniy Belyaev",
            "login": "email@example.com",
            "avatar": null
        },
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
        updateColumn: function(state, payload) {
            state.column.forEach((col, index, columnList)=> {
                col.cards = [];
                state.cards.forEach((card, indexCard, cards)=> {
                    if (card.column == col.listName) {
                        col.cards.push(card);
                    }
                });
            });
        },
        moveCard: function(state, payload) {
            state.cards.find((card, index) => {
                if (card.id === payload.cardId) {
                    state.cards[index]['column'] = payload.moveTo;
                    return true;
                }
            });
        },
        addCard: function(state, payload) {
            state.cards.push(payload.card);
            store.commit('updateColumn');
        },
        removeCard: function(state, payload) {
            state.cards.forEach((card, indexCard, list)=> {
                if (card.id == payload.id) {
                    list.splice(indexCard, 1);
                }
            });
        },
        addComment: function(state, payload) {
            state.cards.find((card, index) => {
                if (card.id === payload.id) {
                    card.journal.items.push(payload.comment);
                    state.cardDetail = card;
                }
            });
        },
        updateCard: function(state, payload) {
            state.cards.find((card, index) => {
                if (card.id === payload.id) {
                    state.cardDetail = card;
                }
            });
        }
    },
    actions: {
        
    }
});

export {store};