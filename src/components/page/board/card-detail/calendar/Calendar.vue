<template>
    <date-pick
        v-model="date"
        :inputAttributes="{readonly: true}"
        :isDateDisabled="isPastDate"
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
                 {{ datePharse || 'Выбрать дату' }}
            </button>
            <button @click="clear" class="date-clear" v-if="date != null"><i class="fa-regular fa-circle-xmark"></i></button>
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
            },
            datePharse() {
                return this.date;
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
                    console.log(newValue);
                    this.updateDate(newValue);
                })
            },
            dueDate(newValue, oldValue) {
                this.date = this.dueDate;
            }
        }
    }
</script>
