<template>
    <div class="page">
        <div class="topbar">
            <div class="burder-icon" role="button" tabindex="0" v-if="!showSide" @click="toogleSide">
                <svg class="Icon ThinBurgerIcon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
                    <path d="M31,4H1C0.4,4,0,3.6,0,3s0.4-1,1-1h30c0.6,0,1,0.4,1,1S31.6,4,31,4z M31,16H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S31.6,16,31,16z M31,28H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S31.6,28,31,28z"></path>
                </svg>
            </div>
            <div class="topbar-user" v-if="activeBoard != null">
                <div class="topbar-user-name">eb</div>
            </div>
            <div class="topbar-header" v-if="activeBoard != null">
                <h1>{{activeBoard.name}}</h1>
            </div>
        </div>
        <Board></Board>
    </div>
</template>

<script>
    import Board from './board/Board.vue';
    import Avatar from '@/avatar/Avatar.vue';

    export default {
        name: 'Page',
        data: function() {
            return {
                
            }
        },
        components: {
            Board,
            Avatar
        },
        computed: {
            showSide() {
                return this.$store.state.showSide
            },
            activeBoard() {
                return this.$store.state.activeBoard
            }
        },
        methods: {
            toogleSide() {
                this.$store.commit('toogleSide');
            }
        },
        mounted() {
            
        }
    }
</script>
