<template>
    <div class="card-detail-top">
        <div :class="['card-detail-top__compleet', ready ? 'active' : '']">
            <button @click="compleet">
                <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9.2,20c-0.5,0.5-1.3,0.5-1.9,0l-5.1-5.1c-0.4-0.5-0.4-1.3,0-1.9c0.4-0.5,1.3-0.5,1.9,0l4.1,4.1L19.7,5.7 c0.5-0.5,1.3-0.5,1.9,0s0.5,1.3,0,1.9L9.2,20z"></path></svg>
                Выполнено
            </button>
        </div>
        <div class="card-detail-top-right">
            <router-link 
                :to="{ name: 'projectCard', params: { id: id }}" 
                class="card-detail-top__link"
                >
                <svg class="card-detail-top__link-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M9,32c-2.3,0-4.6-0.9-6.4-2.6c-3.5-3.5-3.5-9.2,0-12.7l4-4c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-4,4c-2.7,2.7-2.7,7.2,0,9.9s7.2,2.7,9.9,0l4-4c2.7-2.7,2.7-7.2,0-9.9c-0.8-0.8-1.8-1.4-2.9-1.7c-0.5-0.2-0.8-0.7-0.7-1.3c0.2-0.5,0.7-0.8,1.3-0.7c1.4,0.4,2.7,1.2,3.7,2.2c3.5,3.5,3.5,9.2,0,12.7l-4,4C13.6,31.1,11.3,32,9,32z M16.6,21.6c-0.1,0-0.2,0-0.3,0c-1.4-0.4-2.7-1.2-3.7-2.2c-1.7-1.7-2.6-4-2.6-6.4s0.9-4.7,2.6-6.4l4-4c3.5-3.5,9.2-3.5,12.7,0s3.5,9.2,0,12.7l-4,4c-0.4,0.4-1,0.4-1.4,0s-0.4-1,0-1.4l4-4c2.7-2.7,2.7-7.2,0-9.9S20.7,1.3,18,4l-4,4c-1.3,1.4-2,3.1-2,5s0.7,3.6,2.1,5c0.8,0.8,1.8,1.4,2.9,1.7c0.5,0.2,0.8,0.7,0.7,1.3C17.5,21.4,17.1,21.6,16.6,21.6z"></path></svg>
            </router-link>
            <div class="card-detail-top__hide" @click="hide" v-if="!isCard">
                <svg class="card-detail-top__hide-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M2,14.5h18.4l-7.4-7.4c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l10,10c0.6,0.6,0.6,1.5,0,2.1l-10,10c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l7.4-7.4H2c-0.8,0-1.5-0.7-1.5-1.5C0.5,15.3,1.2,14.5,2,14.5z M28,3.5C28,2.7,28.7,2,29.5,2S31,2.7,31,3.5v25c0,0.8-0.7,1.5-1.5,1.5S28,29.3,28,28.5V3.5z"></path></svg>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Top',
        data: function() {
            return {
                //ready: false
            }
        },
        props: {
            hide: Function,
            ready: Boolean,
            updateParam: Function,
            id: {
                type: Number,
                default: null
            },
            isCard: {
                type: Boolean,
                default: false
            }
        },
        components: {

        },
        computed: {
        },
        methods: {
            compleet() {
                this.updateParam(!this.ready, 'ready');
                this.$store.commit('setCompleet', {
                    id: this.id,
                    ready: !this.ready
                });
            }
        },
        mounted() {
            
        }
    }
</script>
