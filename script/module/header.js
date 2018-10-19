Vue.component('l-header', {
    mixins: [MixinImport],
    template: `
        <div class="header-main" v-if="importObject.status">
            <l-menu-nav class="header-main-menu"
                v-if="currentMenu" 
                :default-value="currentMenu" 
                :data="menuData" 
                @menu-click="menuClick"
            />
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'script/component/menu-nav.js',
                ]
            },
            currentMenu: null,
            menuData: [{
                text: '首页',
                value: 'home'
            }, {
                text: '随便写写',
                value: 'article'
            }, {
                text: '小玩意',
                value: 'code'
            }, {
                text: '关于',
                value: 'about'
            }]
        };
    },
    watch: {
        currentMenu(n) {
            if (n == '') this.currentMenu = 'home';
        }
    },
    created() {
        this.$root.$on('menu-current', (c) => {
            this.currentMenu = c;
        });
    },
    methods: {
        menuClick(item) {
            this.$root.pageJump(item.value);
        }
    }
});