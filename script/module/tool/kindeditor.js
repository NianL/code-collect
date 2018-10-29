Vue.component('l-tool-kindeditor', {
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            <h3>文本编辑器kindeditor</h3>
            <textarea id="kindeditor" style="width:1000px;height:350px;visibility:hidden;"></textarea>
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'script/refer/kindeditor/themes/default/default.css',
                    'script/refer/kindeditor/kindeditor-all-min.js',
                    'script/refer/kindeditor/lang/zh-CN.js'
                ]
            },
            editor: null
        }
    },
    methods: {
        init() {
            this.$nextTick(() => {
                KindEditor.ready((K) => {
                    this.editor = K.create('#kindeditor', {
                        loadStyleMode: false
                    });
                });
            });
        }
    }
});