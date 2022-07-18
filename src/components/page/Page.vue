<template>
    <div class="page">
        <div class="topbar">
            <div class="topbar-left">
                <div class="burder-icon" role="button" tabindex="0" v-if="!showSide" @click="toogleSide">
                    <svg class="Icon ThinBurgerIcon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
                        <path d="M31,4H1C0.4,4,0,3.6,0,3s0.4-1,1-1h30c0.6,0,1,0.4,1,1S31.6,4,31,4z M31,16H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S31.6,16,31,16z M31,28H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S31.6,28,31,28z"></path>
                    </svg>
                </div>
                <div class="topbar-user" v-if="activeBoard != null">
                    <div v-if="activeBoard.avatar == null" class="topbar-user-name">{{initials(activeBoard.name)}}</div>
                    <img v-if="activeBoard.avatar != null" :src="activeBoard.avatar.url" alt="">
                </div>
                <div class="topbar-header" v-if="activeBoard != null">
                    <h1>{{activeBoard.name}}</h1>
                </div>
            </div>
            <div class="topbar-right">
                <div class="topbar-logout">
                    <a href="/logout"><span uk-icon="icon: sign-out"></span> Выйти</a>
                </div>
            </div>
        </div>
	 	<div class="page-alerts-block">
		 	<div class="uk-alert-danger" uk-alert v-if="!socketOpen">
		  		<a class="uk-alert-close" uk-close></a>
		  		<p>
				    WebSocket не подключен. Автоматическое обновление карточек недоступно <button @click="openWebSocket" class="uk-button uk-button-primary uk-button-small uk-margin-left">Подключиться</button>
				</p>
		 	</div>
		</div>

        <Board></Board>
    </div>
</template>

<script>
    import Board from './board/Board.vue';

    export default {
        name: 'Page',
        data: function() {
            return {
                
            }
        },
        components: {
            Board
        },
        computed: {
            showSide() {
                return this.$store.state.showSide;
            },
            activeBoard() {
                return this.$store.state.activeBoard;
            },
            socketOpen() {
                return this.$store.state.socketOpen;
            }
        },
        methods: {
            toogleSide() {
                this.$store.commit('toogleSide');
            },
            initials(str) {
                return str.split(/\s+/).map((item,i) => item[0].toUpperCase()).join('');
            },
	        openWebSocket() {
				this.$store.dispatch('openWebSocket');
	        }
        },
        mounted() {
            
        }
    }
</script>
