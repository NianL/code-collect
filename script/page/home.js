var PageHome = {
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            <button @click="loadingStatus=true">show loading</button>
            <button @click="loadingStatus=false">hide loading</button>
            <div v-loading="loadingStatus" style="position:relative ;min-height:400px; background:#666; margin-top:10px;"></div>
        </div>
    `,
    data() {
        return {
            currentMenu: 'home',
            importObject: {
                status: false,
                data: [
                    
                ]
            },
            loadingStatus: false,
            menuData: [{
                text: '这个',
                value: 'home'
            }, {
                text: '网站的',
                value: 'article'
            }, {
                text: '导航菜单',
                value: 'tool'
            }, {
                text: '组件使用',
                value: 'about'
            }]
        };
    },
    created() {
        document.title = '首页';
        this.$root.$emit('menu-current', this.currentMenu);
    },
    methods: {
        init() {},
        articleHandle(item) {
            console.log(item);
        }
    }
};