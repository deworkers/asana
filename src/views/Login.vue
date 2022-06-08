<template>
    <div class="main">
        <div class="uk-container uk-flex uk-flex-center">
            <div class="uk-card uk-card-body"></div>
        </div>
        <div class="uk-container uk-flex uk-flex-center">
            <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
                <h3 class="uk-card-title">Авторизация</h3>
                <div class="uk-margin">
                    <input v-model="login" class="uk-input" name="login" type="text" placeholder="Логин">
                </div>
                <div class="uk-margin">
                    <input v-model="password" class="uk-input" name="password" type="password" placeholder="Пароль">
                </div>
                <div class="uk-margin">
                    <button class="uk-button uk-button-default uk-button-primary uk-width-1-1" @click="setLogin">Войти</button>
                </div>
                <div class="uk-text-center uk-margin">
                    <div class="uk-padding-small">
                        Нет учетной записи? <a class="uk-link" href="#">Регистрация</a>
                    </div>
                    <div class="uk-padding-small">
                        <a class="uk-link" href="#">Забыли пароль?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Login',
        components: {
            
        },
        data() {
            return {
                login: 'z-be@yandex.ru',
                password: 'PgDXJe4BdYVcGECyVWbc',
                user: null,
            }
        },
        methods: {
            setLogin() {
                axios({
                    method: 'post',
                    url: BASE_URL + '/auth',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true,
                    data: {
                        login: this.login,
                        password: this.password
                    }
                }).then((response) => {
                    if (response.data.success) {
                        this.$store.commit('updateIsAuth', true);
                        this.$store.commit('updateState');
                        this.$router.push({ path: '/' });
                    }
                });
            }
        }
    }
</script>