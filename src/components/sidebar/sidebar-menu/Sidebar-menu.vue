<template>
    <div class="sidebar-list">
        <div class="sidebar-list-title">{{title}}</div>
        <div class="sidebar-list-ul">
            <draggable class="sidebar-group" draggable=".sidebar-list-li" :list="list" group="group" @change="log($event)">
                <a :href="api + item.id + '/issues'" class="sidebar-list-li" v-for="(item, index) in list">
                    <div :class="['sidebar-list-icon', iconClass]"></div>
                    <div class="sidebar-list-name">{{item.name}}</div>
                </a>
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
            }
        },
    }
</script>