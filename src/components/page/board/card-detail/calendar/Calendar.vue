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
                <i class="fa-regular fa-calendar"></i>
            </div>
            <button class="date-button" @click="toggle" v-if="date != null">
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
            localeDate() {
                let date = moment(this.deadline);
                return  date.locale("ru").fromNow();
            }
        },
        methods: {
            isPastDate(date) {
                const currentDate = new Date();
                return date <= currentDate;
            },
            clear() {
                this.date = null;
            },
            datePharse() {
                let date = moment(this.date);
                return date.toISOString(true);
            }
        },
        watch: {
            date(newValue, oldValue) {
                this.$nextTick(function () {
                    this.datePharse(); // отправка в бекенд даты с таймзоной
                    this.updateParam(this.date, 'deadline');
                })
            },
            deadline(newValue, oldValue) {
                this.date = this.deadline;
            }
        }
    }
</script>
