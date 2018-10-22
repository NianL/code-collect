Vue.component('l-tool-base64', {
    template: `
        <div>
            <h3>base64字符串转换(utf-8)</h3>
            <div>请输入需要加密内容：</div>
            <textarea v-model="content" rows="8" style="width:600px;" />
            <div>请输入需要解密内容：</div>
            <textarea v-model="contentBase64" rows="8" style="width:600px;" />
        </div>
    `,
    data() {
        return {
            content: "",
            contentBase64: "",
        };
    },
    watch: {
        content(n) {
            if (n != "") this.contentBase64 = Common.encodeBase64(n);
            else this.contentBase64 = n
        },
        contentBase64(n) {
            if (n != "") this.content = Common.decodeBase64(n);
            else this.content = n
        }
    }
});