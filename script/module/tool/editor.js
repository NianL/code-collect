Vue.component('l-tool-editor', {
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            <h3>文本编辑器 wangEditor</h3>
            <div id="editor" v-show="switchEditor"></div>
            <textarea style="height:319px; width:1088px; margin:0px;" v-show="!switchEditor" v-model="editorContent"></textarea>
            <div style="padding-top:5px;">
                <button @click="switchEditor=!switchEditor">{{ switchEditor?'切换到html':'切换到editor' }}</button>
                <button @click="clear">清空内容</button>
                <button @click="output">导出内容</button>
            </div>
        </div>
    `,
    data() {
        return {
            switchEditor: true,
            editorContent: '',
            importObject: {
                status: false,
                data: [
                    'script/refer/wangEditor.min.js',
                ]
            },
            editor: null
        }
    },
    watch: {
        switchEditor(n) {
            if (n) {
                this.editor.txt.html(this.editorContent);
            } else {
                this.editorContent = this.editor.txt.html();
            }
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
            this.editorContent = '';
        },
        output() {
            var fileName = (Date.parse(new Date()) / 1000) + ".txt";
            Common.downloadFile(fileName, this.editor.txt.html());
        }
    }
});