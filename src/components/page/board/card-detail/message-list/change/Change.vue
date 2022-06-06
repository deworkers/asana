<template>
    <div class="card-log-one">
        <strong>{{message.logged_by.name}}</strong> переместил эту задачу из столбца «{{columnName(message.data.from)}}» в столбец «{{columnName(message.data.to)}}». {{date}}
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
            columnName: function(props) {
                switch (props) {
                    case 'wait':
                        return 'На паузе'
                        break;
                    case 'in_progress':
                        return 'В работе'
                        break;
                    case 'done':
                        return 'Выполнено'
                        break;
                }
            }
        },
        mounted() {
            
        }
    }
</script>
