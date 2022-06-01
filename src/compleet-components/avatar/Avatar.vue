<template>
    <div class="avatar">
        <div class="avatar-letter" v-if="user.avatar == null">
            {{initials}}
        </div>
        <img :src="user.avatar.url" alt="" v-if="user.avatar != null">
    </div>
</template>

<script>
    export default {
        name: 'Avatar',
        data: function() {
            return {
                
            }
        },
        props: {
            user: Object
        },
        components: {

        },
        computed: {
            initials(str) {
                return this.user.name.split(/\s+/).map((item,i) => item[0].toUpperCase()).join('');
            }
        },
        methods: {
            
        },
        mounted() {
            
        }
    }
</script>
