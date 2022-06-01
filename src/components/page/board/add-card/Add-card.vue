<template>
    <div class="board-add-card">
        <div class="board-card" v-if="showCard" v-click-outside="hide">
            <div class="card-body">
                <div class="card-title">
                    <input 
                        v-model="title"
                        type="text" 
                        placeholder="Напишите название задачи" 
                        class="card-title-input"
                        ref="input"/>
                </div>
                <div :class="['card-compleet']"></div>
            </div>
            <div class="card-bottom">
                <Calendar 
                    :updateDate="updateDate"
                    :dueDate="dueDate">
                </Calendar>
            </div>
        </div>
        <div class="card-add-button" @click="addCard" v-if="!showCard">
            <i class="fa-solid fa-plus"></i>Добавить задачу
        </div>
    </div>
    
</template>

<script>
    import ClickOutside from 'v-click-outside';
    import Calendar from './../card-detail/calendar/Calendar.vue';

    export default {
        name: 'Add-card',
        data: function() {
            return {
                showCard: false,
                title: '',
                dueDate: null
            }
        },
        props: {
            listName: String
        },
        directives: {
            clickOutside: ClickOutside.directive
        },
        components: {
            Calendar
        },
        computed: {
        },
        methods: {
            addCard() {
                this.showCard = true;
                this.$nextTick(() => {
                    this.$refs.input.focus();
                });
            },
            hide() {
                if (this.title.length > 0) {
                    let randomId = Math.floor(Math.random() * 100000);
                    this.$store.commit('addCard', {
                        card: {
                            id: randomId,
                            title: this.title,
                            column: this.listName,
                            project: {
                                id: 1,
                                name: "Госсталь"
                            },
                            created_by: {
                                id: 1,
                                name: "Fjodor Wolf",
                                login: "email@example.com",
                                avatar: {
                                    id: 1,
                                    url: "https://hostname/link/to/file.jpg?sign=hash"
                                }
                            },
                            assignee: null,
                            deadline: this.dueDate,
                            column: this.listName,
                            ready: false, 
                            description: ""
                        },
                    });
                }
                this.title = '';
                this.showCard = false;
            },
            updateDate(newDate) {
                this.dueDate = newDate;
            }
        },
        mounted() {
            
        }
    }
</script>
