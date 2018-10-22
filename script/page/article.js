var PageArticle = {
    mixins: [MixinImport],
    template: `
        <div class="article" v-if="importObject.status">
            <div class="left">
                <l-article-list :data="c_data" @click-handle="articleHandle" />
                <l-paging :paging="paging" @paging-handle="pagingClick" />
            </div>
            <div class="right">
                <div></div>
            </div>
        </div>
    `,
    data() {
        return {
            currentMenu: 'article',
            importObject: {
                status: false,
                data: [
                    'script/component/paging.js',
                    'script/module/article-list.js'
                ]
            },
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
        document.title = WebConfig.menu.t(this.currentMenu);
        this.$root.$emit('menu-current', this.currentMenu);
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
            this.$root.pageJump(this.articleInfo.routerName, {
                id: item.id
            });
        },
        initPaging() {
            this.paging.index = this.$route.params.page || 1;
        },
        pagingClick(index) {
            this.paging.index = index;
            this.$root.pageJump('article-list', {
                page: index
            });
        }
    }
};