var PageHome = {
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            <div class="main-left">
                <l-article-list :data="data" @click-handle="articleHandle" />
            </div>
            <div class="main-right">
                <div class="box-shadow-gray" style="height: 400px; padding: 5px 10px;">没想好放什么先空着</div>
            </div>
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'script/data/home.js',
                    'script/component/article-list.js'
                ]
            },
            data: {},
        };
    },
    created() {
        document.title = '首页';
        this.$root.$emit('menu-current', 'home');
    },
    methods: {
        init() {
            this.data = DataHome;
        },
        articleHandle(item){
            console.log(item);
        }
    }
};