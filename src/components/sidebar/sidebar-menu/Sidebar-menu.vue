<template>
    <div class="sidebar-list">
        <div class="sidebar-list-title">{{title}}</div>
        <div class="sidebar-list-ul">
            <draggable class="sidebar-group" draggable=".sidebar-list-li" :list="list" group="group" @change="log($event)">
                <router-link 
                    :to="{ name: api, params: { id: item.id }}" 
                    class="sidebar-list-li"
                    @click.native="updateActiveBoard(item)"
                    v-for="(item, index) in list">
                    <div :class="['sidebar-list-icon', iconClass]"></div>
                    <div  class="sidebar-list-name">{{item.name}}</div>
                </router-link>
            </draggable>
        </div>
    </div>
  </template>
   
<script>
    import draggable from "vuedraggable";

    export default {
        name: 'Sidebar-menu',
        components: {
            draggable
        },
        props: {
            list: Array,
            title: String,
            api: String,
            iconClass: String
        },
        data() {
            return {

            }
        },
        methods: {
            log(event) {
               console.log(event); 
            },
            updateActiveBoard(object) {
                console.log('updateActiveBoard');
                this.$store.commit('updateActiveBoard', object);
            }
        },
    }
</script>