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
        activeBoard: null,
        journal: null
    },
    mutations: {
        toogleSide: function(state, payload) {
            state.showSide = !state.showSide;
        },
        showDetail: function(state, payload) {
            state.cardDetail = payload;
            state.showDetail = true;
            store.dispatch('getJournal', payload.id);
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
                payload.card.id = response.data.data.id;
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
            axios({
                method: 'patch',
                url: BASE_URL + '/issue/' + payload.id,
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                withCredentials: true,
                data: payload
            })
            .then(function (response) {
                console.log(response.data);
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
        updateActiveBoard: function(state, payload) {
            state.activeBoard = payload;
        },
        updateProjects: function(state, payload) {
            state.projects = payload;
        },
        updateState: function(state, payload) {
            UIkit.notification("Состояние обновлено", {pos: 'bottom-right'})
            store.dispatch('getUsers');
            store.dispatch('getUser');
            store.dispatch('getProjects');
        },
        updateJournal: function(state, payload) {
            state.journal = payload;
        },
    },
    actions: {
        getCards: function(context, payload) { // получение списка карточек
            let getUrl = (url) => {
                return url.slice(0, url.length - 7);
            }
            return new Promise(function(resolve) {
                axios({
                    method: 'get',
                    url: BASE_URL + payload,
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                })
                .then(function (response) {
                    store.commit('updateCards', response.data.items);
                    store.dispatch('getActiveBoard', getUrl(payload));
                    resolve();
                }).catch(function (error) {
                    store.commit('updateCards', []);
                    store.dispatch('getActiveBoard', getUrl(payload));
                    resolve();
                });
            });
        },
        getActiveBoard: function(context, payload) { // получение данных пользователя
            return new Promise(function(resolve) {
                axios({
                    method: 'get',
                    url: BASE_URL + payload,
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                })
                .then(function (response) {
                    store.commit('updateActiveBoard', response.data);
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
                }).catch(function (error) {
                    store.commit('updateUsers', []);
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
                }).catch(function (error) {
                    store.commit('updateProjects', []);
                    resolve();
                });
            });
        },
        getJournal: function(context, payload) {
            return new Promise(function(resolve) {
                axios({
                    method: 'get',
                    url: BASE_URL + '/issue/' + payload + '/journal',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                })
                .then(function (response) {
                    store.commit('updateJournal', response.data.items);
                    resolve();
                }).catch(function (error) {
                    store.commit('updateJournal', []);
                    resolve();
                });
            });
        }
    }
});

export {store};