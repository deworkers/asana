<template>
    <router-view></router-view>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'App',
        data: function() {
            return {
                
            }
        },
        components: {
        },
        computed: {
            isAuth() {
                return this.$store.state.isAuth
            }
        },
        methods: {
            checkAuth() {
                axios({
                    method: 'post',
                    url: BASE_URL + '/auth',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                }).then((response) => {
                    if (response.data.success) {
                        if (response.data.success) {
                            this.$store.commit('updateIsAuth', true);
                            this.$store.commit('updateState');
                        } else {
                            this.$router.replace({ name: 'login' }).catch(()=>{});
                        }
                    }
                }).catch((error) => {
                    this.$router.replace({ name: 'login' }).catch(()=>{});
                });
            }
        },
        mounted() {
            this.$nextTick(function() {
                this.checkAuth();
            });
        }
    }
</script>
