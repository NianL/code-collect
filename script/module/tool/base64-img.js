Vue.component('l-tool-base64-img', {
    template: `
        <div>
            <h3>图片转base64</h3>
            <input v-show="false" ref="upload_img" type="file" @change="fileHandle" accept="image/jpeg, image/png, image/bmp" />
            <div>
                <button @click="$refs.upload_img.click()">选择图片</button>
                <button @click="clear">清空</button>
                <button @click="output" v-show="fileInfo.name">导出txt</button>
                <span v-if="fileInfo.name">{{ fileInfo.name }} {{ fileInfo.size | fileSizeFormat }}</span>
            </div>
            <div class="textarea">{{ conentBase64 }}</div>
            <div v-if="conentBase64!=''" style="margin-top:10px;">
                <img :src="conentBase64" style="max-width:780px; max-height:400px;" />
            </div>
        </div>
    `,
    data() {
        return {
            fileInfo: {},
            conentBase64: "",
        };
    },
    filters: {
        fileSizeFormat(value) {
            if (isNaN(value) || value == 0) return "0K";
            else {
                var val = parseFloat(value) / 1024;
                if ((val / 1024) < 1) return parseFloat(val.toFixed(2)) + "K";
                else if ((val / (1024 * 1024)) < 1) return parseFloat((val / 1024).toFixed(2)) + "M";
                else return parseFloat((val / (1024 * 1024)).toFixed(2)) + "G";
            }
        }
    },
    methods: {
        fileHandle() {
            var maxSize = 2;
            var file = this.$refs.upload_img.files[0];
            if (file) {
                if (file.size > (maxSize * 1024 * 1024)) {
                    this.$message("图片大小不超过" + maxSize + "M");
                    this.clear();
                    return;
                }

                this.fileInfo = {
                    name: file.name,
                    size: file.size
                };

                var reader = new FileReader();
                reader.onload = (e) => {
                    this.conentBase64 = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        clear() {
            this.fileInfo = {};
            this.conentBase64 = "";
            this.$refs.upload_img.value = "";
        },
        format(value) {
            if (isNaN(value) || value == 0) return "0K";
            else {
                var val = parseFloat(value) / 1024;
                if ((val / 1024) < 1) return parseFloat(val.toFixed(2)) + "K";
                else if ((val / (1024 * 1024)) < 1) return parseFloat((val / 1024).toFixed(2)) + "M";
                else return parseFloat((val / (1024 * 1024)).toFixed(2)) + "G";
            }
        },
        output() {
            var fileName = this.fileInfo.name.substr(0, this.fileInfo.name.lastIndexOf('.')) + ".txt";
            Common.downloadFile(fileName, this.conentBase64);
        }
    }
});