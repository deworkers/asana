<template>
    <div class="card-timer">
        <div class="uk-alert uk-alert-danger" v-if="timingTask && timingTask.id != id && timingStart">Вы работаете над другой задачей</div>
        <div class="uk-alert uk-alert-primary" v-if="timingTask && timingTask.id == id && timingStart">Вы работаете над этой задачей</div>
        <button v-if="!timingStart" @click="start" class="uk-button uk-button-primary uk-button-small"><span class="uk-icon uk-margin-small-right" uk-icon="clock"></span>Таймер задачи</button>
    </div>
</template>

<script>
    export default {
        name: "Timer",
        data() {
            return {
                started: false,
            };
        },
        props: {
            id: Number,
            title: String
        },
        computed: {
            timingTask() {
                return this.$store.state.timingTask
            },
            timingStart() {
                return this.$store.state.timingStart
            },
        },
        methods: {
            start() {
                this.$store.commit('updateTimingTask', {
                    id: this.id,
                    title: this.title
                });
            }
        }
    };
</script>