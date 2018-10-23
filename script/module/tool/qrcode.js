Vue.component('l-tool-qrcode', {
    mixins: [MixinImport],
    template: `
        <div>
            <h3>在线生成二维码</h3>
            <span>使用的是QRCode.js生成</span>
            <div>输入内容：</div>
            <textarea v-model="content" />
            <div>
                <button @click="create">生成二维码</button>
            </div>
            <div id="qrcode" style="padding:5px 0px; max-width:300px;"></div>
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'script/qrcode.min.js',
                ]
            },
            qrcode: null,
            content: ""
        }
    },
    methods: {
        init() {
            this.qrcode = new QRCode("qrcode");
        },
        create() {
            this.qrcode.makeCode(this.content);
        }
    }
});