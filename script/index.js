var ImportFile = {
    pageRouter: null,
    init(next) {
        var pages = [
            'script/page/home.js',
            'script/page/article.js',
            'script/page/article-detail.js',
            'script/page/code.js',
            'script/page/about.js'
        ];

        this.load(pages, () => {
            this.pageRouter = new VueRouter({
                routes: [{
                    path: '/',
                    name: '',
                    component: PageHome
                }, {
                    path: '/home',
                    name: 'home',
                    component: PageHome
                }, {
                    path: '/article',
                    name: 'article',
                    component: PageArticle
                }, {
                    path: '/article/:id',
                    name: 'article-detail',
                    component: PageArticleDetail
                }, {
                    path: '/code',
                    name: 'code',
                    component: PageCode
                }, {
                    path: '/about',
                    name: 'about',
                    component: PageAbout
                }]
            })
            next && next();
        });
    },
    has: [],
    load(imports, callback) {
        var loadIndex = 0;
        if (imports && imports.length > 0) {
            imports.map((item) => {
                if (this.has.indexOf(item) == -1) {
                    this.has.push(item);
                    importScript(item, checkStatus);
                } else {
                    checkStatus();
                }
            });
        } else {
            callback && callback();
        }

        function checkStatus() {
            loadIndex++;
            if (loadIndex == imports.length) {
                callback && callback();
            }
        }

        function importScript(url, callback) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = url;
            if (typeof (callback) == 'function') {
                script.onload = script.onreadystatechange = function () {
                    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                        callback();
                        script.onload = script.onreadystatechange = null;
                    }
                };
            }
            head.appendChild(script);
        }
    }
};

var MixinImport = {
    created() {
        ImportFile.load(this.importObject.data, () => {
            this.importObject.status = true;
            this.init();
        });
    },
    methods: {
        init() {}
    }
};

ImportFile.init(() => {
    new Vue({
        el: '#app',
        router: ImportFile.pageRouter,
        mixins: [MixinImport],
        template: `
                <div v-if="importObject.status">
                    <div class="header">
                        <l-header />
                    </div>
                    <div class="main">
                        <router-view />
                    </div>
                </div>
            `,
        data() {
            return {
                importObject: {
                    status: false,
                    data: [
                        'script/tween.js',
                        'script/common.js',
                        'script/data-access.js',
                        'script/config.js',
                        'script/module/header.js'
                    ]
                }
            }
        },
        methods: {
            pageJump(name, params) {
                this.$router.push({
                    name: name,
                    params: params
                });
            }
        }
    });
});