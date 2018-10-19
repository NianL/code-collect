var PageArticleDetail = {
    mixins: [MixinImport],
    template: `
        <div class="article article-detail" v-if="importObject.status">
            <div class="left">
                <l-go-back :content="c_goBackName" router-name="article" />
                <div class="title"><h3 v-text="articleDetail.title" /></div>
                <div class="time"><span v-text="articleDetail.createTime" /></div>
                <div class="content" v-html="articleDetail.content" />
            </div>
            <div class="right"></div>
        </div>
    `,
    data() {
        return {
            currentMenu: 'article',
            importObject: {
                status: false,
                data: [
                    'script/module/go-back.js'
                ]
            },
            articleDetail: {}
        }
    },
    computed: {
        c_goBackName() {
            return WebConfig.menu.t(this.currentMenu);
        }
    },
    created() {
        this.$root.$emit('menu-current', this.currentMenu);
        this.getArticleDetail();
    },
    methods: {
        getArticleDetail() {
            DataAccess.GetArticleDetail(this.$route.params.id)
                .then(res => {
                    if (res.status == 200) {
                        this.articleDetail = res.data;
                    }
                    document.title = this.articleDetail.title;
                });
        }
    }
};