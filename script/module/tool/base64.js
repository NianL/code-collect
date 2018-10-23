Vue.component('l-tool-base64', {
    template: `
        <div>
            <h3>base64字符串转换(utf-8)</h3>
            <div>明文：</div>
            <textarea v-model="content" />
            <div>base64：</div>
            <textarea v-model="contentBase64" />
        </div>
    `,
    data() {
        return {
            content: '',
            contentBase64: '',
        };
    },
    watch: {
        content(n) {
            if (n != '') this.contentBase64 = Common.encodeBase64(n);
            else this.contentBase64 = n
        },
        contentBase64(n) {
            if (n != '') this.content = Common.decodeBase64(n);
            else this.content = n
        }
    }
});