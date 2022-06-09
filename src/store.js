import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import UIkit from 'uikit';

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        showSide: true,
        cards: [],
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
        projects: [],
        users: [],
        user: null,
        cardDetail: null,
        showDetail: false,
        isAuth: false,
        activeUser: null,
        activeProject: null
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
                    axios({
                        method: 'post',
                        url: BASE_URL + '/issue/' + card.id + '/' + payload.moveTo,
                        headers: {'X-Requested-With': 'XMLHttpRequest'},
                        withCredentials: true,
                    })
                    .then(function (response) {
                        console.log(response.data);
                    });
                    return true;
                }
            });
        },
        addCard: function(state, payload) {
            axios({
                method: 'post',
                url: BASE_URL + '/issue',
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                withCredentials: true,
                data: payload.card
            }).then((response) => {
                UIkit.notification("Задача создана", {pos: 'bottom-right'});
                state.cards.push(payload.card);
                store.commit('updateColumn');
            });
        },
        removeCard: function(state, payload) {
            state.cards.forEach((card, indexCard, list)=> {
                if (card.id == payload.id) {
                    list.splice(indexCard, 1);
                    axios({
                        method: 'DELETE',
                        url: BASE_URL + '/issue/' + card.id,
                        headers: {'X-Requested-With': 'XMLHttpRequest'},
                        withCredentials: true
                    })
                    .then(function (response) {
                        console.log(response.data);
                    });
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
                if (card.id === payload) {
                    axios({
                        method: 'patch',
                        url: BASE_URL + '/issue/' + card.id,
                        headers: {'X-Requested-With': 'XMLHttpRequest'},
                        withCredentials: true,
                        data: card
                    })
                    .then(function (response) {
                        console.log(response.data);
                    });
                }
            });
        },
        updateIsAuth:  function(state, payload) {
            state.isAuth = payload;
        },
        updateCards: function(state, payload) {
            state.cards = payload;
        },
        updateUsers: function(state, payload) {
            state.users = payload;
        },
        updateUser: function(state, payload) {
            state.user = payload;
        },
        updateProjects: function(state, payload) {
            state.projects = payload;
        },
        updateState: function(state, payload) {
            UIkit.notification("Состояние обновлено", {pos: 'bottom-right'})
            store.dispatch('getCards');
            store.dispatch('getUsers');
            store.dispatch('getUser');
            store.dispatch('getProjects');
        }
    },
    actions: {
        getCards: function(context, payload) { // получение списка карточек
            return new Promise(function(resolve) {
                axios({
                    method: 'get',
                    url: BASE_URL + '/project/1/issues',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                })
                .then(function (response) {
                    console.log(response.data.items);
                    store.commit('updateCards', response.data.items);
                    resolve();
                });
            });
        },
        getUsers: function(context, payload) { // получение списка пользователей
            return new Promise(function(resolve) {
                axios({
                    method: 'get',
                    url: BASE_URL + '/users',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                })
                .then(function (response) {
                    store.commit('updateUsers', response.data.items);
                    resolve();
                });
            });
        },
        getUser: function(context, payload) { // получение данных пользователя
            return new Promise(function(resolve) {
                axios({
                    method: 'get',
                    url: BASE_URL + '/user',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                })
                .then(function (response) {
                    store.commit('updateUser', response.data);
                    resolve();
                });
            });
        },
        getProjects: function(context, payload) { // получение списка проектов
            return new Promise(function(resolve) {
                axios({
                    method: 'get',
                    url: BASE_URL + '/projects',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                })
                .then(function (response) {
                    store.commit('updateProjects', response.data.items);
                    resolve();
                });
            });
        },
    }
});

export {store};