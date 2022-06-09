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
                    v-if="activeProject"
                    :assignee="assignee"
                    :updateParam="updateParam">
                </Assignee>
                <Calendar 
                    :updateParam="updateParam"
                    :deadline="deadline">
                </Calendar>
                <div 
                    class="add-card-project"
                    v-if="!activeProject">
                    <Projects 
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
            activeUser() {
                return this.$store.state.activeUser;
            },
            activeProject() {
                return this.$store.state.activeProject;
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
                if (this.title.length > 0 && this.project != null) {
                    this.$store.commit('addCard', {
                        card: {
                            title: this.title,
                            column: this.listName,
                            project: this.project,
                            assignee: this.assignee,
                            deadline: this.deadline,
                            column: this.listName,
                            ready: false, 
                            description: ""
                        },
                    });
                    this.error = false;
                    this.title = '';
                    this.showCard = false;
                } else {
                    if (this.title.length == 0) {
                        this.errorMessge = 'Введите название задачи';
                    } else {
                        this.errorMessge = 'Выберите проект';
                    }
                    
                    this.error = true;
                }
            },
            updateParam(newValue, param) {
                this[param] = newValue;
                this.error = false;
            },
        },
        mounted() {
            this.project = this.activeProject;
        }
    }
</script>
