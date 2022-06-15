<template>
    <div>
        <button v-if="!started" @click="start" class="uk-button uk-button-primary uk-button-small"><span class="uk-icon uk-margin-small-right" uk-icon="future"></span>Старт выполнения</button>
        <button v-if="started" @click="stop" class="uk-button uk-button-danger uk-button-small"><span class="uk-icon uk-margin-small-right" uk-icon="ban"></span>Остановить выполнение</button>
        <span v-if="started">{{formattedElapsedTime}}</span>
    </div>
</template>

<script>
    import moment from 'moment';
    import axios from 'axios';

    export default {
        name: "Timer",
        props: {
            id: Number
        },
        data() {
            return {
                time: 0,
                timer: null,
                startTime: null,
                stopTime: null,
                timer: undefined,
                started: false,
                checkpoint: []
            };
        },
        computed: {
            formattedElapsedTime() {
                return moment.utc(this.time*1000).format('HH:mm:ss');
            }
        },
        methods: {
            start() {
                this.started = true;
                this.startTime =  moment(new Date()).toISOString(true);
                this.timer = setInterval(() => {
                    this.time++;
                }, 1000);
            },
            stop() {
                this.started = false;
                this.stopTime = moment(new Date()).toISOString(true);
                this.time = 0;
                this.sendTimeSpend();
                clearInterval(this.timer);
            },
            sendTimeSpend() {
                axios({
                    method: 'post',
                    url: BASE_URL + '/issue/' + this.id + '/time-spent',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true,
                    data: {
                        "started_at": this.startTime,
                        "ended_at": this.stopTime
                    }
                })
                .then(function (response) {
                    console.log(response.data);
                });
            }
        },
        watch: {
            id(newValue, oldValue) {
                this.$store.dispatch('getTimeSpent', this.id);
            }
        },
        mounted () {
            this.$store.dispatch('getTimeSpent', this.id);
        },
    };
</script>