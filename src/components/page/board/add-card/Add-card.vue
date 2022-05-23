<template>
    <div class="board-add-card">
        <div class="board-card" v-if="showCard" v-click-outside="hide">
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
                <div class="cart-dueDate cart-dueDate--add">
                    <i class="fa-regular fa-calendar"></i>
                </div>
            </div>
        </div>
        <div class="card-add-button" @click="addCard" v-if="!showCard">
            <i class="fa-solid fa-plus"></i>Добавить задачу
        </div>
    </div>
    
</template>

<script>
    import ClickOutside from 'v-click-outside';
    
    export default {
        name: 'Add-card',
        data: function() {
            return {
                showCard: false,
                title: ''
            }
        },
        props: {
            listName: String
        },
        directives: {
            clickOutside: ClickOutside.directive
        },
        components: {

        },
        computed: {
        },
        methods: {
            addCard() {
                this.showCard = true;
                this.$nextTick(() => {
                    this.$refs.input.focus();
                });
            },
            hide() {
                if (this.title.length > 0) {
                    let randomId = Math.floor(Math.random() * 100000);
                    this.$store.commit('addCard', {
                        listName: this.listName,
                        card: {
                            id: randomId,
                            title: this.title,
                            compleet: false,
                            dueDate: null,
                            performer: {
                                id: '',
                                name: 'Беляев Евгений',
                                avatar: {
                                    letters: 'eb',
                                    background: '#8d84e8'
                                }
                            }
                        },
                    });
                }
                this.title = '';
                this.showCard = false;
            }
        },
        mounted() {
            
        }
    }
</script>
