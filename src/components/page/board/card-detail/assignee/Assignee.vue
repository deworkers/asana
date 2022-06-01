<template>
    <div class="assignee">
        <div class="assignee-select" v-if="assignee !== null" @click="toggleList">
            <Avatar :user="assignee"></Avatar>
            <span>{{assignee.name}}</span>
        </div>
        <div class="assignee-select--add" v-if="assignee == null" @click="toggleList">
            <div class="assignee-select--add--icon">
                <svg class="icon" focusable="false" viewBox="0 0 24 24">
                    <path d="M14,14c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S16.2,14,14,14z M14,7c-1.6,0-3,1.4-3,3s1.4,3,3,3s3-1.4,3-3S15.6,7,14,7z M20.5,21c-0.3,0-0.5-0.2-0.5-0.5v-2.1c0-1.3-1.1-2.4-2.4-2.4h-7.2C9.1,16,8,17.1,8,18.4v2.1C8,20.8,7.8,21,7.5,21S7,20.8,7,20.5 v-2.1c0-1.9,1.5-3.4,3.4-3.4h7.2c1.9,0,3.4,1.5,3.4,3.4v2.1C21,20.8,20.8,21,20.5,21z" class="DashedIcon-inner"></path>
                </svg>
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
                console.log('toggleList');
                this.show = !this.show;
            },
            select(user) {
                this.toggleList();
                this.updateParam(user, 'assignee');
            }
        },
        mounted() {
            
        }
    }
</script>
