<template>
    <div class="board-add-card">
        <div :class="['board-card' , error ? 'error' : '']" v-if="showCard" v-click-outside="hide">
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
                <Assignee
                    :activeUser="activeBoardType == 'user' ? activeBoard : null"
                    :addCard="true"
                    :assignee="assignee"
                    :updateParam="updateParam">
                </Assignee>
                <Calendar
                    :updateParam="updateParam"
                    :deadline="deadline">
                </Calendar>
                <div class="add-card-project">
                    <Projects
                        :addCard="true"
                        :activeProject="activeBoardType == 'project' ? activeBoard : null"
                        :project="project"
                        :updateParam="updateParam">
                    </Projects>
                </div>
            </div>
        </div>
        <div class="board-card-error" v-if="error">{{errorMessge}}</div>
        <div class="card-add-button" @click="addCard" v-if="!showCard">
            <span class="uk-icon" uk-icon="plus"></span>Добавить задачу
        </div>
    </div>
    
</template>

<script>
    import ClickOutside from 'v-click-outside';
    import UIkit from 'uikit';

    import Calendar from './../card-detail/calendar/Calendar.vue';
    import Assignee from './../card-detail/assignee/Assignee.vue';
    import Projects from './../card-detail/projects/Projects.vue';

    export default {
        name: 'Add-card',
        data: function() {
            return {
                showCard: false,
                title: '',
                deadline: null,
                assignee: null,
                project: null, 
                error: false,
                errorMessge: ''
            }
        },
        props: {
            listName: String
        },
        directives: {
            clickOutside: ClickOutside.directive
        },
        components: {
            Calendar,
            Assignee,
            Projects
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            activeBoard() {
                return this.$store.state.activeBoard;
            },
            activeBoardType() {
                return this.$store.state.activeBoardType;
            }
        },
        methods: {
            addCard() {
                this.showCard = true;
                this.$nextTick(() => {
                    this.$refs.input.focus();
                });
            },
            hide() {
                if ( this.title.length > 0 && this.project != null ) {
                    this.$store.commit('addCard', {
                        card: {
                            title: this.title,
                            column: this.column,
                            project: this.project,
                            assignee: this.assignee,
                            deadline: this.deadline,
                            ready: false, 
                            description: ""
                        },
                    });

                    this.clear();
                } else {
                    if (this.title.length == 0) {
                        UIkit.notification("Пустое название задачи", {pos: 'bottom-right', status:'warning'})
                    }

                    if (this.project == null) {
                        UIkit.notification("Не выбран проект", {pos: 'bottom-right', status:'warning'})
                    }

                    this.clear();
                }
            },
            updateParam(newValue, param) {
                this[param] = newValue;
                this.error = false;
            },
            clear() {
                this.title = '';
                this.showCard = false;
                this.project =null;
            }
        },
        mounted() {
            this.project = this.activeProject;
        }
    }
</script>
