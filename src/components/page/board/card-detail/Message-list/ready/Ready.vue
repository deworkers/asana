<template>
    <div class="card-log-one">
        <strong>{{message.logged_by.name}}</strong> отметил задачу «выполнена». {{date}}
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'change',
        data: function() {
            return {
                show: false
            }
        },
        props: {
            message: Object
        },
        components: {

        },
        computed: {
            date() {
                let date = moment(this.message.timestamp);
                return  date.locale("ru").fromNow();
            }
        },
        methods: {
            
        },
        mounted() {
            
        }
    }
</script>
