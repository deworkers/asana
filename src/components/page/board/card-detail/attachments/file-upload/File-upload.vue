<template>
    <div class="attachment-add">
        <div class="attachment-drop drop-active">
            <table class="uk-table uk-table-justify" v-if="files.length > 0">
                <thead>
                    <tr>
                        <th>Имя файла</th>
                        <th>Размер</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="file in files" :key="file.id">
                        <td>
                            <div class="attachment-drop-filename">
                                {{file.name}}
                            </div>
                        </td>
                        <td>{{formatByte(file.size)}}</td>
                        <td>
                            <span v-if="!file.success">Не загружен</span>
                            <span v-if="file.error">{{file.error}}</span>
                            <span v-else-if="file.success">Загружено</span>
                        </td>
                        <td>
                            <button uk-icon="icon: close" @click="remove(file)"></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="attachment-controll">
                <label for="file" class="attachment-select">
                    <div class="uk-button uk-button-primary uk-button-small">Выберите файлы</div>
                </label>
                <button class="uk-button uk-button-primary uk-button-small" v-show="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true" type="button">Загрузить</button>
            </div>

            <FileUpload
                ref="upload"
                v-model="files"
                :custom-action="upload"
                @input-file="inputFile"
                :multiple="true"
                :drop="true"
                :drop-directory="true"
                >
            </FileUpload>
        </div>
    </div>
</template>
   
<script>
    import VueUploadComponent from 'vue-upload-component';
    import axios from 'axios';

    export default {
        name: 'file-upload',
        data() {
            return {
                files: []
            }
        },
         props: {
            id: Number
        },
        components: {
            FileUpload: VueUploadComponent
        },
        computed: {
            
        },
        methods: {
            inputFile: function (newFile, oldFile) {
                if (newFile && oldFile && !newFile.active && oldFile.active) {
                    console.log('response', newFile.response)
                    if (newFile.xhr) {
                    console.log('status', newFile.xhr.status)
                    }
                }
            },
            remove(file) {
                this.$refs.upload.remove(file)
            },
            formatByte(byte) {
                return (byte / 1024 / 1024).toFixed(2) + 'Мб'
            },
            async upload(file) {
                await axios({
                    method: 'post',
                    url: BASE_URL + '/file',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                    data: file,
                })
                .then((response) => {
                    if (response.data.success) {
                        axios({
                            method: 'post',
                            url: BASE_URL + '/issue/' + this.id + '/attachment/' + response.data.data.id,
                            headers: {'X-Requested-With': 'XMLHttpRequest'},
                            withCredentials: true
                        }).then((response) => {
                            this.$store.dispatch('getAttachments', this.id);
                        });
                    }
                });
            },
        },
    }
</script>