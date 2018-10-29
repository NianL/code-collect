Vue.component('l-tool-editor', {
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            <h3>文本编辑器 wangEditor</h3>
            <div id="editor"></div>
            <div style="padding-top:5px;">
                <a class="button" @click="clear">清空内容</a>
                <a class="button" @click="output">导出内容</a>
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
            download(fileName, this.editor.txt.html());

            function download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
        }
    }
});