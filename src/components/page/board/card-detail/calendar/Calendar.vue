<template>
    <date-pick
        v-model="date"
        :inputAttributes="{readonly: true}"
        :selectableYearRange="{from: 2022, to: 2024}"
        :weekdays="weekdays"
        :months="months"
        :nextMonthCaption="nextMonthCaption"
        :prevMonthCaption="prevMonthCaption"
        :setTimeCaption="setTimeCaption"
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"
        :displayFormat="'DD.MM.YYYY HH:mm'"
        >
        <template v-slot:default="{toggle, inputValue}">
            <div class="cart-dueDate cart-dueDate--add" @click="toggle" v-if="date == null">
                <span class="uk-icon" uk-icon="calendar"></span>
            </div>
            <button :class="['date-button', diff < 18 ? 'alert' : '']" @click="toggle" v-if="date != null">
                 {{ localeDate || 'Выбрать дату' }}
            </button>
            <button @click="clear" class="assignee-clear" v-if="date != null"></button>
        </template>
    </date-pick>
</template>

<script>
    import DatePick from 'vue-date-pick';
    import moment from 'moment';

    export default {
        name: 'Message-list',
        data: function() {
            return {
                date: this.deadline,
                updated: false,
                weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                nextMonthCaption: 'Следующий месяц',
                prevMonthCaption: 'Предидущий месяц',
                setTimeCaption: 'Выбрать время:',
            }
        },
        props: {
            deadline: String,
            updateParam: Function
        },
        components: {
            DatePick
        },
        computed: {
            cardDetail() {
                return this.$store.state.cardDetail;
            },
            diff() {
                return moment(this.deadline).diff(moment(), 'hours');
            },
            localeDate() {
                let date = moment(this.deadline);
                let time = date.hours() == 0 && date.minutes() == 0 ? '' : date.locale("ru").format(" в HH:mm");
                return  date.locale("ru").format("DD.MM.YYYY") + time;
            }
        },
        methods: {
            isPastDate(date) {
                const currentDate = new Date();
                return date <= currentDate;
            },
            clear() {
                this.date = null;
            }
        },
        watch: {
            date(newValue, oldValue) {
                this.$nextTick(function () {
                    this.updateParam(this.date, 'deadline');
                })
            },
            deadline(newValue, oldValue) {
                this.date = this.deadline;
            }
        }
    }
</script>
