<template>
    <div class="time-spent-add">
        <div class="time-spent-add__col time-spent-add__col--date">
            <label>Дата и время начала:</label>
            <input v-model="started_at" type="datetime-local"/>
        </div>
        <div class="time-spent-add__col time-spent-add__col--date">
            <label>Дата и время окончания:</label>
            <input v-model="ended_at" type="datetime-local"/>
        </div>
        <div class="time-spent-add__col time-spent-add__col--duration">
            <label>Время, мин:</label>
            <input v-model="duration" type="number"/>
        </div>
        <div class="time-spent-add__col">
            <label>Комментарий:</label>
            <input v-model="comment" type="text"/>
        </div>
        <div class="time-spent-add__button">
            <button class="uk-icon-button uk-button-primary uk-margin-small-right" uk-icon="check" @click="sendTimeSpend"></button>
            <button class="uk-icon-button uk-button-primary uk-margin-small-right" uk-icon="close" @click="toggleForm"></button>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import axios from 'axios';

    export default {
        name: 'TimeSpent',
        data: function() {
            return {
                started_at: null,
                ended_at: null,
                duration: null,
                comment: '',

            }
        },
        props: {
            toggleForm: Function,
            id: Number,
            spend: {
                type: Object,
                default: null
            }
        },
        components: {

        },
        computed: {
            getDuration() {
                if (this.started_at != null && this.ended_at != null) {
                    return moment(moment(this.ended_at, "yyyy-MM-DDTHH:mm")).diff(moment(this.started_at, "yyyy-MM-DDTHH:mm"), 'minutes');
                } else {
                    return null;
                }
            }
        },
        methods: {
            sendTimeSpend() {
                if (this.ended_at || this.duration && this.duration > 0) {
                    if (!this.spend) { // добавляем
                        axios({
                            method: 'post',
                            url: BASE_URL + '/issue/' + this.id + '/time-spent',
                            headers: {'X-Requested-With': 'XMLHttpRequest'},
                            withCredentials: true,
                            data: {
                                "started_at":  moment(this.started_at).format(),
                                "ended_at": moment(this.ended_at).format(),
                                "comment": this.comment
                            }
                        })
                        .then((response) => {
                            this.$store.dispatch('getTimeSpent', this.id);
                            this.toggleForm();
                        }).catch(() => {
                            this.toggleForm();
                        });
                    } else {
                        axios({
                            method: 'put',
                            url: BASE_URL + '/issue/' + this.id + '/time-spent/' + this.spend.id,
                            headers: {'X-Requested-With': 'XMLHttpRequest'},
                            withCredentials: true,
                            data: {
                                "started_at":  moment(this.started_at).format(),
                                "ended_at": moment(this.ended_at).format(),
                                "comment": this.comment
                            }
                        })
                        .then((response) => {
                            this.$store.dispatch('getTimeSpent', this.id);
                            this.toggleForm();
                        }).catch(() => {
                            this.toggleForm();
                        });
                    }
                }
            }
        },
        watch: {
            getDuration(newValue, oldValue) {
                if (this.getDuration) {
                    this.duration = newValue;
                }
            },
            duration(newValue, oldValue) {
                this.ended_at = moment(this.started_at).add(newValue, 'minutes').format('yyyy-MM-DDTHH:mm');
            }
        },
        mounted() {
            if (this.spend) {
                this.started_at = moment(this.spend.started_at).format('yyyy-MM-DDTHH:mm');
                this.ended_at = moment(this.spend.ended_at).format('yyyy-MM-DDTHH:mm');
                this.comment = this.spend.comment;

            } else {
                this.started_at = moment().format('yyyy-MM-DDTHH:mm');
            }
        }
    }
</script>
