Vue.component('l-tool-json-format', {
    mixins: [MixinImport],
    template: `
        <div class="json-format" v-if="importObject.status">
            <h3>json格式化</h3>
            <div class="show-box">
                <div class="box">
                    <div class="operate">
                        <span>输入内容：</span>
                        <button @click="content=''">清空</button>
                    </div>
                    <textarea v-model="content" />
                </div>
                <div class="box">
                    <div class="operate">输出内容：</div>
                    <div class="textarea format" v-html="c_content"></div>
                </div>
            </div>
            <div></div>
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'css/module/tool/json-format.css'
                ]
            },
            content: ''
        }
    },
    computed: {
        c_content() {
            if (this.content != '') {
                try {
                    var obj = JSON.parse(this.content);
                    if (typeof (obj) == 'object') {
                        var objStr = JSON.stringify(obj, null, 4);
                        var html = objStr.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp');
                        return html;
                    }
                } catch (e) {

                }
            }
            return this.content;
        }
    }
});