var ImportFile = {
    pageRouter: null,
    init(next) {
        var pages = [
            'script/page/home.js',
            'script/page/article.js',
            'script/page/article-detail.js',
            'script/page/tool.js',
            'script/page/about.js',
            'script/page/edit.js'
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
                    path: '/article/l/:page',
                    name: 'article-list',
                    component: PageArticle
                }, {
                    path: '/article/d/:id',
                    name: 'article-detail',
                    component: PageArticleDetail
                }, {
                    path: '/tool',
                    name: 'tool',
                    component: PageTool
                }, {
                    path: '/tool/i/:name',
                    name: 'tool-item',
                    component: PageTool
                }, {
                    path: '/about',
                    name: 'about',
                    component: PageAbout
                }, {
                    path: '/edit',
                    name: 'edit',
                    component: PageEdit
                }]
            })
            next && next();
        });
    },
    has: [],
    load(imports, callback) {
        var loadIndex = 0;
        var _this = this;
        if (imports && imports.length > 0) {
            imports.map((item) => {
                if (this.has.indexOf(item) == -1) {
                    this.has.push(item);
                    importFile(item, checkStatus);
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

        function importFile(url, callback) {
            var head = document.getElementsByTagName('head')[0];
            var file = null;
            if (url.indexOf('.js') != -1) {
                file = document.createElement('script');
                file.src = url;

            } else if (url.indexOf('.css') != -1) {
                file = document.createElement('link');
                file.href = url;
                file.rel = "stylesheet";
            }
            if (file) {
                if (typeof (callback) == 'function') {
                    file.onload = file.onreadystatechange = function () {
                        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                            callback();
                            file.onload = file.onreadystatechange = null;
                        }
                    };
                }
                head.appendChild(file);
            }
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
                        'script/module/header.js',
                        'script/component/loading.js',
                        'css/component/loading.css',
                        'script/component/menu-nav.js',
                        'css/component/menu-nav.css'
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