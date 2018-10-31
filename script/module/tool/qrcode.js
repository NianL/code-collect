Vue.component('l-tool-qrcode', {
    mixins: [MixinImport],
    template: `
        <div>
            <h3>在线生成二维码</h3>
            <div>输入内容：</div>
            <textarea v-model="content" />
            <div>
                <button @click="create">生成二维码</button>
                <button @click="clear">清空</button>
            </div>
            <div v-show="showPic" ref="ref_qrcode" style="padding:5px 0px;"></div>
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'script/refer/qrcode.min.js',
                ]
            },
            qrcode: null,
            content: '',
            showPic: false
        }
    },
    methods: {
        create() {
            if (!this.qrcode)
                this.qrcode = new QRCode(this.$refs.ref_qrcode);

            if (this.content == '') {
                this.$message('输入不能为空');
                this.clear();
            } else {
                this.qrcode.makeCode(this.content);
                this.showPic = true;
            }
        },
        clear() {
            this.qrcode.clear();
            this.showPic = false;
            this.content = '';
        }
    }
});