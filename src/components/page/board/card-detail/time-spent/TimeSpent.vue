<template>
    <div class="time-spent">
        <table class="uk-table" v-if="timeSpent.length > 0">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Автор</th>
                    <th>Время</th>
                    <th>Комметнарий</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in timeSpent">
                    <td>{{formattedDate(item.executor)}}</td>
                    <td>deWorkers</td>
                    <td>{{formattedTime(item.duration)}}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <div class="time-spent-new">
            <button class="uk-button uk-button-primary uk-button-small">Добавить отметку</button>
            <div class="">
                
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: 'TimeSpent',
        data: function() {
            return {
                //ready: false
            }
        },
        props: {
            id: Number
        },
        components: {

        },
        computed: {
            timeSpent() {
                return this.$store.state.timeSpent;
            },
        },
        methods: {
            formattedTime(time) {
                return moment.utc(time*1000).format('H [ч] mm [мин]');
            },
            formattedDate(date) {
                return moment(date).format('DD.MM.YYYY HH:mm');
            },
        },
        mounted() {
            
        }
    }
</script>
