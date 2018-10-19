var PageArticle = {
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            <div class="main-article-left">
                <l-article-list :data="articleInfo.list" @click-handle="articleHandle" />
            </div>
            <div class="main-article-right">
                <div>没想好放什么先空着</div>
            </div>
        </div>
    `,
    data() {
        return {
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
        document.title = '随便写写';
        this.$root.$emit('menu-current', 'article');

        this.getArticleData();
    },
    methods: {
        getArticleData() {
            DataAccess.GetArticleList()
                .then(res => {
                    this.articleInfo = res.data;
                });
        },
        articleHandle(item) {
            this.$root.pageJump('article-detail', {
                id: item.id
            });
        }
    }
};