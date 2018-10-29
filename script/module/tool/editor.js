Vue.component('l-tool-editor', {
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            <h3>文本编辑器 wangEditor</h3>
            <div id="editor"></div>
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'script/refer/wangEditor.min.js',
                ]
            },
            editor: null
        }
    },
    methods: {
        init() {
            this.$nextTick(() => {
                var E = window.wangEditor;
                var editor = new E('#editor');
                editor.create();
            });
        }
    }
});