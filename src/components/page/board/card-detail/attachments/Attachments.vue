<template>
    <div class="attachment-body">
        <div class="attachment-list"></div>
        <div class="attachment-add">
            <div uk-form-custom="target: true">
                <input type="file">
                <input class="uk-input uk-form-width-medium" type="text" placeholder="Выбрать файл" disabled>
            </div>
            <button class="uk-button uk-button-default">Загрузить</button>
        </div>
    </div>
  </template>
   
  <script>
  export default {
    name: 'attachments',
    data () {
      return {
        
      }
    },
    computed: {
        attachments() {
            return this.$store.state.attachments;
        },
    },
  }
  </script>