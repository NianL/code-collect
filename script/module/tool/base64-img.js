Vue.component('l-tool-base64-img', {
    template: `
        <div>
            <h3>图片转base64</h3><span>(图片大小请不要超过2M，会卡的...)</span>
            <input v-show="false" ref="upload_img" type="file" @change="fileHandle" accept="image/jpeg, image/png, image/bmp" />
            <div style="padding:10px 0px;">
                <button style="padding:1px 5px; margin-right:5px;" @click="$refs.upload_img.click()">选择图片</button>
                <button style="padding:1px 5px; margin-right:5px;" @click="clear">清空</button>
                <button style="padding:1px 5px; margin-right:5px;" @click="output" v-show="fileInfo.name">导出</button>
                <span style="font-size:12px;" v-if="fileInfo.name">{{ fileInfo.name }} {{ fileInfo.size | fileSizeFormat }}</span>
            </div>
            <div v-if="fileInfo.size<2097152" style="font-size:12px; width: 780px; height:200px; border: 1px solid #ccc; word-break: break-all; overflow: auto;">{{ conentBase64 }}</div>
            <div style="margin-top:10px;">
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
        fileSizeFormat: function (value) {
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
            if (file.size > (maxSize * 1024 * 1024)) {
                alert("图片大小不超过" + maxSize + "M");
                return;
            }
            this.fileInfo = {
                name: file.name,
                size: file.size
            };

            if (file) {
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
            download(fileName, this.conentBase64);

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