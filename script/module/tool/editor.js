Vue.component('l-tool-editor', {
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            <h3>文本编辑器 wangEditor</h3>
            <div id="editor"></div>
            <div style="padding-top:5px;">
                <button @click="clear">清空内容</button>
                <button @click="output">导出内容</button>
            </div>
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
                this.editor = new E('#editor');
                this.editor.create();
            });
        },
        clear() {
            this.editor.txt.html('');
        },
        output() {
            var fileName = (Date.parse(new Date()) / 1000) + ".txt";
            Common.downloadFile(fileName, this.editor.txt.html());
        }
    }
});