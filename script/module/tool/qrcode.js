Vue.component('l-tool-qrcode', {
    mixins: [MixinImport],
    template: `
        <div>
            <h3>在线生成二维码</h3>
            <div>输入内容：</div>
            <textarea v-model="content" />
            <div><a class="button" @click="create">生成二维码</a></div>
            <div ref="ref_qrcode" style="padding:5px 0px; max-width:300px;"></div>
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
        create() {
            if (!this.qrcode)
                this.qrcode = new QRCode(this.$refs.ref_qrcode);
            this.qrcode.makeCode(this.content);
        }
    }
});