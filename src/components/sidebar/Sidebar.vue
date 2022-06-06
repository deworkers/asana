<template>
    <transition name="slide">
        <div id="sidebar" class="sidebar" v-if="showSide">
            <div class="Sidebar sidebarRoot">
                <div class="SidebarHeader">
                    <a aria-label="На главную страницу Asana" class="SidebarHeader-Logo BaseLink" href="#">Asana</a>
                    <button class="SideBurgerIcon SidebarHeader-sideBurgerIcon" aria-label="Скрыть боковую панель" @click="toogleSide">
                        <svg class="SideBurgerIcon-image" viewBox="0 0 50 32">
                            <path d="M49,4H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,4,49,4z"></path>
                            <path d="M49,16H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,16,49,16z"></path>
                            <path d="M49,28H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,28,49,28z"></path>
                            <path
                                d="M8.1,22.8c-0.3,0-0.5-0.1-0.7-0.3L0.7,15l6.7-7.8c0.4-0.4,1-0.5,1.4-0.1c0.4,0.4,0.5,1,0.1,1.4L3.3,15l5.5,6.2   c0.4,0.4,0.3,1-0.1,1.4C8.6,22.7,8.4,22.8,8.1,22.8z">
                            </path>
                        </svg>
                    </button>
                </div>
                <div class="Sidebar-menu">
                    <a class="Sidebar-menu-one active" href="#">
                        <div class="Sidebar-menu-icon">
                            <i class="fa-solid fa-house"></i>
                        </div>
                        <div class="Sidebar-menu-name">Главная</div>
                    </a>
                    <a class="Sidebar-menu-one" href="#">
                        <div class="Sidebar-menu-icon">
                            <i class="fa-regular fa-circle-check"></i>
                        </div>
                        <div class="Sidebar-menu-name">Мои задачи</div>
                    </a>
                    <a class="Sidebar-menu-one" href="#">
                        <div class="Sidebar-menu-icon">
                            <i class="fa-regular fa-bell"></i>
                        </div>
                        <div class="Sidebar-menu-name">Входящие</div>
                    </a>
                    <a class="Sidebar-menu-one" href="#">
                        <div class="Sidebar-menu-icon">
                            <i class="fa-solid fa-house"></i>
                        </div>
                        <div class="Sidebar-menu-name">Отчёты</div>
                    </a>
                    <a class="Sidebar-menu-one" href="#">
                        <div class="Sidebar-menu-icon">
                            <i class="fa-solid fa-house"></i>
                        </div>
                        <div class="Sidebar-menu-name">Цели</div>
                    </a>
                </div>
                <div class="Sidebar-scroll-panel">
                    <SidebarMenu
                        :list="users"
                        :title="'Специалисты'"
                        :api="'/api/user/'"
                        :iconClass="''"
                    >
                    </SidebarMenu>
                    <SidebarMenu
                        :list="projects"
                        :title="'Проекты'"
                        :api="'/api/project/'"
                        :iconClass="'sidebar-list-icon--project'"
                    >
                    </SidebarMenu>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import draggable from "vuedraggable";
    import SidebarMenu from './sidebar-menu/Sidebar-menu.vue'

    export default {
        name: 'Sidebar',
        data: function() {
            return {
                
            }
        },
        components: {
            SidebarMenu
        },
        computed: {
            showSide() {
                return this.$store.state.showSide
            },
            projects() {
                return this.$store.state.projects;
            },
            users() {
                return this.$store.state.users;
            }
        },
        methods: {
            toogleSide() {
                this.$store.commit('toogleSide');
            }
        },
        mounted: function mounted() {
            
        }
    }
</script>
