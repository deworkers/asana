import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import UIkit from 'uikit';
import moment from 'moment';

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        showSide: true,
        cards: [],
        archive: [],
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
        activeBoardType: null,
        journal: null,
        timeSpent: null
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
                        data: {
                            "prev_issue": payload.prev_issue,
                            "next_issue": payload.next_issue
                        }
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
            axios({
                method: 'post',
                url: BASE_URL + '/issue/' + payload.id + '/comment',
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                withCredentials: true,
                data: {
                    text: payload.text
                }
            }).then((response) => {
                store.dispatch('getJournal', payload.id);
            });
        },
        updateCard: function(state, payload) {
            let card = {};
            Object.assign(card, payload);
            card.deadline = card.deadline ? moment(payload.deadline).format() : null;
            axios({
                method: 'patch',
                url: BASE_URL + '/issue/' + payload.id,
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                withCredentials: true,
                data: card
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
        updateArchive: function(state, payload) {
            state.archive = payload;
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
        updateActiveBoardType: function(state, payload) {
            state.activeBoardType = payload;
        },
        updateProjects: function(state, payload) {
            state.projects = payload;
        },
        updateState: function(state, payload) {
            UIkit.notification("Состояние обновлено", {pos: 'bottom-right'})
            store.dispatch('getUser');
            store.dispatch('getUsers');
            store.dispatch('getProjects');
        },
        updateJournal: function(state, payload) {
            state.journal = payload;
        },
        updateTimeSpent: function(state, payload) {
            state.timeSpent = payload;
        },
        setCompleet: function(state, payload) {
            let action = payload.ready ? 'mark_ready' : 'unmark_ready';
            axios({
                method: 'post',
                url: BASE_URL + '/issue/' + payload.id + '/' + action,
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                withCredentials: true
            }).then((response) => {
                store.dispatch('getJournal', payload.id);
                UIkit.notification("Состояние обновлено", {pos: 'bottom-right'})
            });
        }
    },
    actions: {
        getCards: function(context, payload) { // получение списка карточек
            let getUrl = (url) => {
                return url.slice(0, url.length - 7);
            }

            if (payload.indexOf('project') >= 0) {
                store.commit('updateActiveBoardType', 'project');
            } else {
                store.commit('updateActiveBoardType', 'user');
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
        getArchive: function(context, payload) { // получение архива
            return new Promise(function(resolve) {
                if (store.state.activeBoardType == 'project') {
                    axios({
                        method: 'get',
                        url: BASE_URL + '/project/' + payload + '/archive',
                        headers: {'X-Requested-With': 'XMLHttpRequest'},
                        withCredentials: true
                    })
                    .then(function (response) {
                        store.commit('updateArchive', response.data.items);
                        resolve();
                    }).catch(function (error) {
                        store.commit('updateArchive', []);
                        resolve();
                    });
                } else {
                    store.commit('updateArchive', []);
                }
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
                    store.dispatch('getArchive', response.data.id);
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
        getDelails: function(context, payload) {
            return new Promise(function(resolve) {
                axios({
                    method: 'get',
                    url: BASE_URL + '/issue/' + payload,
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                })
                .then(function (response) {
                    store.state.cardDetail = response.data;
                    store.dispatch('getJournal', payload);
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
        },
        getTimeSpent: function(context, payload) {
            return new Promise(function(resolve) {
                axios({
                    method: 'get',
                    url: BASE_URL + '/issue/' + payload + '/time-spent',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                })
                .then(function (response) {
                    store.commit('updateTimeSpent', response.data.items);
                    resolve();
                }).catch(function (error) {
                    store.commit('updateTimeSpent', []);
                    resolve();
                });
            });
        },
    }
});

export {store};