var PageArticle = {
    mixins: [MixinImport],
    template: `
        <div class="article" v-loading="!importObject.status">
            <template v-if="importObject.status">
                <div v-if="isManage">
                    <button @click="$article_edit">添加内容</button>
                </div>
                <div class="left">
                    <l-article-list :data="c_data" @click-handle="articleHandle" />
                    <l-paging :paging="paging" @paging-handle="pagingClick" />
                </div>
                <div class="right">
                    <div></div>
                </div>
            </template>
        </div>
    `,
    data() {
        return {
            isManage: false,
            currentMenu: 'article',
            importObject: {
                status: false,
                data: [
                    'script/component/paging.js',
                    'css/component/paging.css',
                    'script/module/article-list.js'
                ]
            },
            searchContent: "",
            articleInfo: {},
            paging: {
                index: 1,
                rows: 10,
                total: 0
            }
        };
    },
    computed: {
        c_data() {
            var data = [];
            var starIndex = 0;
            if (this.paging.index > 1) starIndex = (this.paging.index - 1) * this.paging.rows;
            var endIndex = starIndex + this.paging.rows;
            if (endIndex > this.paging.total) endIndex = this.paging.total;
            for (var i = starIndex; i < endIndex; i++) {
                data.push(this.articleInfo.list[i]);
            }
            return data;
        }
    },
    watch: {
        '$route'() {
            this.initPaging();
        }
    },
    created() {
        if (location.search != "") {
            ImportFile.load([
                'script/plugin/article-edit.js'
            ], () => {
                this.isManage = true;
            });
        }

        document.title = WebConfig.menu.t(this.currentMenu);
        this.$emit('now-menu', this.currentMenu);
        this.getData();

        this.initPaging();
    },
    methods: {
        getData() {
            DataAccess.GetArticleList()
                .then(res => {
                    if (res.status == 200) {
                        this.articleInfo = res.data;
                        this.paging.total = this.articleInfo.list.length;
                    }
                });
        },
        articleHandle(item) {
            if (this.isManage) {
                this.$article_edit({
                    id: item.id
                });
            } else {
                this.$router.push({
                    name: this.articleInfo.routerName,
                    params: {
                        id: item.id
                    }
                });
            }
        },
        initPaging() {
            this.paging.index = this.$route.params.page || 1;
        },
        pagingClick(index) {
            this.paging.index = index;
            this.$router.push({
                name: 'article-list',
                params: {
                    page: index
                }
            });
        },
        dialogHandle(res) {
            this.dialogShow = false;
        }
    }
};