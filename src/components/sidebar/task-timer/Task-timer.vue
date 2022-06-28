<template>
    <div class="card-timer" v-if="timingTask">
        <div class="card-timer-task">
            <div class="card-timer-task__top">
                Работа над задачей:
            </div>
            <div class="card-timer-task__title">
                {{timingTask.title}}
            </div>
        </div>
        <button v-if="!started" @click="start" class="card-timer-button uk-button uk-button-primary uk-button-small"><span class="uk-icon uk-margin-small-right" uk-icon="future"></span>Старт работы</button>
        <button v-if="started" @click="stop" class="card-timer-button uk-button uk-button-danger uk-button-small"><span class="uk-icon uk-margin-small-right" uk-icon="ban"></span>Остановить</button>
        <div class="card-timer-time" v-if="started">{{formattedElapsedTime}}</div>
    </div>
</template>

<script>
    import moment from 'moment';
    import axios from 'axios';

    export default {
        name: "Timer",
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
            },
            timingTask() {
                return this.$store.state.timingTask
            }
        },
        methods: {
            start() {
                this.started = true;
                this.startTime =  moment(new Date()).toISOString(true);
                this.timer = setInterval(() => {
                    this.time++;
                }, 1000);
                this.$store.commit('updateTimingStart', true);
            },
            stop() {
                this.started = false;
                this.stopTime = moment(new Date()).toISOString(true);
                this.time = 0;
                clearInterval(this.timer);
                this.timer = null;
                this.sendTimeSpend();
                this.$store.commit('updateTimingStart', false);
            },
            sendTimeSpend() {
                axios({
                    method: 'post',
                    url: BASE_URL + '/issue/' + this.timingTask.id + '/time-spent',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true,
                    data: {
                        "started_at": this.startTime,
                        "ended_at": this.stopTime,
                        "comment": 'Работа по таймеру'
                    }
                })
                .then((response) => {
                    this.$store.dispatch('getTimeSpent', this.id);
                });
            }
        },
        watch: {
            timingTask(newValue, oldValue) {
                if (this.timingTask == null) {
                    
                }
            }
        },
    };
</script>