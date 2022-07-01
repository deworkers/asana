<template>
    <div>
        <div class="attachment-list" uk-grid>
            <div class="attachment-one" v-for="image in images">
                <img 
                    @click="open(image.url)"
                    :key="image.id"
                    :src="baseUrl + image.url" 
                    width="100" 
                    alt="">
                    <a :download="image.name" :href="IMG_URL + image.name">Скачать</a>
                    <div class="attachment-one__delete" @click="remove(image.id)">Удалить</div>
            </div>
        </div>
        <div class="lightbox" v-if="activeImg != null">
            <div class="lightbox-overlay"  @click.stop="close">
                <div class="lightbox-body">
                    <div class="lightbox-close" @click="close" uk-icon="icon: close"></div>
                    <img 
                    :src="activeImg"
                    alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'app',
        props: {
            images: Array,
            id: Number
        },
        data() {
            return {
                activeImg: null
            }
        },
        methods: {
            open(url) {
                this.activeImg = this.baseUrl + url;
            },
            close() {
                this.activeImg = null;
            },
            remove(id) {
                axios({
                    method: 'DELETE',
                    url: BASE_URL + '/issue/' + this.id + '/attachment/' + id,
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    withCredentials: true
                }).then((response) => {
                    this.$store.dispatch('getAttachments', this.id);
                });
            }
        },
    }
</script>