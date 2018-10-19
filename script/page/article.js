var PageArticle = {
    mixins: [MixinImport],
    template: `
        <div class="article" v-if="importObject.status">
            <div class="left">
                <l-article-list :data="articleInfo.list" @click-handle="articleHandle" />
            </div>
            <div class="right">
                <div>没想好放什么先空着</div>
            </div>
        </div>
    `,
    data() {
        return {
            currentMenu: 'article',
            importObject: {
                status: false,
                data: [
                    'script/component/article-list.js'
                ]
            },
            articleInfo: {},
        };
    },
    created() {
        document.title = WebConfig.menu.t(this.currentMenu);
        this.$root.$emit('menu-current', this.currentMenu);
        this.getArticleData();
    },
    methods: {
        getArticleData() {
            DataAccess.GetArticleList()
                .then(res => {
                    if (res.status == 200) {
                        this.articleInfo = res.data;
                    }
                });
        },
        articleHandle(item) {
            this.$root.pageJump(this.articleInfo.routerName, {
                id: item.id
            });
        }
    }
};