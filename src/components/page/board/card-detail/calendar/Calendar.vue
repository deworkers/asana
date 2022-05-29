<template>
    <date-pick 
        :inputAttributes="{readonly: true}"
        :isDateDisabled="isPastDate"
        :selectableYearRange="{from: 2022, to: 2024}"
        :weekdays="weekdays"
        :months="months"
        :nextMonthCaption="nextMonthCaption"
        :prevMonthCaption="prevMonthCaption"
        :setTimeCaption="setTimeCaption"
        :displayFormat="'DD.MM.YYYY'"
        v-model="date">
        <template v-slot:default="{toggle, inputValue}">
            <button @click="toggle">
                 {{ inputValue || 'Выбрать дату' }}
            </button>
        </template>
    </date-pick>
</template>

<script>
    import DatePick from 'vue-date-pick';
    export default {
        name: 'Message-list',
        data: function() {
            return {
                date: this.dueDate,
                weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                nextMonthCaption: 'Следующий месяц',
                prevMonthCaption: 'Предидущий месяц',
                setTimeCaption: 'Выбрать время:',
            }
        },
        props: {
            dueDate: String,
            updateDate: Function
        },
        components: {
            DatePick
        },
        computed: {
            cardDetail() {
                return this.$store.state.cardDetail;
            }
        },
        methods: {
            isPastDate(date) {
                const currentDate = new Date();
                return date <= currentDate;
            }
        },
        watch: {
            date(newValue, oldValue) {
                this.$nextTick(function () {
                    this.updateDate(newValue);
                })
            },
            dueDate(newValue, oldValue) {
                this.date = this.dueDate;
            }
        }
    }
</script>
