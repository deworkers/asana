<template>
    <div class="assignee">
        <div class="assignee-select" v-if="assignee !== null" @click="toggleList">
            <Avatar :user="assignee"></Avatar>
            <span>{{assignee.name}}</span>
        </div>
        <div class="assignee-clear" @click="clear" v-if="assignee !== null"></div>
        <div class="assignee-select--add" v-if="assignee == null" @click="toggleList">
            <div class="assignee-select--add--icon">
                <em class="uk-icon" uk-icon="user"></em>
            </div>
            <span>Без исполнителя</span>
        </div>
        <div class="assignee-list" v-if="show" v-click-outside="toggleList">
            <div class="assignee-one" @click="select(user)"  v-for="user in users">
                <Avatar :user="user"></Avatar>
                {{user.name}}
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
            assignee: Object,
            updateParam: Function
        },
        directives: {
            clickOutside: ClickOutside.directive
        },
        components: {
            Avatar
        },
        computed: {
            users() {
                return this.$store.state.users;
            }
        },
        methods: {
            toggleList() {
                this.show = !this.show;
            },
            select(user) {
                this.toggleList();
                this.updateParam(user, 'assignee');
            },
            clear() {
                this.updateParam(null, 'assignee');
            }
        },
        mounted() {
            
        }
    }
</script>
