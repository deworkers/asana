<template>
    <div class="time-spent">
        <table class="uk-table" v-if="timeSpent != null && timeSpent.length > 0">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Автор</th>
                    <th>Время</th>
                    <th>Комментарий</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in timeSpent">
                    <td>{{formattedDate(item.ended_at)}}</td>
                    <td>{{item.executor.name}}</td>
                    <td>{{formattedTime(item.duration)}}</td>
                    <td>{{item.comment}}</td>
                    <td>
                        <button class="uk-icon-button uk-margin-small-right" uk-icon="trash" @click="deleted(item.id)"></button>
                        <button class="uk-icon-button uk-margin-small-right" uk-icon="pencil" @click="edit(item.id)"></button>
                    </td>
                </tr>
                <Form v-if="editForm == item.id" :id="id" :toggleForm="toggleForm" :spend="item"></Form>
            </tbody>
        </table>
        <div class="time-spent-new">
            <button  v-if="!viewForm" class="uk-button uk-button-primary uk-button-small" @click="toggleForm">Добавить отметку</button>
            <Form v-if="viewForm" :id="id" :toggleForm="toggleForm"></Form>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import axios from 'axios';
    import Form from './form/Form.vue'

    export default {
        name: 'TimeSpent',
        data: function() {
            return {
                viewForm: false,
                editForm: null
            }
        },
        props: {
            id: Number
        },
        components: {
            Form
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
            deleted(itemId) {
                axios({
                    method: 'DELETE',
                    url: BASE_URL + '/issue/' + this.id + '/time-spent/' + itemId,
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                })
                .then((response) => {
                    this.$store.dispatch('getTimeSpent', this.id);
                });
            },
            toggleForm() {
                this.viewForm = !this.viewForm;
            }
        },
        mounted() {
            
        }
    }
</script>
