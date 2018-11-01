var PluginArticleEdit = {};
PluginArticleEdit.install = function (Vue, options) {
    Vue.prototype.$article_edit = function (obj, type) {
        var coms = Vue.extend({
            mixins: [MixinImport],
            template: `
                <div class="article-edit">
                    <l-dialog v-if="importObject.status" :title="title" :show="isShow" @handle="dialogHandle">
                        <div class="main-form" style="width:1000px;">
                            <div>
                                <span>标题：</span><br />
                                <input v-model="formData.title" />
                            </div>
                            <div>
                                <span>简介：</span><br />
                                <textarea v-model="formData.describe"></textarea>
                            </div>
                            <div>
                                <span>详细内容：</span><br />
                                <div id="article-editor"></div>
                            </div>
                            <div></div>
                        </div>
                    </l-dialog>
                </div>
            `,
            data: function () {
                return {
                    importObject: {
                        status: false,
                        data: [
                            'css/component/dialog.css',
                            'script/component/dialog.js',
                            'script/refer/wangEditor.min.js'
                        ]
                    },
                    title: '',
                    isShow: true,
                    editor: null,
                    formData: {
                        title: '',
                        describe: '',
                        content: '',
                        createTime: null,
                    }
                };
            },
            methods: {
                init() {
                    this.$nextTick(() => {
                        var E = window.wangEditor;
                        this.editor = new E('#article-editor');
                        this.editor.create();

                        if (obj && obj.id) {
                            this.title = '编辑';
                            DataAccess.GetArticleDetail(obj.id)
                                .then(res => {
                                    if (res && res.status == 200) {
                                        this.formData = {
                                            title: res.data.title,
                                            describe: res.data.describe,
                                            content: res.data.content,
                                        };
                                        this.editor.txt.html(this.formData.content);
                                    }
                                });
                        } else {
                            this.title = '添加';
                        }
                    });
                },
                dialogHandle(res) {
                    if (res) {
                        this.formData.createTime = (new Date()).format('yyyy-MM-dd hh:mm:ss');
                        this.formData.content = this.editor.txt.html();
                        Common.downloadFile(this.formData.title + '.json', JSON.stringify(this.formData));
                    }

                    this.isShow = false;
                    setTimeout(function () {
                        document.body.removeChild(coms);
                    }, 500);
                }
            }
        });
        var coms = new coms().$mount().$el;
        document.body.appendChild(coms);
    };
}

Vue.use(PluginArticleEdit);