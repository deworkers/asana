<template>
    <div class="assignee">
        <div class="assignee-select" v-if="project !== null" @click="toggleList">
            <div class="sidebar-list-icon sidebar-list-icon--project"></div>
            <span>{{project.name}}</span>
        </div>
        <div class="assignee-clear" @click="clear" v-if="project !== null"></div>
        <div class="project-select--add" v-if="project == null" @click="toggleList">
            <span>Добавить в проект</span>
        </div>
        <div class="assignee-list" v-if="show" v-click-outside="toggleList">
            <div class="assignee-one" @click="select(project)"  v-for="project in projects">
                {{project.name}}
            </div>
        </div>
    </div>
</template>

<script>
    import ClickOutside from 'v-click-outside';
    import Avatar from '@/avatar/Avatar.vue';

    export default {
        name: 'Assignee',
        data: function() {
            return {
                show: false
            }
        },
        props: {
            project: Object,
            updateParam: Function
        },
        directives: {
            clickOutside: ClickOutside.directive
        },
        computed: {
            projects() {
                return this.$store.state.projects;
            }
        },
        methods: {
            toggleList() {
                this.show = !this.show;
            },
            select(project) {
                this.toggleList();
                this.updateParam(project, 'project');
            },
            clear() {
                this.updateParam(null, 'project');
            }
        },
        mounted() {
            
        }
    }
</script>
